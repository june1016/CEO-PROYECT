from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView, 
    RequestPasswordResetEmail, 
    PasswordTokenCheckAPI, 
    SetNewPasswordAPIView, 
    FinancialDataListView, 
    RawMaterialInventoryListView, 
    CustomTokenObtainPairView
)

urlpatterns = [
    # Rutas de autenticación
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='auth_login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Rutas de gestión de contraseñas
    path('auth/request-reset-password/', RequestPasswordResetEmail.as_view(), name='request_reset_password'),
    path('auth/password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='password_reset_confirm'),
    path('auth/password-reset-complete/', SetNewPasswordAPIView.as_view(), name='password_reset_complete'),

    # Rutas de datos financieros e inventario
    path('financial-data/', FinancialDataListView.as_view(), name='financial_data_list'),
    path('raw-material-inventory/', RawMaterialInventoryListView.as_view(), name='raw_material_inventory_list'),
]

# TODO: Considerar agregar una URL para actualizar los detalles del perfil de usuario en el futuro.
# TODO: Añadir versionado a las rutas de la API (por ejemplo, /api/v1/auth/) para prepararse para futuras actualizaciones.