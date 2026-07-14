from .models import Order, OrderItem
from cart.services import get_cart


def create_order_from_cart(request):
    cart = get_cart(request)
    if not cart.items.exists():
        return None

    data = request.POST
    required = ('full_name', 'phone', 'address_line1', 'city', 'state', 'pincode')
    if not all(str(data.get(field, '')).strip() for field in required):
        return None

    subtotal = cart.total
    shipping = 0 if subtotal >= 999 else 99
    total = subtotal + shipping

    order = Order.objects.create(
        user=request.user if request.user.is_authenticated else None,
        full_name=data.get('full_name', '').strip(),
        phone=data.get('phone', '').strip(),
        email=data.get('email', '').strip(),
        address_line1=data.get('address_line1', '').strip(),
        address_line2=data.get('address_line2', '').strip(),
        city=data.get('city', '').strip(),
        state=data.get('state', '').strip(),
        pincode=data.get('pincode', '').strip(),
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
