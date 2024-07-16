from django.urls import path
from . import views

urlpatterns = [
    # Añade tus rutas aquí
    path('', views.index, name='index'),  # Ejemplo de ruta
]
