from django.urls import path
from .views import RegisterView, UserDetailView, UserUpdateView, login_view

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', UserDetailView.as_view(), name='user-detail'),
    path('user/update/', UserUpdateView.as_view(), name='user-update'),
    path('login/', login_view, name='login'),
]