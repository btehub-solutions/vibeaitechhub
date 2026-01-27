from django.db import models
from django.conf import settings

class AITool(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    url = models.URLField()
    category = models.CharField(max_length=100)
    is_trending = models.BooleanField(default=False)
    icon_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Program(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Price in NGN")
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Event(models.Model):
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='events', null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class MeetingLink(models.Model):
    PLATFORM_CHOICES = [
        ('ZOOM', 'Zoom'),
        ('MEET', 'Google Meet'),
        ('TEAMS', 'Microsoft Teams'),
        ('OTHER', 'Other'),
    ]
    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name='meeting_link')
    url = models.URLField()
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES, default='ZOOM')

    def __str__(self):
        return f"{self.platform} link for {self.event.title}"

class Enrollment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='enrollments')
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='enrollments')
    enrolled_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('user', 'program')

    def __str__(self):
        return f"{self.user.username} enrolled in {self.program.title}"
