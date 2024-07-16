from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app_ceo/', include('app_ceo.urls')),  # Asegúrate de que app_ceo.urls esté incluido
]
