from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from .models import Owner, Restaurant, Reservation, Review, Photo, OpeningHour
from accounts.models import CustomUser
import logging
from django.contrib.auth import get_user_model


logger = logging.getLogger(__name__)

User = get_user_model()

##############Serializador para el propietario###############
class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = [
            'id', 'first_name', 'last_name', 'email', 'phoneNumber', 
            'countryCode', 'restaurant_name', 'restaurant_address', 'average_ticket'
        ]
        read_only_fields = ['id']


###################Serializador REGISTRO OWNER################
class RegisterOwnerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Owner
        fields = [
            'email', 'password', 'first_name', 'last_name', 
            'countryCode', 'phoneNumber', 'restaurant_name', 'restaurant_address', 'average_ticket'
        ]
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
            'countryCode': {'required': False},
            'phoneNumber': {'required': False},
            'restaurant_name': {'required': False},
            'restaurant_address': {'required': False},
            'average_ticket': {'required': False},
        }

    def validate(self, data):
        if Owner.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("Este correo electrónico ya está en uso.")
        return data

    def create(self, validated_data):
        # Crear un nuevo usuario
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )

        # Crear un nuevo owner y asignar el usuario
        owner = Owner.objects.create(
            user=user,
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            countryCode=validated_data.get('countryCode', ''),
            phoneNumber=validated_data.get('phoneNumber', ''),
            restaurant_name=validated_data.get('restaurant_name', ''),
            restaurant_address=validated_data.get('restaurant_address', ''),
            average_ticket=validated_data.get('average_ticket', 0)
        )
        return owner


#########Serializador LOGIN OWNER################

class OwnerLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        logger.debug(f"Validating email: {email}")

        if email and password:
            # Autenticar usando el modelo CustomUser
            user = authenticate(username=email, password=password)
            if user is not None:
                try:
                    owner = Owner.objects.get(user=user)
                    logger.debug(f"User authenticated and is an owner: {email}")
                    refresh = RefreshToken.for_user(user)
                    return {
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                        'owner': {
                            'id': owner.id,
                            'email': owner.email,
                        }
                    }
                except Owner.DoesNotExist:
                    logger.debug(f"Authenticated user is not an owner: {email}")
                    raise serializers.ValidationError('Invalid email or password')
            else:
                logger.debug(f"Authentication failed for email: {email}")
                raise serializers.ValidationError('Invalid email or password')
        else:
            logger.debug("Email and password are required")
            raise serializers.ValidationError('Email and password are required')



        

#################Serializador PHOTOS####################

class PhotoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ['image', 'restaurant', 'id', 'image_url']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url


####################Serializador REVIEW####################
class ReviewSerializer(serializers.ModelSerializer):
    restaurant_name = serializers.CharField(source='restaurant.name', read_only=True)
    user_full_name = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'restaurant', 'restaurant_name', 'user', 'user_full_name', 'rating', 'comment', 'created_at', 'updated_at', 'owner_response']

    def get_user_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"

##Serializador REVIEW RESPONSE##
class ReviewResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'owner_response', 'comment', 'rating']


#################Serializador OPENING HOURS####################
class OpeningHourSerializer(serializers.ModelSerializer):
    day_of_week_display = serializers.CharField(source='get_day_of_week_display', read_only=True)

    class Meta:
        model = OpeningHour
        fields = ['day_of_week', 'day_of_week_display', 'open_time', 'close_time']



###############Serializador RESTAURANT#####################
class RestaurantSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)
    restaurant_reviews = ReviewSerializer(many=True, read_only=True)
    opening_hours_set = OpeningHourSerializer(many=True, read_only=True)
    menu_pdf_url = serializers.SerializerMethodField()  

    class Meta:
        model = Restaurant
        fields = [
            'id', 'name', 'address', 'cuisine_type', 'rating', 'price_level', 'website',
            'photos', 'restaurant_reviews', 'opening_hours_set', 'menu_pdf_url'  # Incluye el nuevo campo
        ]

    def get_menu_pdf_url(self, obj):
        request = self.context.get('request')
        if obj.menu_pdf and request:
            return request.build_absolute_uri(obj.menu_pdf.url)
        return None




############ Serializador CUSTOM USER ############
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'email', 'phoneNumber']




############ Serializador CUSTOM USER ############
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'email', 'phoneNumber']


############ Serializador RESERVATION############
class ReservationSerializer(serializers.ModelSerializer):
    user_first_name = serializers.CharField(source='user.first_name', read_only=True)
    user_last_name = serializers.CharField(source='user.last_name', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_phone_number = serializers.CharField(source='user.phoneNumber', read_only=True)
    restaurant_name = serializers.CharField(source='restaurant.name', read_only=True)

    class Meta:
        model = Reservation
        fields = [
            'id', 
            'restaurant_name', 
            'user_first_name', 
            'user_last_name', 
            'user_email', 
            'user_phone_number', 
            'party_size', 
            'time', 
            'reservation_date',  
            'seat_preference', 
            'special_request', 
        ]