from django.urls import path
from . import views

app_name = 'store'

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('collections/', views.CollectionsView.as_view(), name='collections'),
    path('collections/<slug:slug>/', views.CategoryView.as_view(), name='category'),
    path('product/<slug:slug>/', views.ProductDetailView.as_view(), name='product'),
    path('search/', views.SearchView.as_view(), name='search'),
    path('about/', views.AboutView.as_view(), name='about'),
    path('contact/', views.ContactView.as_view(), name='contact'),
    path('reviews/', views.ReviewsView.as_view(), name='reviews'),
    path('track-order/', views.TrackOrderView.as_view(), name='track_order'),
    path('size-guide/', views.SizeGuideView.as_view(), name='size_guide'),
    path('wholesale/', views.WholesaleView.as_view(), name='wholesale'),
    path('privacy-policy/', views.PrivacyView.as_view(), name='privacy'),
    path('return-policy/', views.ReturnPolicyView.as_view(), name='return_policy'),
    path('shipping-info/', views.ShippingInfoView.as_view(), name='shipping_info'),
    path('terms/', views.TermsView.as_view(), name='terms'),
]
