from django.contrib import admin

from django.contrib import admin
from .models import Owner, Restaurant, Reservation

admin.site.register(Owner)
admin.site.register(Restaurant)
admin.site.register(Reservation)