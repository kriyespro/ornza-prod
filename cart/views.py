from django.views.generic import TemplateView, View
from django.shortcuts import redirect, get_object_or_404
from django.http import HttpResponse
from django.template.loader import render_to_string
from store.models import Product
from core.mixins import RequestContextMixin
from . import services

CART_COUNT_CLS = (
    'cart-count absolute -top-1 -right-1 w-4 h-4 rounded-full '
    'bg-gold text-espresso text-[9px] font-bold flex items-center justify-center'
)


def _cart_count_html(count: int) -> str:
    hidden = ' invisible' if count == 0 else ''
    return (
        f'<span class="{CART_COUNT_CLS}{hidden}" id="cart-count">{count}</span>'
    )


def _htmx_cart_body(request) -> HttpResponse:
    cart = services.get_cart(request)
    html = render_to_string(
        'cart/partials/_cart_htmx.jinja',
        {'cart': cart},
        request=request,
    )
    return HttpResponse(html)


class CartView(RequestContextMixin, TemplateView):
    template_name = 'cart/cart.jinja'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['cart'] = services.get_cart(self.request)
        return ctx


class AddToCartView(View):
    def post(self, request, product_id):
        product = get_object_or_404(Product, pk=product_id, is_active=True)
        if product.stock <= 0:
            if request.headers.get('HX-Request'):
                cart = services.get_cart(request)
                return HttpResponse(_cart_count_html(cart.item_count))
            return redirect('store:product', slug=product.slug)

        services.add_to_cart(request, product)
        cart = services.get_cart(request)

        if request.headers.get('HX-Request'):
            response = HttpResponse(_cart_count_html(cart.item_count))
            response['HX-Trigger'] = 'cartUpdated'
            return response
        return redirect('cart:cart')


class RemoveFromCartView(View):
    def post(self, request, item_id):
        services.remove_from_cart(request, item_id)
        if request.headers.get('HX-Request'):
            return _htmx_cart_body(request)
        return redirect('cart:cart')


class UpdateCartView(View):
    def post(self, request, item_id):
        qty = int(request.POST.get('quantity', 1))
        services.update_cart_item(request, item_id, qty)
        if request.headers.get('HX-Request'):
            return _htmx_cart_body(request)
        return redirect('cart:cart')


class CheckoutView(RequestContextMixin, TemplateView):
    template_name = 'cart/checkout.jinja'

    def get(self, request, *args, **kwargs):
        cart = services.get_cart(request)
        if not cart.items.exists():
            return redirect('cart:cart')
        return super().get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['cart'] = services.get_cart(self.request)
        if self.request.user.is_authenticated:
            ctx['addresses'] = self.request.user.addresses.all()
        return ctx


class CheckoutConfirmView(View):
    def post(self, request):
        from django.contrib import messages
        from orders import services as order_services
        order = order_services.create_order_from_cart(request)
        if order:
            services.clear_cart(request)
            return redirect('orders:detail', order_number=order.order_number)
        messages.error(request, 'Please fill in all required shipping details.')
        return redirect('cart:checkout')
