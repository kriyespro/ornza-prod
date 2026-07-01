from .models import Order, OrderItem
from cart.services import get_cart


def create_order_from_cart(request):
    cart = get_cart(request)
    if not cart.items.exists():
        return None

    data = request.POST
    subtotal = cart.total
    shipping = 0 if subtotal >= 999 else 99
    total = subtotal + shipping

    order = Order.objects.create(
        user=request.user if request.user.is_authenticated else None,
        full_name=data.get('full_name', ''),
        phone=data.get('phone', ''),
        email=data.get('email', ''),
        address_line1=data.get('address_line1', ''),
        address_line2=data.get('address_line2', ''),
        city=data.get('city', ''),
        state=data.get('state', ''),
        pincode=data.get('pincode', ''),
        payment_method=data.get('payment_method', 'cod'),
        subtotal=subtotal,
        shipping_charge=shipping,
        total=total,
    )

    for item in cart.items.select_related('product').all():
        OrderItem.objects.create(
            order=order,
            product=item.product,
            product_name=item.product.name,
            product_image=item.product.image.url if item.product.image else '',
            price=item.product.price,
            quantity=item.quantity,
        )

    return order
