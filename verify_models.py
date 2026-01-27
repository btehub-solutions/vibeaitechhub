
import os
import sys
import django
from django.conf import settings

# Setup Django
sys.path.append('backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.dev')
django.setup()

from apps.core_saas.models import Module, Lesson, Program

# Verify Models
print("Verifying Module and Lesson models...")
try:
    # Check if we can query (even if empty)
    count = Lesson.objects.count()
    print(f"Lesson count: {count}")
    
    module_count = Module.objects.count()
    print(f"Module count: {module_count}")
    
    print("SUCCESS: Content models are accessible.")
except Exception as e:
    print(f"FAILED: {e}")
