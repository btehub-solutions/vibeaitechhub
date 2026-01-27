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


class Module(models.Model):
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.program.title} - {self.title}"

class Lesson(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=255)
    content = models.TextField(help_text="Markdown content for the lesson", blank=True)
    video_url = models.URLField(blank=True, null=True)
    duration = models.DurationField(help_text="Duration of the lesson (e.g. 00:15:00)", null=True, blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class LessonProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='lesson_progress')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='progress')
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        unique_together = ('user', 'lesson')

    def __str__(self):
        return f"{self.user.username} - {self.lesson.title} ({'Completed' if self.is_completed else 'In Progress'})"
