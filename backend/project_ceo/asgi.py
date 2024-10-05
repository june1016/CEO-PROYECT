import os
from django.core.asgi import get_asgi_application

# Establecer la configuración predeterminada del entorno para el proyecto
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project_ceo.settings')

# Obtener la aplicación ASGI para el servidor
application = get_asgi_application()

# TODO: Consider adding support for WebSocket or other async features if needed in the future
