from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.core.validators import EmailValidator

# Gestor de usuarios personalizado
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser debe tener is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

# Modelo de usuario personalizado
class User(AbstractUser):
    
    email = models.EmailField(
        unique=True,
        validators=[EmailValidator(message="Por favor, introduce una dirección de correo válida.")],
        error_messages={"unique": "Ya existe un usuario con este correo electrónico."},
    )
    username = None
    institution = models.CharField(max_length=255, blank=True)
    group_name = models.CharField(max_length=255, blank=True)
    ROLE_CHOICES = (
        ('student', 'Estudiante'),
        ('tutor', 'Tutor'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    # TODO: Considerar añadir señales de usuario para crear perfiles automáticamente al registrarse

# Modelo para datos financieros
class FinancialData(models.Model):
    company_name = models.CharField(max_length=255)
    cash = models.DecimalField(max_digits=15, decimal_places=2)
    banks = models.DecimalField(max_digits=15, decimal_places=2)
    computer_equipment = models.DecimalField(max_digits=15, decimal_places=2)
    furniture_fixtures = models.DecimalField(max_digits=15, decimal_places=2)
    machinery_equipment = models.JSONField()
    patents = models.DecimalField(max_digits=15, decimal_places=2)
    accounts_payable = models.DecimalField(max_digits=15, decimal_places=2)
    notes_payable = models.DecimalField(max_digits=15, decimal_places=2)
    long_term_debt = models.DecimalField(max_digits=15, decimal_places=2)
    capital = models.DecimalField(max_digits=15, decimal_places=2)
    other_financial_data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Datos financieros de {self.company_name}"

    class Meta:
        verbose_name = "Dato Financiero"
        verbose_name_plural = "Datos Financieros"
        ordering = ['-created_at']

# Modelo para inventario de materias primas
class RawMaterialInventory(models.Model):
    financial_data = models.ForeignKey(FinancialData, on_delete=models.CASCADE, related_name='raw_materials')
    material_code = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    quantity = models.DecimalField(max_digits=15, decimal_places=2)
    unit = models.CharField(max_length=50)
    cost_per_unit = models.DecimalField(max_digits=15, decimal_places=2)
    total_cost = models.DecimalField(max_digits=15, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.material_code} - {self.description}"

    class Meta:
        verbose_name = "Inventario de Materia Prima"
        verbose_name_plural = "Inventarios de Materias Primas"
        ordering = ['-created_at']