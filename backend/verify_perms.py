import os
import django
from django.conf import settings

# Setup Django standalone
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.dev')
django.setup()

from rest_framework.test import APIRequestFactory, force_authenticate
from apps.core_saas.views import ProgramViewSet
from apps.users.models import User
from apps.core_saas.models import Program

def test_permissions():
    factory = APIRequestFactory()
    view = ProgramViewSet.as_view({'get': 'list', 'post': 'create'})
    
    # Create test users
    admin_user, _ = User.objects.get_or_create(username='admin_test', email='admin@test.com', defaults={'is_staff': True, 'is_superuser': True})
    student_user, _ = User.objects.get_or_create(username='student_test', email='student@test.com', defaults={'is_staff': False, 'is_superuser': False})
    
    # 1. Test Unauthenticated Access (Should allow GET if we changed it to IsAuthenticatedOrReadOnly? 
    # Wait, my Permission says: "if request.method in permissions.SAFE_METHODS: return request.user and request.user.is_authenticated"
    # So unauthenticated users should be DENIED even for GET.
    
    print("--- Test 1: Unauthenticated GET ---")
    req = factory.get('/api/programs/')
    response = view(req)
    if response.status_code == 403 or response.status_code == 401:
        print("PASS: Unauthenticated user denied (Status: {})".format(response.status_code))
    else:
        print("FAIL: Unauthenticated user allowed (Status: {})".format(response.status_code))

    # 2. Test Student GET (Should PASS)
    print("\n--- Test 2: Student GET ---")
    req = factory.get('/api/programs/')
    force_authenticate(req, user=student_user)
    response = view(req)
    if response.status_code == 200:
        print("PASS: Student allowed to read (Status: 200)")
    else:
        print("FAIL: Student denied read (Status: {})".format(response.status_code))

    # 3. Test Student POST (Should FAIL)
    print("\n--- Test 3: Student POST (Create) ---")
    data = {'title': 'Hacked Program', 'description': 'Should not exist', 'price': 100}
    req = factory.post('/api/programs/', data)
    force_authenticate(req, user=student_user)
    response = view(req)
    if response.status_code == 403:
        print("PASS: Student denied create (Status: 403)")
    else:
        print("FAIL: Student allowed create (Status: {})".format(response.status_code))

    # 4. Test Admin POST (Should PASS)
    print("\n--- Test 4: Admin POST (Create) ---")
    data = {'title': 'Admin Program', 'description': 'Official Content', 'price': 0}
    req = factory.post('/api/programs/', data)
    force_authenticate(req, user=admin_user)
    response = view(req)
    if response.status_code == 201:
        print("PASS: Admin allowed create (Status: 201)")
    else:
        print("FAIL: Admin denied create (Status: {})".format(response.status_code))
        print(response.data)

if __name__ == "__main__":
    try:
        test_permissions()
    except Exception as e:
        print(f"An error occurred: {e}")
