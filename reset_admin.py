
import os
import sys
import django
sys.path.append('backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.dev')
django.setup()
from django.contrib.auth import get_user_model
User = get_user_model()
try:
    u, created = User.objects.get_or_create(username='admin', defaults={'email': 'admin@example.com'})
    u.set_password('admin')
    u.is_superuser = True
    u.is_staff = True
    u.save()
    print(f"Superuser admin {'created' if created else 'updated'}")
except Exception as e:
    print(f"Error: {e}")
