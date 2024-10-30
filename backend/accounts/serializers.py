from rest_framework import serializers
from .models import CustomUser, GiftCard, PromoCode
from restaurants.models import Reservation, Restaurant, Review
from restaurants.serializers import RestaurantSerializer




# Restaurant Serializer
class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'address', 'cuisine_type', 'rating', 'price_level', 'website']


# Review Serializer
class ReviewSerializer(serializers.ModelSerializer):
    restaurant_name = serializers.CharField(source='restaurant.name', read_only=True)
    user_full_name = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'restaurant', 'restaurant_name', 'user', 'user_full_name', 'rating', 'comment', 'created_at', 'updated_at', 'owner_response']
        extra_kwargs = {
            'restaurant': {'required': False},
            'user': {'required': True},  
            'rating': {'required': False},
        }

    def get_user_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

# Reservation Serializer

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

    def create(self, validated_data):
        reservation = super().create(validated_data)
        user = reservation.user
        user.points += 500  # Agregar 500 puntos al crear una reserva
        user.save()
        return reservation

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    favorite_restaurants = RestaurantSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True, source='review_set')
    reservations = ReservationSerializer(many=True, read_only=True, source='reservation_set')

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'countryCode', 'phoneNumber', 'promoCode', 'promoCodeExpiry', 'gender', 'birth_date', 'date_joined', 'is_active', 'points', 'favorite_restaurants', 'reviews', 'reservations']
        read_only_fields = ['date_joined', 'is_active', 'points']


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    verify_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            'email', 'password', 'verify_password', 'first_name', 'last_name', 
            'countryCode', 'phoneNumber', 'promoCode', 'promoCodeExpiry', 
            'promo_code_used', 'gender', 'birth_date'
        ]
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
            'countryCode': {'required': False},
            'phoneNumber': {'required': False},
            'promoCode': {'required': False},
            'promoCodeExpiry': {'required': False},
            'promo_code_used': {'required': False},
            'gender': {'required': False},
            'birth_date': {'required': False},
        }

    def validate(self, data):
        if data['password'] != data['verify_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('verify_password')
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            countryCode=validated_data.get('countryCode', ''),
            phoneNumber=validated_data.get('phoneNumber', ''),
            promoCode=validated_data.get('promoCode', ''),
            promoCodeExpiry=validated_data.get('promoCodeExpiry', None),
            gender=validated_data.get('gender', ''),
            birth_date=validated_data.get('birth_date', None)
        )
        return user

#GiftCard Serializer

class GiftCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiftCard
        fields = '__all__'

############ PromoCode Serializer ############

class PromoCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromoCode
        fields = ['code', 'user', 'created_at', 'is_valid']