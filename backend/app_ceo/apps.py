from django.apps import AppConfig

class AppCeoConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app_ceo'

    def ready(self):
        pass  # Elimina la importación de signals por ahora
