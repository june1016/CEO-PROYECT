# from django.contrib.auth.models import AbstractUser, BaseUserManager
# from django.db import models
# from django.core.validators import EmailValidator

# # Gestor de usuarios personalizado
# class CustomUserManager(BaseUserManager):
#     def create_user(self, email, password=None, **extra_fields):
#         if not email:
#             raise ValueError('El email es obligatorio')
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         extra_fields.setdefault('is_active', True)

#         if extra_fields.get('is_staff') is not True:
#             raise ValueError('El superusuario debe tener is_staff=True.')
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError('El superusuario debe tener is_superuser=True.')

#         return self.create_user(email, password, **extra_fields)


# # Modelo de usuario personalizado
# class User(AbstractUser):
#     email = models.EmailField(
#         unique=True,
#         validators=[EmailValidator(message="Por favor, introduce una dirección de correo válida.")],
#         error_messages={"unique": "Ya existe un usuario con este correo electrónico."},
#     )
#     username = None  # Eliminamos el campo username porque usaremos email como identificador único.
#     institution = models.CharField(max_length=255, blank=True)
#     group_name = models.CharField(max_length=255, blank=True)

#     ROLE_CHOICES = (
#         ('student', 'Estudiante'),
#         ('tutor', 'Tutor'),
#     )
#     role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')

#     tutor = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='students')

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['first_name', 'last_name']  # Eliminamos el username de los campos obligatorios

#     objects = CustomUserManager()

#     def __str__(self):
#         return self.email


# # Modelo para datos financieros detallados
# class FinancialData(models.Model):
#     tutor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='financial_data', null=True, blank=True)
#     company_name = models.CharField(max_length=255)

#     # Activos
#     cash_on_hand = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Dinero en caja
#     cash_in_bank = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Dinero en banco
#     accounts_receivable = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Cuentas por cobrar
#     inventory = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Inventario
#     computer_equipment = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Equipos informáticos
#     furniture_fixtures = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Mobiliario
#     machinery_equipment = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Maquinaria y equipos
#     patents = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Patentes

#     # Pasivos
#     accounts_payable = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Cuentas por pagar
#     notes_payable = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Letras por pagar
#     long_term_debt = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Deuda a largo plazo

#     # Patrimonio
#     capital_stock = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Capital social
#     retained_earnings = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Utilidades retenidas

#     # Información adicional
#     projected_sales = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Ventas proyectadas
#     operating_costs = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Costos operativos estimados

#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def total_assets(self):
#         """Calcula el total de activos"""
#         return (self.cash_on_hand + self.cash_in_bank + self.accounts_receivable +
#                 self.inventory + self.computer_equipment + self.furniture_fixtures +
#                 self.machinery_equipment + self.patents)

#     def total_liabilities(self):
#         """Calcula el total de pasivos"""
#         return self.accounts_payable + self.notes_payable + self.long_term_debt

#     def total_equity(self):
#         """Calcula el patrimonio total"""
#         return self.capital_stock + self.retained_earnings

#     def __str__(self):
#         return f"Datos financieros de {self.company_name}"

#     class Meta:
#         verbose_name = "Dato Financiero"
#         verbose_name_plural = "Datos Financieros"
#         ordering = ['-created_at']


# # Modelo para inventario de materias primas
# class RawMaterialInventory(models.Model):
#     financial_data = models.ForeignKey(FinancialData, on_delete=models.CASCADE, related_name='raw_materials')
#     material_code = models.CharField(max_length=50)  # Código del material
#     description = models.CharField(max_length=255)  # Descripción del material
#     quantity = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Cantidad en inventario
#     unit = models.CharField(max_length=50)  # Unidad de medida
#     cost_per_unit = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Costo por unidad
#     total_cost = models.DecimalField(max_digits=15, decimal_places=2, default=0)  # Costo total del material
    
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"{self.material_code} - {self.description}"

#     class Meta:
#         verbose_name = "Inventario de Materia Prima"
#         verbose_name_plural = "Inventarios de Materias Primas"
#         ordering = ['-created_at']
