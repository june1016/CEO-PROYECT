from django.urls import path
from .views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, RequestPasswordResetEmail, PasswordTokenCheckAPI, SetNewPasswordAPIView, FinancialDataListView, RawMaterialInventoryListView

# Configurar URLs para la Autenticación
urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='auth_login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/request-reset-password/', RequestPasswordResetEmail.as_view(), name='request_reset_password'),
    path('auth/password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='password_reset_confirm'),
    path('auth/password-reset-complete/', SetNewPasswordAPIView.as_view(), name='password_reset_complete'),
    path('financial-data/', FinancialDataListView.as_view(), name='financial_data_list'),
    path('raw-material-inventory/', RawMaterialInventoryListView.as_view(), name='raw_material_inventory_list'),
]


