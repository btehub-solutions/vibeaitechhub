from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from apps.core_saas.models import Program, Module

User = get_user_model()

class PermissionTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = User.objects.create_superuser('admin', 'admin@example.com', 'password123')
        self.student = User.objects.create_user('student', 'student@example.com', 'password123')
        self.program = Program.objects.create(title="Test Program", description="Test Desc", price=100)

    def test_unauthenticated_access(self):
        response = self.client.get('/api/programs/')
        # Should be 403 or 401 because IsAdminOrReadOnly requires "request.user.is_authenticated" for SAFE methods too
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_student_read_access(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.get('/api/programs/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_student_write_denied(self):
        self.client.force_authenticate(user=self.student)
        data = {'title': 'Hacked', 'description': 'Desc', 'price': 0}
        response = self.client.post('/api/programs/', data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_write_allowed(self):
        self.client.force_authenticate(user=self.admin)
        data = {'title': 'Admin Program', 'description': 'Desc', 'price': 0}
        response = self.client.post('/api/programs/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_module_linked_to_program(self):
        self.client.force_authenticate(user=self.admin)
        data = {
            'program': self.program.id,
            'title': 'Module 1',
            'description': 'Intro',
            'order': 1
        }
        response = self.client.post('/api/modules/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Module.objects.count(), 1)
        self.assertEqual(Module.objects.first().program, self.program)
