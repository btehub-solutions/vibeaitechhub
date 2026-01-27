from django.contrib import admin
from .models import PricingPlan, Subscription

@admin.register(PricingPlan)
class PricingPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'currency', 'duration_days', 'is_active')
    list_filter = ('is_active', 'currency')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('user', 'plan', 'start_date', 'end_date', 'is_active')
    list_filter = ('is_active', 'plan')
    search_fields = ('user__username', 'payment_reference')
