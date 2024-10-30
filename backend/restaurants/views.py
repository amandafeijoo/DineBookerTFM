from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model  
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import PhotoSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser, Owner
from .serializers import OwnerSerializer,RestaurantSerializer,OpeningHourSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.generics import ListAPIView
from restaurants.models import Restaurant
from restaurants.serializers import RestaurantSerializer
from .models import Owner, Restaurant, Review, Photo, OpeningHour, Reservation
from .serializers import  OwnerSerializer, OwnerLoginSerializer, ReservationSerializer, ReviewResponseSerializer,RestaurantSerializer
from .serializers import RegisterOwnerSerializer
from django.db.utils import IntegrityError
from accounts.models import CustomUser
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
import logging
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from django.views.decorators.http import require_POST
from django.shortcuts import get_object_or_404
import json
from django.http import JsonResponse, HttpResponse, Http404
from django.http import FileResponse
import os
import urllib.parse
from django.conf import settings





################OWNER VIEWS#####################

# OWNER REGISTRATION

class OwnerCreateView(generics.CreateAPIView):
    queryset = Owner.objects.all()
    serializer_class = RegisterOwnerSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError as e:
            return Response({"detail": "Este correo electrónico ya está en uso."}, status=status.HTTP_400_BAD_REQUEST)



#OWNER DELETE
@method_decorator(csrf_exempt, name='dispatch')
class OwnerDeleteView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            owner = Owner.objects.get(email=email)
            owner.delete()
            return Response({"message": "Owner deleted successfully."}, status=status.HTTP_200_OK)
        except Owner.DoesNotExist:
            return Response({"error": "Owner with this email does not exist."}, status=status.HTTP_404_NOT_FOUND)

#OWNER LOGIN

logger = logging.getLogger(__name__)

@csrf_exempt
@api_view(['POST'])
def owner_login_view(request):
    logger.debug("owner_login_view: POST request received")
    email = request.data.get('email')
    password = request.data.get('password')
    
    logger.debug(f"owner_login_view: email={email}, password={password}")
    

    if not email or not password:
        logger.debug("owner_login_view: Missing email or password")
        return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        owner = Owner.objects.get(email=email)
        logger.debug(f"owner_login_view: owner={owner}")
        
        if owner.check_password(password):
            refresh = RefreshToken.for_user(owner.user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "owner": {
                    "id": owner.id,
                    "email": owner.email,
                    "first_name": owner.first_name,
                    "last_name": owner.last_name,
                    "phoneNumber": owner.phoneNumber,
                    "average_ticket": owner.average_ticket,
                    "countryCode": owner.countryCode,
                    "restaurant_address": owner.restaurant_address,
                    "restaurant_name": owner.restaurant_name,
                }
            }, status=status.HTTP_200_OK)
        else:
            logger.debug("owner_login_view: Invalid password")
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    except Owner.DoesNotExist:
        logger.debug(f"owner_login_view: No owner found with email={email}")
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)




#OWNER LOGOUT
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def owner_logout_view(request):
    try:
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        token = RefreshToken(refresh_token)
        
        try:
            token.blacklist()
        except TokenError:
            return Response({"error": "Token is already blacklisted"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"success": "Logged out successfully"}, status=status.HTTP_200_OK)
    except InvalidToken:
        return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"Unexpected error: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
    


# OWNER RESTAURANTS

class OwnerRestaurantsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        owner = request.user.owner 
        restaurants = Restaurant.objects.filter(owner=owner).prefetch_related('photos', 'restaurant_reviews', 'opening_hours_set')
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# OWNER RESERVATIONS/USER RESERVATIONS
class OwnerReservationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            owner = request.user.owner 
        except AttributeError:
            return Response({"detail": "User does not have an owner profile."}, status=status.HTTP_403_FORBIDDEN)

        restaurants = Restaurant.objects.filter(owner=owner)
        reservations = Reservation.objects.filter(restaurant__in=restaurants).select_related('user', 'restaurant')
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)

