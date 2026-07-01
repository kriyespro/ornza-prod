from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('dashboard/', views.DashboardView.as_view(), name='dashboard'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('orders/', views.OrdersView.as_view(), name='orders'),
    path('addresses/', views.AddressListView.as_view(), name='addresses'),
    path('addresses/add/', views.AddressAddView.as_view(), name='address_add'),
    path('addresses/<int:pk>/delete/', views.AddressDeleteView.as_view(), name='address_delete'),
    path('wishlist/', views.WishlistView.as_view(), name='wishlist'),
    path('wishlist/toggle/<int:product_id>/', views.WishlistToggleView.as_view(), name='wishlist_toggle'),
]
