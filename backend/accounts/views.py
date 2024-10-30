from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from .models import CustomUser, GiftCard
from .serializers import RegisterSerializer, UserSerializer,ReviewSerializer
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
import logging
from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.exceptions import PermissionDenied
from restaurants.models import Reservation, Review
from rest_framework.views import APIView
from django.contrib.auth.decorators import login_required
from io import BytesIO
from base64 import b64encode
import qrcode
from django.utils.decorators import method_decorator
from restaurants.models import Restaurant, Review
from .serializers import ReviewSerializer
import json
import uuid
from datetime import datetime
from django.utils import timezone
from datetime import timedelta
from rest_framework import serializers


##########User registration view##########
logger = logging.getLogger(__name__)

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]  

    def perform_create(self, serializer):
        try:
            user = serializer.save()
            promo_code = self.request.data.get('promoCode')
            
            logger.info(f"Received promo code: {promo_code}")
            
            if promo_code:
                referred_users = CustomUser.objects.filter(promoCode=promo_code)
                if referred_users.exists():
                    referred_user = referred_users.first()  # Tomar el primer usuario encontrado
                    logger.info(f"Found referred_user: {referred_user.email}")
                    if referred_user.promoCodeExpiry and referred_user.promoCodeExpiry < timezone.now():
                        raise serializers.ValidationError({'promo_code': 'Código promocional ha expirado.'})
                    user.promo_code_used = True
                    user.points += 1000  # Agrega 1000 puntos al nuevo usuario
                    referred_user.points += 500  # Agrega 500 puntos al usuario referido
                    referred_user.save()
                else:
                    raise serializers.ValidationError({'promo_code': 'Código promocional no válido.'})
            else:
                user.points += 500  # Agrega 500 puntos al nuevo usuario sin código promocional

            user.save()
            logger.info(f"User {user.id} now has {user.points} points")
        except Exception as e:
            logger.error(f"Error during user registration: {str(e)}")
            raise e





#########User detail view##########
logger = logging.getLogger(__name__)

class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        token = request.headers.get('Authorization', None)
        logger.debug(f"Received token: {token}")

        if token:
            try:
                jwt_authenticator = JWTAuthentication()
                validated_token = jwt_authenticator.get_validated_token(token.split(' ')[1])
                logger.debug(f"Validated token: {validated_token}")
            except AuthenticationFailed as e:
                logger.error(f"Token validation failed: {e}")
                raise

        return super().get(request, *args, **kwargs)

    def get_object(self):
        user = self.request.user
        logger.debug(f"Authenticated user: {user}")
        return user
    
###########Update user details #################

class UserUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
##############User delete view####################
class UserDeleteView(generics.DestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.is_active = False
        user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

    
##############Get user reservations##############
class UserReservationsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        reservations = Reservation.objects.filter(user=request.user)
        reservations_data = [
            {
                'id': reservation.id,
                'restaurant': reservation.restaurant.id,
                'reservation_date': reservation.reservation_date,
                'time': reservation.time,
                'party_size': reservation.party_size,
                'seat_preference': reservation.seat_preference,
                'special_request': reservation.special_request,
                'offer_code': reservation.offer_code,
                'receive_offers': reservation.receive_offers,
            }
            for reservation in reservations
        ]
        return Response(reservations_data)


###############Create reservation####################

class CancelReservationView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, reservation_id):
        reservation = get_object_or_404(Reservation, id=reservation_id, user=request.user)
        reservation.delete()
        return Response(status=204)
    
    
#################Get user points#####################

class UserPointsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        user = get_object_or_404(CustomUser, id=user_id)
        points = user.points  # Accede directamente al campo 'points'
        return Response({'points': points}, status=status.HTTP_200_OK)



###############Generate QR code for user#################    

class GenerateQRCodeView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        user = get_object_or_404(CustomUser, id=user_id)
        total_points = user.points  

        qr_data = f"User: {user.username}, Points: {total_points}"
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(qr_data)
        qr.make(fit=True)

        img = qr.make_image(fill='black', back_color='white')
        buffer = BytesIO()
        img.save(buffer, format="PNG")
        img_str = b64encode(buffer.getvalue()).decode('utf-8')

        return JsonResponse({'qr_code': img_str, 'points': total_points})

##########user USER REVIEWS ######
# User reviews view
logger = logging.getLogger(__name__)

