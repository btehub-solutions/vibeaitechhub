from .base import *
import dj_database_url
import os

DEBUG = False
ALLOWED_HOSTS = ['.vercel.app', 'vibeaihub.vercel.app', 'localhost', '127.0.0.1']

# Database
# Use DATABASE_URL from environment or fallback to sqlite (for build process only)
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL', f'sqlite:///{BASE_DIR / "db.sqlite3"}'),
        conn_max_age=600
    )
}

# Static Files - Whitenoise
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
