from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DashboardView, ProgramViewSet, AIToolViewSet, ModuleViewSet, LessonViewSet, EventViewSet, MeetingLinkViewSet

router = DefaultRouter()
router.register(r'programs', ProgramViewSet)
router.register(r'modules', ModuleViewSet)
router.register(r'lessons', LessonViewSet)
router.register(r'events', EventViewSet)
router.register(r'links', MeetingLinkViewSet)
router.register(r'tools', AIToolViewSet)

urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('', include(router.urls)),
]