class UserReviewsView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        logger.debug(f"Fetching reviews for user: {user.id}")
        queryset = Review.objects.filter(user=user).select_related('user').prefetch_related('restaurant')
        logger.debug(f"Queryset: {queryset}")
        return queryset

    def perform_create(self, serializer):
        user = self.request.user
        logger.debug(f"Creating review for user: {user.id}")
        serializer.save(user=user)


# Review create view

logger = logging.getLogger(__name__)

class ReviewCreateView(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        logger.debug(f"Creating review for user: {user.id}")
        serializer.save(user=user)


# Review update view
class ReviewUpdateView(generics.UpdateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        review = super().get_object()
        if review.user != self.request.user:
            raise PermissionDenied("No tienes permiso para editar esta opinión.")
        return review

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        print("Request data:", request.data) 
        return self.update(request, *args, **kwargs)
    
# Review delete view
class ReviewDeleteView(generics.DestroyAPIView):
    queryset = Review.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        review = super().get_object()
        if review.user != self.request.user:
            raise PermissionDenied("No tienes permiso para eliminar esta opinión.")
        return review




###################Login User view#########'############
@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(request, username=email, password=password)
    
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)
    
    return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


###############Logout User view######################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data.get('refresh')
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"success": "Logged out successfully"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# User details view

class UserDetailsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id, *args, **kwargs):
        try:
            user = CustomUser.objects.get(id=id)
            user_data = UserSerializer(user).data
            return Response(user_data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        


############## FAVORITES VIEWS ####################
# User favorites view

class UserFavoritesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
            favorites = user.favorite_restaurants.all()  
            favorites_data = [
                {
                    'id': favorite.id,
                    'name': favorite.name,
                    'cuisine_type': favorite.cuisine_type,
                    'rating': favorite.rating,
                    'price_level': favorite.price_level,
                    'address': favorite.address,
                    'website': favorite.website,
                    'photos': [{'image': photo.image.url} for photo in favorite.photos.all()],
                }
                for favorite in favorites
            ]
            return Response(favorites_data)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)
    
#POST Add favorite view
logger = logging.getLogger(__name__)
class AddFavoriteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        logger.debug(f"AddFavoriteView POST request received for user_id: {user_id}")
        user = get_object_or_404(CustomUser, id=user_id)
        restaurant_id = request.data.get('restaurant')
        logger.debug(f"Restaurant ID from request data: {restaurant_id}")
        restaurant = get_object_or_404(Restaurant, id=restaurant_id)
        
        user.favorite_restaurants.add(restaurant)
        logger.debug(f"Restaurant {restaurant_id} added to user {user_id} favorites")
        return Response({'id': restaurant.id, 'name': restaurant.name}, status=status.HTTP_201_CREATED)

# DELETE Remove favorite view
class RemoveFavoriteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, user_id, restaurant_id):
        logger.debug(f"RemoveFavoriteView DELETE request received for user_id: {user_id}, restaurant_id: {restaurant_id}")
        user = get_object_or_404(CustomUser, id=user_id)
        restaurant = get_object_or_404(Restaurant, id=restaurant_id)
        
        user.favorite_restaurants.remove(restaurant)
        logger.debug(f"Restaurant {restaurant_id} removed from user {user_id} favorites")
        return Response({'id': restaurant.id}, status=status.HTTP_204_NO_CONTENT)




############### GIFT CARD VIEWS ####################

