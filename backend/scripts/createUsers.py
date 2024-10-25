import os
import django

# Configurar el entorno de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project_ceo.settings')
django.setup()

from app_ceo.models import User as OriginalUser
from django.contrib.auth import get_user_model


# Crear el superusuario
def create_superuser():
    User = get_user_model()
    # Use the original User model somewhere
    print(OriginalUser.__name__)
    if not User.objects.filter(email='simuladorceo@gmail.com').exists():
        User.objects.create_superuser(
            email='simuladorceo@gmail.com',
            password='JxCdAMOCogTh',
            first_name='Admin',
            last_name='SuperUser',
        )
        print("Superusuario creado: simuladorceo@gmail.com")
# Crear el tutor de ejemplo
def create_tutor():
    User = get_user_model()
    if not User.objects.filter(email='tutor1@empresa.com').exists():
        tutor = User.objects.create_user(
            email='tutor1@empresa.com',
            password='syHxuKTysoWf',
            first_name='Carlos',
            last_name='Gomez',
            role='tutor',  # Rol del tutor
        )
        print("Tutor creado: tutor1@empresa.com")

# Crear el estudiante de ejemplo
def create_student():
    User = get_user_model()
    tutor = User.objects.filter(email='tutor1@empresa.com').first()
    if not User.objects.filter(email='student1@empresa.com').exists():
        User.objects.create_user(
            email='student1@empresa.com',
            password='rv8PeSMQh45BNGF',
            first_name='Ana',
            last_name='Perez',
            role='student',  # Rol del estudiante
            tutor=tutor,  # Asignar el tutor al estudiante
        )
        print("Estudiante creado: student1@empresa.com")

# Ejecutar las funciones
if __name__ == "__main__":
    create_superuser()
    create_tutor()
    create_student()
    print("Usuarios creados exitosamente.")
