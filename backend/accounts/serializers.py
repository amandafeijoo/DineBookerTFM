# serializers.py
from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    # is_owner = serializers.BooleanField(read_only=True)  # Elimina el argumento source  'is_owner' en el método to_representation

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'countryCode', 'phoneNumber', 'promoCode', 'gender', 'birth_date', 'date_joined', 'is_active']
        read_only_fields = ['date_joined', 'is_active', ]

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    verify_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'verify_password', 'first_name', 'last_name', 'countryCode', 'phoneNumber', 'promoCode', 'gender', 'birth_date']
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
            'countryCode': {'required': False},
            'phoneNumber': {'required': False},
            'promoCode': {'required': False},
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
            gender=validated_data.get('gender', ''),
            birth_date=validated_data.get('birth_date', None)
        )
        return user