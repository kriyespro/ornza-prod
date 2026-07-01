from django.views.generic import TemplateView, View
from django.shortcuts import redirect, get_object_or_404
from django.http import HttpResponse
from store.models import Product
from .models import Cart, CartItem
from . import services


class CartView(TemplateView):
    template_name = 'cart/cart.jinja'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['cart'] = services.get_cart(self.request)
        return ctx


class AddToCartView(View):
    def post(self, request, product_id):
        product = get_object_or_404(Product, pk=product_id, is_active=True)
        services.add_to_cart(request, product)
        if request.headers.get('HX-Request'):
            cart = services.get_cart(request)
            return HttpResponse(
                f'<span id="cart-count">{cart.item_count}</span>',
                content_type='text/html'
            )
        return redirect('cart:cart')


class RemoveFromCartView(View):
    def post(self, request, item_id):
        services.remove_from_cart(request, item_id)
        if request.headers.get('HX-Request'):
            cart = services.get_cart(request)
            from django.template.loader import render_to_string
            return HttpResponse(render_to_string('cart/partials/_cart_items.jinja', {'cart': cart}, request=request))
        return redirect('cart:cart')


class UpdateCartView(View):
    def post(self, request, item_id):
        qty = int(request.POST.get('quantity', 1))
        services.update_cart_item(request, item_id, qty)
        if request.headers.get('HX-Request'):
            cart = services.get_cart(request)
            from django.template.loader import render_to_string
            return HttpResponse(render_to_string('cart/partials/_cart_items.jinja', {'cart': cart}, request=request))
        return redirect('cart:cart')


class CheckoutView(TemplateView):
    template_name = 'cart/checkout.jinja'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['cart'] = services.get_cart(self.request)
        if self.request.user.is_authenticated:
            ctx['addresses'] = self.request.user.addresses.all()
        return ctx


class CheckoutConfirmView(View):
    def post(self, request):
        from orders import services as order_services
        order = order_services.create_order_from_cart(request)
        if order:
            services.clear_cart(request)
            return redirect('orders:detail', order_number=order.order_number)
        return redirect('cart:checkout')
