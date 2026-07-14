class RequestContextMixin:
    """Injects request, user, cart count, and flash messages into Jinja2 context."""

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['request'] = self.request
        ctx['user'] = self.request.user
        try:
            from django.contrib.messages import get_messages
            ctx['messages'] = list(get_messages(self.request))
        except Exception:
            ctx['messages'] = []
        try:
            from cart.services import get_cart
            ctx['cart_count'] = get_cart(self.request).item_count
        except Exception:
            ctx['cart_count'] = 0
        return ctx
