from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DashboardView, ProgramViewSet, AIToolViewSet

router = DefaultRouter()
router.register(r'programs', ProgramViewSet)
router.register(r'tools', AIToolViewSet)

urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('', include(router.urls)),
]
