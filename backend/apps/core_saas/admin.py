from django.contrib import admin
from .models import AITool, Program, Event, MeetingLink, Enrollment, Module, Lesson, LessonProgress

@admin.register(AITool)
class AIToolAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'is_trending', 'created_at')
    list_filter = ('category', 'is_trending')
    search_fields = ('name', 'description')

class LessonInline(admin.StackedInline):
    model = Lesson
    extra = 1

@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('title', 'program', 'order')
    list_filter = ('program',)
    inlines = [LessonInline]

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'is_published', 'created_at')
    list_filter = ('is_published',)
    search_fields = ('title',)

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'program', 'enrolled_at', 'is_active')
    list_filter = ('is_active', 'program')

@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'lesson', 'is_completed', 'completed_at')
    list_filter = ('is_completed',)
