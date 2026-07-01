from django.urls import path
from . import views

app_name = 'orders'

urlpatterns = [
    path('', views.OrderListView.as_view(), name='list'),
    path('<str:order_number>/', views.OrderDetailView.as_view(), name='detail'),
    path('<str:order_number>/track/', views.TrackOrderView.as_view(), name='track'),
]
