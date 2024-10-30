# admin.py
from django.contrib import admin
from .models import Owner, Restaurant, Reservation, Review, OpeningHour, Photo

class ReviewInline(admin.TabularInline):
    model = Review
    extra = 1

class OpeningHourInline(admin.TabularInline):
    model = OpeningHour
    extra = 7

class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 4  # Número de formularios vacíos adicionales para agregar nuevas fotos

@admin.register(Owner)
class OwnerAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'restaurant_name', 'restaurant_address', 'average_ticket')
    search_fields = ('email', 'restaurant_name')

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'cuisine_type', 'owner', 'city', 'email')
    search_fields = ('name', 'owner__email')
    inlines = [ReviewInline, OpeningHourInline, PhotoInline]  # Añadir el inline de Review, OpeningHour y Photo

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('user', 'restaurant', 'reservation_date', 'time', 'party_size')
    search_fields = ('user__username', 'restaurant__name')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'restaurant', 'rating', 'created_at')  # Incluir el campo rating
    search_fields = ('user__username', 'restaurant__name')