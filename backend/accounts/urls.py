from django.urls import path
from .views import (
    login_view, logout_view, RegisterView, UserDetailView, UserUpdateView, 
    UserReservationsView, CancelReservationView, UserFavoritesView, 
    UserPointsView, UserReviewsView,UserDetailsView, AddFavoriteView, 
    RemoveFavoriteView, ReviewUpdateView,ReviewDeleteView, GenerateQRCodeView, 
    giftcard_purchase,UserGiftCardListView, DeleteGiftCardView, ReviewCreateView
)

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', UserDetailView.as_view(), name='user-detail'),
    path('user/update/', UserUpdateView.as_view(), name='user-update'),
    path('reservations/', UserReservationsView.as_view(), name='user_reservations'),
    path('reservations/<int:reservation_id>/', CancelReservationView.as_view(), name='cancel_reservation'),
    path('user/<int:user_id>/favorites/', UserFavoritesView.as_view(), name='user_favorites'),
    path('users/<int:user_id>/points/', UserPointsView.as_view(), name='user-points'),
    path('reviews/', UserReviewsView.as_view(), name='user-reviews'),
    path('user_details/<int:id>/', UserDetailsView.as_view(), name='user-details'),
    path('user/<int:user_id>/favorites/add/', AddFavoriteView.as_view(), name='add_favorite'),
    path('user/<int:user_id>/favorites/<int:restaurant_id>/remove/', RemoveFavoriteView.as_view(), name='remove_favorite'),
    path('users/<int:user_id>/reviews/', UserReviewsView.as_view(), name='user-reviews'),  # GET, POST
    path('restaurants/<int:restaurant_id>/reviews/', ReviewCreateView.as_view(), name='create-review'),
    path('reviews/<int:pk>/', ReviewUpdateView.as_view(), name='review-update'),  # PUT
    path('reviews/<int:pk>/delete/', ReviewDeleteView.as_view(), name='review-delete'),  # DELETE
    path('qr-code/<int:user_id>/', GenerateQRCodeView.as_view(), name='generate_qr_code'),
    path('giftcardpurchase/', giftcard_purchase, name='giftcard_purchase'),
    path('usergiftcards/', UserGiftCardListView.as_view(), name='user_giftcard_list'),
    path('deletegiftcard/<int:giftcard_id>/', DeleteGiftCardView.as_view(), name='delete_giftcard'),
    

]