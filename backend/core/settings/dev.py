from .base import *
import dj_database_url

DEBUG = True
ALLOWED_HOSTS = ['*']

# Database
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL', f'sqlite:///{BASE_DIR / "db.sqlite3"}'),
        conn_max_age=600
    )
}
