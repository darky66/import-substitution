from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_page, name = 'main'),
    path('favourites/', views.favourites, name = 'favourites'),
    path('accounts/login/', views.login_view, name = 'login'),
    path('register/', views.register_view, name = 'register'),
]

