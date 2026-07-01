from django.views.generic import TemplateView, ListView, DetailView
from django.http import HttpResponse
from core.mixins import RequestContextMixin
from .models import Product, Category
from .services import get_product_gallery


class HomeView(RequestContextMixin, TemplateView):
    template_name = 'store/home.jinja'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['featured'] = Product.objects.filter(is_active=True, is_featured=True)[:8]
        ctx['bestsellers'] = Product.objects.filter(is_active=True, is_bestseller=True)[:8]
        ctx['categories'] = Category.objects.filter(is_active=True)
        return ctx


class CollectionsView(RequestContextMixin, ListView):
    template_name = 'store/collections.jinja'
    context_object_name = 'products'
    paginate_by = 24

    def get_queryset(self):
        return Product.objects.filter(is_active=True).select_related('category')

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['categories'] = Category.objects.filter(is_active=True)
        return ctx


class CategoryView(RequestContextMixin, ListView):
    template_name = 'store/category.jinja'
    context_object_name = 'products'
    paginate_by = 24

    def get_queryset(self):
        self.category = Category.objects.get(slug=self.kwargs['slug'], is_active=True)
        return Product.objects.filter(category=self.category, is_active=True)

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['category'] = self.category
        return ctx


class ProductDetailView(RequestContextMixin, DetailView):
    template_name = 'store/product.jinja'
    context_object_name = 'product'
    slug_field = 'slug'

    def get_queryset(self):
        return Product.objects.filter(is_active=True).prefetch_related('images')

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['gallery'] = get_product_gallery(self.object)
        ctx['related'] = Product.objects.filter(
            category=self.object.category, is_active=True
        ).exclude(pk=self.object.pk)[:4]
        return ctx


class SearchView(RequestContextMixin, ListView):
    template_name = 'store/search.jinja'
    context_object_name = 'products'
    paginate_by = 24

    def get_queryset(self):
        q = self.request.GET.get('q', '')
        if q:
            return Product.objects.filter(is_active=True, name__icontains=q)
        return Product.objects.none()

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['query'] = self.request.GET.get('q', '')
        return ctx


class AboutView(RequestContextMixin, TemplateView):
    template_name = 'store/about.jinja'


class ContactView(RequestContextMixin, TemplateView):
    template_name = 'store/contact.jinja'

    def post(self, request):
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        subject = request.POST.get('subject', '').strip()
        message = request.POST.get('message', '').strip()
        if name and email and message:
            # Log to console / store in DB in future
            import logging
            logging.getLogger(__name__).info(f'Contact form: {name} <{email}> — {subject}')
        ctx = self.get_context_data()
        ctx['success'] = bool(name and email and message)
        from django.template.loader import render_to_string
        if request.headers.get('HX-Request'):
            msg = 'Thank you! We\'ll reply within 24 hours.' if ctx['success'] else 'Please fill all required fields.'
            return HttpResponse(f'<div class="form-message success">{msg}</div>')
        return self.render_to_response(ctx)


class ReviewsView(RequestContextMixin, TemplateView):
    template_name = 'store/reviews.jinja'

    def post(self, request):
        ctx = self.get_context_data()
        ctx['success'] = True
        return self.render_to_response(ctx)


class TrackOrderView(RequestContextMixin, TemplateView):
    template_name = 'store/track_order.jinja'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        order_number = self.request.GET.get('order_number', '').strip()
        if order_number:
            from orders.models import Order
            try:
                ctx['order'] = Order.objects.get(order_number=order_number)
            except Order.DoesNotExist:
                ctx['order'] = None
        return ctx


class SizeGuideView(RequestContextMixin, TemplateView):
    template_name = 'store/size_guide.jinja'


class WholesaleView(RequestContextMixin, TemplateView):
    template_name = 'store/wholesale.jinja'


class PrivacyView(RequestContextMixin, TemplateView):
    template_name = 'store/privacy.jinja'


class ReturnPolicyView(RequestContextMixin, TemplateView):
    template_name = 'store/return_policy.jinja'


class ShippingInfoView(RequestContextMixin, TemplateView):
    template_name = 'store/shipping_info.jinja'


class TermsView(RequestContextMixin, TemplateView):
    template_name = 'store/terms.jinja'
