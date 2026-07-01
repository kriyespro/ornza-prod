from .models import Cart, CartItem


def get_cart(request):
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
    else:
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        cart, _ = Cart.objects.get_or_create(session_key=session_key, user=None)
    return cart


def add_to_cart(request, product, quantity=1):
    cart = get_cart(request)
    item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        item.quantity += quantity
        item.save()
    return item


def remove_from_cart(request, item_id):
    cart = get_cart(request)
    CartItem.objects.filter(pk=item_id, cart=cart).delete()


def update_cart_item(request, item_id, quantity):
    cart = get_cart(request)
    if quantity <= 0:
        CartItem.objects.filter(pk=item_id, cart=cart).delete()
    else:
        CartItem.objects.filter(pk=item_id, cart=cart).update(quantity=quantity)


def clear_cart(request):
    cart = get_cart(request)
    cart.items.all().delete()
