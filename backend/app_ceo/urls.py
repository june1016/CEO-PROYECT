from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView,
    RequestPasswordResetEmail,
    PasswordTokenCheckAPI,
    SetNewPasswordAPIView,
    CustomTokenObtainPairView,
    UserDetailView,
    GroupListView,
    InstitutionListView,
    GroupViewSet,
    RegistrationCodeViewSet,
)

# Registro de rutas para los grupos y códigos de registro
router = DefaultRouter()
router.register(r'groups', GroupViewSet, basename='group')
router.register(r'registrationCodes', RegistrationCodeViewSet, basename='registrationcode')

urlpatterns = [
    # Rutas de autenticación
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='auth_login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', UserDetailView.as_view(), name='auth_me'),
    
    # Rutas de gestión de contraseñas
    path('auth/requestPasswordReset/', RequestPasswordResetEmail.as_view(), name='request_reset_password'),
    path('auth/passwordReset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='password_reset_confirm'),
    path('auth/passwordResetComplete/', SetNewPasswordAPIView.as_view(), name='password_reset_complete'),

    # Rutas de grupos e instituciones
    path('institutions/', InstitutionListView.as_view(), name='institution_list'),
    path('', include(router.urls)),
]

# Rutas registradas en el router
urlpatterns += router.urls
