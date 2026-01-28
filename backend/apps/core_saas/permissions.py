from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners/admins to edit objects.
    Learners (authenticated users) can view (GET, HEAD, OPTIONS).
    """

    def has_permission(self, request, view):
        # Allow read-only methods for any authenticated user
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated
        
        # Write permissions are only allowed to admin/staff users
        return request.user and (request.user.is_staff or request.user.is_superuser)
