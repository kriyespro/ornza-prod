from django.db import models
from django.contrib.auth.models import User


class AdminLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    action = models.CharField(max_length=100)
    target_model = models.CharField(max_length=100, blank=True)
    target_id = models.PositiveIntegerField(null=True, blank=True)
    detail = models.TextField(blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user} - {self.action} at {self.created_at:%Y-%m-%d %H:%M}"
