# from django.contrib.auth.models import AbstractUser, BaseUserManager
# from django.db import models
# from django.core.validators import EmailValidator
# # from django.contrib.auth.models import Group

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
#         extra_fields.setdefault('role', 'admin')
#         return self.create_user(email, password, **extra_fields)

# class Group(models.Model):
#     name = models.CharField(max_length=255, unique=True)
#     tutor = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, related_name='tutored_groups')

#     def __str__(self):
#         return self.name

# class User(AbstractUser):
#     username = None
#     email = models.EmailField(unique=True)
#     first_name = models.CharField(max_length=30)
#     last_name = models.CharField(max_length=30)
#     institution = models.CharField(max_length=100)
#     ROLE_CHOICES = [
#         ('student', 'Estudiante'),
#         ('tutor', 'Tutor'),
#         ('admin', 'Administrador'),
#     ]
#     role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')
#     group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True, related_name='students')

#     objects = CustomUserManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['first_name', 'last_name', 'institution']

#     def __str__(self):
#         return self.email

# # Modelo de datos financieros
# class FinancialData(models.Model):
#     group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='financial_data')
#     company_name = models.CharField(max_length=255)
#     cash_on_hand = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     cash_in_bank = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     accounts_receivable = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     inventory = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     computer_equipment = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     furniture_fixtures = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     machinery_equipment = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     patents = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     accounts_payable = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     notes_payable = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     long_term_debt = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     capital_stock = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     retained_earnings = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     projected_sales = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     operating_costs = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def total_assets(self):
#         return sum([
#             self.cash_on_hand, self.cash_in_bank, self.accounts_receivable,
#             self.inventory, self.computer_equipment, self.furniture_fixtures,
#             self.machinery_equipment, self.patents
#         ])

#     def total_liabilities(self):
#         return sum([self.accounts_payable, self.notes_payable, self.long_term_debt])

#     def total_equity(self):
#         """Calcula el patrimonio total"""
#         return self.capital_stock + self.retained_earnings

#     def __str__(self):
#         return f"Datos financieros de {self.company_name} - Grupo {self.group.name}"

#     class Meta:
#         verbose_name = "Dato Financiero"
#         verbose_name_plural = "Datos Financieros"
#         ordering = ['-created_at']

# # Modelo de inventario de materia prima
# class RawMaterialInventory(models.Model):
#     financial_data = models.ForeignKey(FinancialData, on_delete=models.CASCADE, related_name='raw_materials')
#     material_code = models.CharField(max_length=50)
#     description = models.CharField(max_length=255)
#     quantity = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     unit = models.CharField(max_length=50)
#     cost_per_unit = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     total_cost = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def save(self, *args, **kwargs):
#         self.total_cost = self.quantity * self.cost_per_unit
#         super().save(*args, **kwargs)

#     def __str__(self):
#         return f"{self.material_code} - {self.description}"

#     class Meta:
#         verbose_name = "Inventario de Materia Prima"
#         verbose_name_plural = "Inventario de Materia Prima"
#         ordering = ['-created_at']