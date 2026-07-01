from django.urls import path
from . import views

app_name = 'cart'

urlpatterns = [
    path('', views.CartView.as_view(), name='cart'),
    path('add/<int:product_id>/', views.AddToCartView.as_view(), name='add'),
    path('remove/<int:item_id>/', views.RemoveFromCartView.as_view(), name='remove'),
    path('update/<int:item_id>/', views.UpdateCartView.as_view(), name='update'),
    path('checkout/', views.CheckoutView.as_view(), name='checkout'),
    path('checkout/confirm/', views.CheckoutConfirmView.as_view(), name='checkout_confirm'),
]
