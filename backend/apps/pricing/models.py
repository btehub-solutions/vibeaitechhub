from django.db import models
from django.conf import settings

class PricingPlan(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=3, default="NGN")
    duration_days = models.PositiveIntegerField(help_text="Duration in days (e.g., 30 for monthly)")
    description = models.TextField(blank=True)
    features = models.JSONField(default=list, help_text="List of features")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.price} {self.currency}"

class Subscription(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='subscriptions')
    plan = models.ForeignKey(PricingPlan, on_delete=models.SET_NULL, null=True)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    payment_reference = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.plan.name}"
