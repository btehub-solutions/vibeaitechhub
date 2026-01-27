from rest_framework import serializers
from .models import Program, Event, MeetingLink, AITool, Enrollment

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    program = ProgramSerializer()
    class Meta:
        model = Enrollment
        fields = ['id', 'program', 'enrolled_at', 'is_active']

class DashboardSerializer(serializers.Serializer):
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')
    role = serializers.CharField(source='user.role')
    active_enrollments = EnrollmentSerializer(source='user.enrollments', many=True)
    # subscription info would require importing from pricing app, let's keep it simple for now or adding later
