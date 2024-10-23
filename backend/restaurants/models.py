from django.db import models
from django.conf import settings
from django.contrib.auth.hashers import make_password

class OwnerManager(models.Manager):
    def create_owner(self, first_name, last_name, email, phone, password):
        owner = self.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
            password=make_password(password)  # Hash the password for security
        )
        return owner

class Owner(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=255)  # Consider using Django's built-in user model for better security

    objects = OwnerManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    website = models.URLField(blank=True, null=True)
    opening_hours = models.CharField(max_length=255)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    menu_pdf = models.FileField(upload_to='menus/', blank=True, null=True)
    cuisine_type = models.CharField(max_length=100)
    reviews = models.TextField(blank=True, null=True)
    price_level = models.IntegerField(choices=[(1, '$'), (2, '$$'), (3, '$$$'), (4, '$$$$')])
    rating = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)

    def __str__(self):
        return self.name

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