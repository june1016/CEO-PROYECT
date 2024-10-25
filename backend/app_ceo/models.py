from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError

# Fase 1(Autenticación y Gestión de Usuarios)

# Gestor de usuarios personalizado
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        email = self.normalize_email(email)
        # Asignar rol predeterminado si no se proporciona
        if not extra_fields.get('role'):
            default_role = Role.objects.get_or_create(name='student')[0]
            extra_fields['role'] = default_role
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        admin_role = Role.objects.get_or_create(name='admin')[0]
        extra_fields['role'] = admin_role
        return self.create_user(email, password, **extra_fields)


# Modelo de Institución
class Institution(models.Model):
    name = models.CharField(max_length=255, unique=True)
    address = models.CharField(max_length=255, blank=True)
    contact_info = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# Modelo de Rol
class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

# Modelo de Usuario Personalizado
class User(AbstractUser):
    username = None  # Eliminamos el campo username
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    institution = models.ForeignKey(Institution, on_delete=models.SET_NULL, null=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
    group = models.ForeignKey('Group', on_delete=models.SET_NULL, null=True, blank=True, related_name='students')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']  # Eliminamos 'role' de aquí

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.email} ({self.role})"
    
    class Meta:
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['institution', 'role']),
        ]
        constraints = [
            models.UniqueConstraint(fields=['email'], name='unique_email'),
        ]
    
# Modelo de Grupo #TODO: NEW
class Group(models.Model):
    name = models.CharField(max_length=100)
    tutor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tutored_groups')
    institution = models.ForeignKey(Institution, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def clean(self):
        # Asegurarse de que el tutor tenga el rol de 'tutor'
        if self.tutor.role.name != 'tutor':
            raise ValidationError('El usuario asignado como tutor debe tener el rol de tutor.')

# Modelo de Códigos de Registro
class RegistrationCode(models.Model):
    code = models.CharField(max_length=50, unique=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, null=True, blank=True)
    is_used = models.BooleanField(default=False)
    expiry_date = models.DateField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.code} ({self.role.name})"

    def is_valid(self):
        return not self.is_used and self.expiry_date >= timezone.now().date()

