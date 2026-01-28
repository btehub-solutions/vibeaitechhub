from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Program, AITool, Module, Lesson, Event, MeetingLink
from .serializers import DashboardSerializer, ProgramSerializer, AIToolSerializer, ModuleSerializer, LessonSerializer, EventSerializer, MeetingLinkSerializer
from .permissions import IsAdminOrReadOnly

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = DashboardSerializer(instance={'user': request.user})
        return Response(serializer.data)

class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [IsAdminOrReadOnly]

class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [IsAdminOrReadOnly]

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [IsAdminOrReadOnly]

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]

class MeetingLinkViewSet(viewsets.ModelViewSet):
    queryset = MeetingLink.objects.all()
    serializer_class = MeetingLinkSerializer
    permission_classes = [IsAdminOrReadOnly]

class AIToolViewSet(viewsets.ModelViewSet):
    queryset = AITool.objects.all()
    serializer_class = AIToolSerializer
    permission_classes = [IsAdminOrReadOnly]
