from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_page, name = 'main'),
    path('favourites/', views.favourites, name = 'favourites'),
    path('accounts/login/', views.login_view, name = 'login'),
    path('logout/', views.logout_page, name = 'logout'),
    path('register/', views.register_view, name = 'register'),
    path("404/", views.error_404, name="error_404"),
    path("500/", views.error_500, name="error_500"),
]

