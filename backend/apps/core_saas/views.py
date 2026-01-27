from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets
from .models import Program, AITool
from .serializers import DashboardSerializer, ProgramSerializer, AIToolSerializer

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = DashboardSerializer(instance={'user': request.user})
        return Response(serializer.data)

class ProgramViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [AllowAny]

class AIToolViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AITool.objects.all()
    serializer_class = AIToolSerializer
    permission_classes = [AllowAny]
