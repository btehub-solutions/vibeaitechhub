from rest_framework import serializers
from .models import Program, Event, MeetingLink, AITool, Enrollment, Module, Lesson, LessonProgress
from datetime import timedelta

class AIToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = AITool
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'content', 'video_url', 'duration', 'order']

class ModuleSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    class Meta:
        model = Module
        fields = ['id', 'title', 'description', 'order', 'lessons']

class ProgramSerializer(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True, read_only=True)
    class Meta:
        model = Program
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    program = ProgramSerializer()
    progress = serializers.SerializerMethodField()
    class Meta:
        model = Enrollment
        fields = ['id', 'program', 'enrolled_at', 'is_active', 'progress']
    
    def get_progress(self, obj):
        # Calculate completion percentage for this program
        total_lessons = Lesson.objects.filter(module__program=obj.program).count()
        if total_lessons == 0:
            return 0
        completed_lessons = LessonProgress.objects.filter(
            user=obj.user, 
            lesson__module__program=obj.program, 
            is_completed=True
        ).count()
        return int((completed_lessons / total_lessons) * 100)

class DashboardSerializer(serializers.Serializer):
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')
    role = serializers.CharField(source='user.role', default='student')
    active_enrollments = EnrollmentSerializer(source='user.enrollments', many=True)
    stats = serializers.SerializerMethodField()

    def get_stats(self, obj):
        user = obj['user']
        total_lessons_complete = LessonProgress.objects.filter(user=user, is_completed=True).count()
        
        # Calculate hours learned (sum of durations)
        completed_progress = LessonProgress.objects.filter(user=user, is_completed=True).select_related('lesson')
        total_time = timedelta()
        for p in completed_progress:
            if p.lesson.duration:
                total_time += p.lesson.duration
        
        hours_learned = int(total_time.total_seconds() / 3600)

        return {
            "lessons_complete": total_lessons_complete,
            "hours_learned": hours_learned,
            "modules_enrolled": user.enrollments.count()
        }
