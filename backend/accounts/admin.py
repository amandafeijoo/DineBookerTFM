
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from restaurants.models import Review
from restaurants.models import Reservation
from accounts.models import GiftCard

class ReviewInline(admin.TabularInline):
    model = Review
    extra = 0
    fields = ['user', 'rating', 'comment', 'owner_response']  
    readonly_fields = ['user', 'rating', 'comment', 'owner_response'] 

class ReservationInline(admin.TabularInline):
    model = Reservation
    extra = 0

class GiftCardInline(admin.TabularInline):
    model = GiftCard
    extra = 0

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'is_active', 'points')
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'points', 'favorite_restaurants')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)
    inlines = [ReviewInline, ReservationInline, GiftCardInline]

admin.site.register(CustomUser, CustomUserAdmin)