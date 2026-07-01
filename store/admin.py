from django.contrib import admin
from .models import Category, Product, ProductImage, Review


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 3
    fields = ['image', 'alt_text', 'sort_order']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'is_active', 'sort_order']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['is_active', 'sort_order']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'stock', 'is_active', 'is_featured', 'is_bestseller']
    list_editable = ['is_active', 'is_featured', 'is_bestseller', 'stock']
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ['category', 'is_active', 'is_featured']
    search_fields = ['name', 'sku']
    inlines = [ProductImageInline]


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['product', 'user', 'rating', 'is_approved', 'created_at']
    list_editable = ['is_approved']