# Gift card purchase view
@csrf_exempt
def giftcard_purchase(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Extraer datos del cuerpo de la solicitud
            card_holder_name = data.get('cardHolderName')
            card_number = data.get('cardNumber')
            expiry_date = data.get('expiryDate')
            cvc = data.get('cvc')
            selected_image = data.get('selectedImage')
            amount = data.get('amount')
            sender_name = data.get('senderName')  
            recipient_name = data.get('recipientName')
            recipient_last_name = data.get('recipientLastName')
            email = data.get('email')
            delivery_time = data.get('deliveryTime')
            selected_date = data.get('selectedDate')
            selected_time = data.get('selectedTime')
            message = data.get('message')
            user_id = data.get('user')
            if selected_time:
                try:
                    try:
                        selected_time = datetime.strptime(selected_time, '%a %b %d %Y %H:%M:%S GMT%z (%Z)').time()
                    except ValueError:
                        selected_time = datetime.strptime(selected_time, '%H:%M').time()
                except ValueError:
                    return JsonResponse({'error': 'Formato de hora inválido'}, status=400)

            # Generar un número de orden único
            order_number = str(uuid.uuid4())

            # Guardar la información en la base de datos
            gift_card = GiftCard.objects.create(
                user_id=user_id,
                card_holder_name=card_holder_name,
                card_number=card_number,
                expiry_date=expiry_date,
                cvc=cvc,
                amount=amount,
                message=message,
                selected_date=selected_date,  
                selected_time=selected_time,  
                sender_name=sender_name,
                recipient_name=recipient_name,
                recipient_last_name=recipient_last_name,
                email=email,
                delivery_time=delivery_time,
                selected_image=selected_image,
                order_number=order_number,
                status='active'  # Establecer el estado por defecto a 'active'
            )
            response_data = {
                'order_number': order_number,
                'status': gift_card.status  # Incluir el estado en la respuesta
            }

            return JsonResponse(response_data, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)

# GET User gift card list view
class UserGiftCardListView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        giftcards = GiftCard.objects.filter(user=user)
        giftcards_data = [
            {
                'id': giftcard.id,
                'card_holder_name': giftcard.card_holder_name,
                'card_number': giftcard.card_number,
                'cvc': giftcard.cvc,
                'expiry_date': giftcard.expiry_date,
                'amount': giftcard.amount,
                'message': giftcard.message,
                'created_at': giftcard.created_at,
                'delivery_time': giftcard.delivery_time,
                'email': giftcard.email,
                'from': giftcard.sender_name,  
                'image': giftcard.selected_image,  
                'selected_date': giftcard.selected_date,
                'selected_time': giftcard.selected_time,
                'to': giftcard.recipient_name,  
                'to_last_name': giftcard.recipient_last_name, 
                'order_number': giftcard.order_number 
            }
            for giftcard in giftcards
        ]
        return JsonResponse(giftcards_data, safe=False)


# Delete gift card view
class DeleteGiftCardView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, giftcard_id):
        try:
            giftcard = GiftCard.objects.get(id=giftcard_id, user=request.user)
            giftcard.delete()
            return JsonResponse({'message': 'Gift card deleted successfully'}, status=200)
        except GiftCard.DoesNotExist:
            return JsonResponse({'error': 'Gift card not found'}, status=404)
        

############## promo code view ####################
logger = logging.getLogger(__name__)

# Generate promo code view

class GeneratePromoCodeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        logger.debug(f"Request received to generate promo code for user: {user.email}")

        if user.promoCode:
            logger.debug(f"User {user.email} already has a promo code: {user.promoCode}")
            return Response({'promo_code': user.promoCode, 'message': 'Ya tienes un código promocional.'}, status=status.HTTP_200_OK)
        
        promo_code = str(uuid.uuid4())[:8]  # Genera un código promocional único
        user.promoCode = promo_code
        user.promoCodeExpiry = timezone.now() + timedelta(days=7)  # Establece la fecha de expiración
        user.save()
        logger.debug(f"Generated promo_code: {promo_code} for user: {user.email}")
        return Response({'promo_code': promo_code, 'message': 'Código promocional generado con éxito.'}, status=status.HTTP_201_CREATED)



# Validate promo code view
logger = logging.getLogger(__name__)

class ValidatePromoCodeView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        promo_code = request.data.get('promo_code')
        logger.debug(f"Received promo_code: {promo_code}")

        if not promo_code:
            logger.debug("No promo_code provided")
            return Response({'message': 'Código promocional es requerido.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            referred_user = CustomUser.objects.get(promoCode=promo_code)
            logger.debug(f"Found referred_user: {referred_user}")

            # Verificar si el código promocional ha expirado
            if referred_user.promoCodeExpiry and referred_user.promoCodeExpiry < timezone.now():
                logger.debug("Promo code has expired")
                return Response({'message': 'Código promocional ha expirado.'}, status=status.HTTP_400_BAD_REQUEST)
            
            logger.debug("Promo code is valid")
            return Response({'message': 'Código promocional válido.'}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            logger.debug("Promo code does not exist")
            return Response({'message': 'Código promocional no válido.'}, status=status.HTTP_400_BAD_REQUEST)