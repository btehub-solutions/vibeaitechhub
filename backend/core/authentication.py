
import jwt
import os
from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()

class SupabaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        try:
            prefix, token = auth_header.split(' ')
            if prefix.lower() != 'bearer':
                return None
        except ValueError:
            return None

        try:
            # Decode the token using the Supabase JWT secret
            payload = jwt.decode(
                token,
                os.environ.get('SUPABASE_JWT_SECRET'),
                algorithms=['HS256'],
                audience='authenticated'
            )
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired')
        except jwt.InvalidTokenError:
            # If the token is invalid, we return None to let other auth classes try
            # or simply fail if this is the only one.
            raise AuthenticationFailed('Invalid token')

        user_id = payload.get('sub')
        if not user_id:
            raise AuthenticationFailed('No user ID in token')

        try:
            # Get or create the user based on the Supabase ID (sub)
            # We map the 'sub' to 'username' for simplicity, or we could add a supabase_id field
            # Ideally, checks if email exists.
            email = payload.get('email')
            user, created = User.objects.get_or_create(username=user_id, defaults={'email': email})
            return (user, None)
        except User.DoesNotExist:
             raise AuthenticationFailed('User not found')

    def authenticate_header(self, request):
        return 'Bearer'
