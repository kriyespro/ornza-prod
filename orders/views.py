from django.views.generic import ListView, DetailView, TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Order


class OrderListView(LoginRequiredMixin, ListView):
    template_name = 'orders/list.jinja'
    context_object_name = 'orders'

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class OrderDetailView(DetailView):
    template_name = 'orders/detail.jinja'
    context_object_name = 'order'

    def get_queryset(self):
        return Order.objects.all()

    def get_object(self):
        return Order.objects.get(order_number=self.kwargs['order_number'])


class TrackOrderView(TemplateView):
    template_name = 'orders/track.jinja'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        order_number = self.kwargs.get('order_number')
        try:
            ctx['order'] = Order.objects.get(order_number=order_number)
        except Order.DoesNotExist:
            ctx['order'] = None
        return ctx
