from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['product_name', 'price', 'quantity']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_number', 'full_name', 'status', 'total', 'is_paid', 'created_at']
    list_editable = ['status', 'is_paid']
    list_filter = ['status', 'is_paid', 'payment_method']
    search_fields = ['order_number', 'full_name', 'phone']
    inlines = [OrderItemInline]
    readonly_fields = ['order_number', 'created_at']
