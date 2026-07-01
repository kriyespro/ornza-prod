from django.urls import path
from . import views

app_name = 'control'

urlpatterns = [
    path('', views.DashboardView.as_view(), name='dashboard'),
    path('users/', views.UserListView.as_view(), name='users'),
    path('users/<int:pk>/', views.UserDetailView.as_view(), name='user_detail'),
    path('products/', views.ProductListView.as_view(), name='products'),
    path('products/add/', views.ProductAddView.as_view(), name='product_add'),
    path('products/<int:pk>/edit/', views.ProductEditView.as_view(), name='product_edit'),
    path('orders/', views.OrderListView.as_view(), name='orders'),
    path('orders/<int:pk>/', views.OrderDetailView.as_view(), name='order_detail'),
    path('analytics/', views.AnalyticsView.as_view(), name='analytics'),
]