class CancelReservationView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, reservation_id, *args, **kwargs):
        try:
            owner = request.user.owner  
        except AttributeError:
            return Response({"detail": "User does not have an owner profile."}, status=status.HTTP_403_FORBIDDEN)

        reservation = get_object_or_404(Reservation, id=reservation_id, restaurant__owner=owner)
        reservation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



#REVIEWS RESPONSE/USER REVIEWS

class ReviewResponseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, review_id, *args, **kwargs):
        try:
            owner = request.user.owner
        except AttributeError:
            return Response({"detail": "User does not have an owner profile."}, status=status.HTTP_403_FORBIDDEN)

        review = get_object_or_404(Review, id=review_id, restaurant__owner=owner)
        serializer = ReviewResponseSerializer(review, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, review_id, *args, **kwargs):
        review = get_object_or_404(Review, id=review_id)
        serializer = ReviewResponseSerializer(review)
        return Response(serializer.data, status=status.HTTP_200_OK)

##########RESTAURANT VIEWS###############


#RESTAURANT RATING VIEWS
#barcelona
class BarcelonaRestaurantsView(ListAPIView):
    serializer_class = RestaurantSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Restaurant.objects.filter(city='Barcelona').order_by('-rating')
    
#madrid

class MadridRestaurantsView(ListAPIView):
    serializer_class = RestaurantSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Restaurant.objects.filter(city='Madrid').order_by('-rating')


#PHOTO UPLOAD

class PhotoUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        file_serializer = PhotoSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#RESTAURANT DETAILS

class RestaurantDetailsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id, *args, **kwargs):
        restaurant = get_object_or_404(Restaurant, id=id)
        photos = Photo.objects.filter(restaurant=restaurant)
        reviews = Review.objects.filter(restaurant=restaurant)
        opening_hours = OpeningHour.objects.filter(restaurant=restaurant)
        
        restaurant_data = RestaurantSerializer(restaurant, context={'request': request}).data
        restaurant_data['photos'] = [photo.image.url for photo in photos]
        restaurant_data['reviews'] = [
            {
                'user': {
                    'first_name': review.user.first_name,
                    'last_name': review.user.last_name
                },
                'comment': review.comment,
                'rating': review.rating
            } for review in reviews
        ]
        restaurant_data['opening_hours'] = OpeningHourSerializer(opening_hours, many=True).data
        
        # Añadir la URL del archivo PDF del menú
        if restaurant.menu_pdf:
            restaurant_data['menu_pdf_url'] = request.build_absolute_uri(restaurant.menu_pdf.url)
        else:
            restaurant_data['menu_pdf_url'] = None
        
        return Response(restaurant_data, status=status.HTTP_200_OK)


 ####### MENU PDF ##########
def serve_menu_pdf(request, restaurant_id):
    try:
        restaurant = Restaurant.objects.get(id=restaurant_id)
        pdf_path = os.path.join(settings.MEDIA_ROOT, restaurant.menu_pdf.name)
        pdf_path = urllib.parse.unquote(pdf_path) 
        return FileResponse(open(pdf_path, 'rb'), content_type='application/pdf')
    except Restaurant.DoesNotExist:
        raise Http404("Restaurant does not exist")
    except FileNotFoundError:
        raise Http404("PDF file not found")



#REVIEWS DE RESTAURANTES

class RestaurantReviewsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, restaurant_id):
        restaurant = get_object_or_404(Restaurant, id=restaurant_id)
        reviews = restaurant.reviews.all() 
        reviews_data = [
            {
                'user': review.user.username,
                'comment': review.comment,
                'rating': review.rating,
                'date': review.created_at,
            }
            for review in reviews
        ]
        return Response({'reviews': reviews_data}, status=status.HTTP_200_OK)




