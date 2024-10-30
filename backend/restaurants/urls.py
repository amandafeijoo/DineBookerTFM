from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import OwnerCreateView, OwnerDeleteView, owner_login_view, owner_logout_view, BarcelonaRestaurantsView, MadridRestaurantsView,PhotoUploadView, RestaurantDetailsView, make_reservation, OwnerRestaurantsView, UpdateRestaurantView, DeleteRestaurantView, OwnerReservationsView, CancelReservationView, ReviewResponseView, search_restaurants, search_cuisine_types, serve_menu_pdf 

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('owners/', OwnerCreateView.as_view(), name='register_owner'),
    path('owners/delete/', OwnerDeleteView.as_view(), name='owner-delete'),
    path('owners/login/', owner_login_view, name='owner_login'),  
    path('owners/logout/', owner_logout_view, name='owner-logout'),
    path('rating_restaurants/Barcelona/', BarcelonaRestaurantsView.as_view(), name='barcelona_restaurants'),
    path('rating_restaurants/Madrid/', MadridRestaurantsView.as_view(), name='madrid_restaurants'),
    path('upload/photo/', PhotoUploadView.as_view(), name='upload_photo'),
    path('restaurant_details/<int:id>/', RestaurantDetailsView.as_view(), name='restaurant-details'),
    path('reservations/', make_reservation, name='make_reservation'),
    path('owner-restaurants/', OwnerRestaurantsView.as_view(), name='owner-restaurants'),
    path('restaurants/<int:pk>/update/', UpdateRestaurantView.as_view(), name='update-restaurant'),
    path('restaurants/<int:pk>/delete/', DeleteRestaurantView.as_view(), name='delete-restaurant'),
    path('owner-reservations/', OwnerReservationsView.as_view(), name='owner-reservations'),
    path('reservations/<int:reservation_id>/delete/', CancelReservationView.as_view(), name='cancel-reservation'),
    path('reviews/<int:review_id>/response/', ReviewResponseView.as_view(), name='review-response'),
    path('search_restaurants/', search_restaurants, name='search_restaurants'),
    path('search_cuisine_types/', views.search_cuisine_types, name='search_cuisine_types'),  
    path('menu_pdf/<int:restaurant_id>/', serve_menu_pdf, name='serve_menu_pdf'),




]