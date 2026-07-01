from django.views.generic import TemplateView, ListView, View, CreateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import redirect, get_object_or_404
from django.http import HttpResponse
from django.urls import reverse_lazy
from .models import Address, Wishlist
from . import services


class LoginView(View):
    def get(self, request):
        from django.template.loader import render_to_string
        from django.http import HttpResponse
        if request.user.is_authenticated:
            return redirect('users:dashboard')
        return HttpResponse(render_to_string('users/login.jinja', {}, request=request))

    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect(request.POST.get('next', 'users:dashboard'))
        from django.template.loader import render_to_string
        return HttpResponse(render_to_string('users/login.jinja', {'error': 'Invalid credentials'}, request=request))


class LogoutView(View):
    def post(self, request):
        logout(request)
        return redirect('store:home')


class RegisterView(View):
    def get(self, request):
        from django.template.loader import render_to_string
        return HttpResponse(render_to_string('users/register.jinja', {}, request=request))

    def post(self, request):
        result = services.register_user(request.POST)
        if result['success']:
            login(request, result['user'])
            return redirect('users:dashboard')
        from django.template.loader import render_to_string
        return HttpResponse(render_to_string('users/register.jinja', {'errors': result['errors']}, request=request))


class DashboardView(LoginRequiredMixin, TemplateView):
    template_name = 'users/dashboard.jinja'
    login_url = '/users/login/'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['recent_orders'] = self.request.user.orders.all()[:5]
        ctx['wishlist_count'] = self.request.user.wishlist.count()
        return ctx


class ProfileView(LoginRequiredMixin, View):
    login_url = '/users/login/'

    def get(self, request):
        from django.template.loader import render_to_string
        return HttpResponse(render_to_string('users/profile.jinja', {}, request=request))

    def post(self, request):
        services.update_profile(request.user, request.POST, request.FILES)
        from django.template.loader import render_to_string
        return HttpResponse(render_to_string('users/profile.jinja', {'success': True}, request=request))


class OrdersView(LoginRequiredMixin, ListView):
    template_name = 'users/orders.jinja'
    context_object_name = 'orders'
    login_url = '/users/login/'

    def get_queryset(self):
        return self.request.user.orders.all()


class AddressListView(LoginRequiredMixin, ListView):
    template_name = 'users/addresses.jinja'
    context_object_name = 'addresses'
    login_url = '/users/login/'

    def get_queryset(self):
        return self.request.user.addresses.all()


class AddressAddView(LoginRequiredMixin, View):
    login_url = '/users/login/'

    def post(self, request):
        services.add_address(request.user, request.POST)
        return redirect('users:addresses')


class AddressDeleteView(LoginRequiredMixin, View):
    login_url = '/users/login/'

    def post(self, request, pk):
        Address.objects.filter(pk=pk, user=request.user).delete()
        return redirect('users:addresses')


class WishlistView(LoginRequiredMixin, ListView):
    template_name = 'users/wishlist.jinja'
    context_object_name = 'wishlist_items'
    login_url = '/users/login/'

    def get_queryset(self):
        return self.request.user.wishlist.select_related('product').all()


class WishlistToggleView(LoginRequiredMixin, View):
    login_url = '/users/login/'

    def post(self, request, product_id):
        added = services.toggle_wishlist(request.user, product_id)
        if request.headers.get('HX-Request'):
            icon = '♥' if added else '♡'
            return HttpResponse(icon)
        return redirect('users:wishlist')