#RESTAURANT UPDATE DATA FOR OWNER ONLY
class UpdateRestaurantView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk, *args, **kwargs):
        try:
            restaurant = Restaurant.objects.get(pk=pk, owner=request.user.owner)
        except Restaurant.DoesNotExist:
            return Response({'error': 'Restaurant not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = RestaurantSerializer(restaurant, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#RESTAURANT DELETE UPDATES  FOR OWNER ONLY
class DeleteRestaurantView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, *args, **kwargs):
        try:
            restaurant = Restaurant.objects.get(pk=pk, owner=request.user.owner)
        except Restaurant.DoesNotExist:
            return Response({'error': 'Restaurant not found'}, status=status.HTTP_404_NOT_FOUND)

        restaurant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


 #######RESERVATIONS VIEWS##########

# RESERVAS
@csrf_exempt
@require_POST
def make_reservation(request):
    try:
        data = json.loads(request.body)
        
        if 'reservation_date' not in data:
            return JsonResponse({'error': "El campo 'reservation_date' es requerido"}, status=400)
        
        user = get_object_or_404(CustomUser, id=data['user'])
        restaurant = get_object_or_404(Restaurant, id=data['restaurant_id'])
        
        reservation = Reservation.objects.create(
            user=user,
            restaurant=restaurant,
            reservation_date=data['reservation_date'],
            time=data['time'],
            party_size=data['party_size'],
            seat_preference=data['seat_preference'],
            special_request=data['special_request'],
            offer_code=data['offer_code'],
            receive_offers=data['receive_offers']
        )
        
        # Incrementar los puntos del usuario
        user.points += 500  # Agregar 500 puntos al crear una reserva
        user.save()
        print(f"User {user.id} now has {user.points} points")  
        
        return JsonResponse({'id': reservation.id, 'status': 'success'})
    
    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, status=404)
    except ValidationError as e:
        return JsonResponse({'error': e.message_dict}, status=400)
    except Exception as e:
        return JsonResponse({'error': 'An unexpected error occurred: ' + str(e)}, status=500)
    



######### BUSQUEDA DE RESTAURANTES ###########
def search_restaurants(request):
    cuisine_type = request.GET.get('cuisine_type')
    city = request.GET.get('city')  
    
    print(f"Received search parameters: cuisine_type={cuisine_type}, city={city}")  
    
    if cuisine_type and city:
        restaurants = Restaurant.objects.filter(cuisine_type__icontains=cuisine_type, city__icontains=city).prefetch_related('photos')
    elif cuisine_type:
        restaurants = Restaurant.objects.filter(cuisine_type__icontains=cuisine_type).prefetch_related('photos')
    elif city:
        restaurants = Restaurant.objects.filter(city__icontains=city).prefetch_related('photos')
    else:
        restaurants = Restaurant.objects.all().prefetch_related('photos')
    
    print(f"Found restaurants: {restaurants}")  
    
    data = []
    for restaurant in restaurants:
        restaurant_data = {
            'id': restaurant.id,
            'name': restaurant.name,
            'city': restaurant.city,
            'cuisine_type': restaurant.cuisine_type,
            'rating': str(restaurant.rating),  
            'photos': [{'image': photo.image.url} for photo in restaurant.photos.all()]
        }
        data.append(restaurant_data)
    
    return JsonResponse(data, safe=False)



######### BUSQUEDA DE TIPOS DE COCINA POR CIUDAD ###########
def search_cuisine_types(request):
    city = request.GET.get('city')
    
    print(f"Received search parameter: city={city}")  
    
    if city:
        cuisine_types = Restaurant.objects.filter(city__icontains=city).values_list('cuisine_type', flat=True).distinct()
    else:
        cuisine_types = Restaurant.objects.values_list('cuisine_type', flat=True).distinct()
    
    print(f"Found cuisine types: {cuisine_types}") 
    
    return JsonResponse(list(cuisine_types), safe=False)


