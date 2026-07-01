from django.views.generic import TemplateView, ListView, DetailView
from django.contrib.admin.views.decorators import staff_member_required
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from django.db.models import Count, Sum
from django.utils import timezone
from core.mixins import RequestContextMixin
from store.models import Product, Category
from orders.models import Order


@method_decorator(staff_member_required, name='dispatch')
class DashboardView(RequestContextMixin, TemplateView):
    template_name = 'control/dashboard.jinja'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        today = timezone.now().date()
        ctx['total_users'] = User.objects.count()
        ctx['signups_today'] = User.objects.filter(date_joined__date=today).count()
        ctx['total_orders'] = Order.objects.count()
        ctx['revenue'] = Order.objects.filter(is_paid=True).aggregate(total=Sum('total'))['total'] or 0
        ctx['recent_orders'] = Order.objects.all()[:10]
        return ctx


@method_decorator(staff_member_required, name='dispatch')
class UserListView(RequestContextMixin, ListView):
    template_name = 'control/users.jinja'
    context_object_name = 'users'
    paginate_by = 25

    def get_queryset(self):
        qs = User.objects.all().order_by('-date_joined')
        q = self.request.GET.get('q')
        if q:
            qs = qs.filter(username__icontains=q) | qs.filter(email__icontains=q)
        return qs


@method_decorator(staff_member_required, name='dispatch')
class UserDetailView(RequestContextMixin, DetailView):
    template_name = 'control/user_detail.jinja'
    model = User
    context_object_name = 'target_user'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['orders'] = Order.objects.filter(user=self.object)[:10]
        return ctx


@method_decorator(staff_member_required, name='dispatch')
class ProductListView(RequestContextMixin, ListView):
    template_name = 'control/products.jinja'
    context_object_name = 'products'
    paginate_by = 25

    def get_queryset(self):
        return Product.objects.select_related('category').all()


@method_decorator(staff_member_required, name='dispatch')
class ProductAddView(RequestContextMixin, TemplateView):
    template_name = 'control/product_add.jinja'


@method_decorator(staff_member_required, name='dispatch')
class ProductEditView(RequestContextMixin, DetailView):
    template_name = 'control/product_edit.jinja'
    model = Product
    context_object_name = 'product'


@method_decorator(staff_member_required, name='dispatch')
class OrderListView(RequestContextMixin, ListView):
    template_name = 'control/orders.jinja'
    context_object_name = 'orders'
    paginate_by = 25

    def get_queryset(self):
        return Order.objects.select_related('user').all()


@method_decorator(staff_member_required, name='dispatch')
class OrderDetailView(RequestContextMixin, DetailView):
    template_name = 'control/order_detail.jinja'
    model = Order
    context_object_name = 'order'


@method_decorator(staff_member_required, name='dispatch')
class AnalyticsView(RequestContextMixin, TemplateView):
    template_name = 'control/analytics.jinja'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['top_products'] = Product.objects.annotate(
            order_count=Count('orderitem')
        ).order_by('-order_count')[:10]
        return ctx
