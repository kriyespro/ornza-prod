from django.contrib.auth.models import User
from .models import Profile, Address, Wishlist
from store.models import Product


def register_user(data):
    username = data.get('username', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '')
    errors = {}

    if not username:
        errors['username'] = 'Username required'
    elif User.objects.filter(username=username).exists():
        errors['username'] = 'Username taken'

    if not email:
        errors['email'] = 'Email required'
    elif User.objects.filter(email=email).exists():
        errors['email'] = 'Email already registered'

    if len(password) < 6:
        errors['password'] = 'Password must be at least 6 characters'

    if errors:
        return {'success': False, 'errors': errors}

    user = User.objects.create_user(username=username, email=email, password=password)
    Profile.objects.create(user=user)
    return {'success': True, 'user': user}


def update_profile(user, data, files):
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.save()
    profile, _ = Profile.objects.get_or_create(user=user)
    profile.phone = data.get('phone', profile.phone)
    if 'avatar' in files:
        profile.avatar = files['avatar']
    profile.save()


def add_address(user, data):
    if data.get('is_default'):
        Address.objects.filter(user=user).update(is_default=False)
    Address.objects.create(
        user=user,
        address_type=data.get('address_type', 'home'),
        full_name=data.get('full_name', ''),
        phone=data.get('phone', ''),
        line1=data.get('line1', ''),
        line2=data.get('line2', ''),
        city=data.get('city', ''),
        state=data.get('state', ''),
        pincode=data.get('pincode', ''),
        is_default=bool(data.get('is_default')),
    )


def toggle_wishlist(user, product_id):
    product = Product.objects.get(pk=product_id)
    obj, created = Wishlist.objects.get_or_create(user=user, product=product)
    if not created:
        obj.delete()
        return False
    return True
