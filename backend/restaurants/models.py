from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.conf import settings
from accounts.models import CustomUser 
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User

class Owner(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, null=True, default=None)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    password = models.CharField(max_length=128)
    phoneNumber = models.CharField(max_length=15)
    average_ticket = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    countryCode = models.CharField(max_length=10, default='+34')
    restaurant_address = models.CharField(max_length=255)
    restaurant_name = models.CharField(max_length=100)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self.save()

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return f"{self.email} - {self.restaurant_name}"
    

class Restaurant(models.Model):
    CITY_CHOICES = [
        ('Madrid', 'Madrid'),
        ('Barcelona', 'Barcelona'),
    ]

    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    website = models.URLField(blank=True, null=True)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    menu_pdf = models.FileField(upload_to='menus/', blank=True, null=True)
    cuisine_type = models.CharField(max_length=100)
    price_level = models.IntegerField(choices=[(1, '€'), (2, '€€'), (3, '€€€'), (4, '€€€€')])
    rating = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    points = models.IntegerField(default=0)
    city = models.CharField(max_length=100, choices=CITY_CHOICES, default='Madrid')  
    country = models.CharField(max_length=100, default='España')

    def __str__(self):
        return self.name
    
class OpeningHour(models.Model):
    DAYS_OF_WEEK = [
        (0, 'Domingo'),
        (1, 'Lunes'),
        (2, 'Martes'),
        (3, 'Miércoles'),
        (4, 'Jueves'),
        (5, 'Viernes'),
        (6, 'Sábado'),
    ]

    restaurant = models.ForeignKey(Restaurant, related_name='opening_hours_set', on_delete=models.CASCADE)
    day_of_week = models.IntegerField(choices=DAYS_OF_WEEK)
    open_time = models.TimeField()
    close_time = models.TimeField()

    class Meta:
        unique_together = ('restaurant', 'day_of_week')

    def __str__(self):
        return f"{self.get_day_of_week_display()}: {self.open_time} - {self.close_time}"
    
class Photo(models.Model):
    image = models.ImageField(upload_to='restaurant_photos/')
    restaurant = models.ForeignKey(Restaurant, related_name='photos', on_delete=models.CASCADE)



class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, related_name='restaurant_reviews', on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner_response = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'restaurants_review'
        indexes = [
            models.Index(fields=['restaurant']),
            models.Index(fields=['user']),
        ]

    def __str__(self):
        return f"Review by {self.user.username} at {self.restaurant.name} with rating {self.rating}"


class Reservation(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    reservation_date = models.DateField()
    time = models.TimeField()
    party_size = models.IntegerField()
    seat_preference = models.CharField(max_length=255, blank=True, null=True)
    special_request = models.TextField(blank=True, null=True)
    offer_code = models.CharField(max_length=50, blank=True, null=True)
    receive_offers = models.BooleanField(default=False)

    def __str__(self):
        return f"Reservation by {self.user.username} at {self.restaurant.name} on {self.reservation_date} at {self.time}"