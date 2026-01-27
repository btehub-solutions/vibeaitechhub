from django.contrib import admin
from .models import AITool, Program, Event, MeetingLink, Enrollment

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'program', 'enrolled_at', 'is_active')
    list_filter = ('is_active', 'program')
    search_fields = ('user__username',)

@admin.register(AITool)
class AIToolAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'is_trending', 'created_at')
    list_filter = ('is_trending', 'category')
    search_fields = ('name', 'description')

class MeetingLinkInline(admin.StackedInline):
    model = MeetingLink
    extra = 0

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'program', 'start_time', 'end_time')
    list_filter = ('start_time', 'program')
    inlines = [MeetingLinkInline]

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'is_published', 'created_at')
    list_filter = ('is_published',)
