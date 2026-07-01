class RequestContextMixin:
    """Injects request, user, and cart count into Jinja2 template context."""

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['request'] = self.request
        ctx['user'] = self.request.user
        # Live cart count for nav badge
        try:
            from cart.services import get_cart
            ctx['cart_count'] = get_cart(self.request).item_count
        except Exception:
            ctx['cart_count'] = 0
        return ctx
