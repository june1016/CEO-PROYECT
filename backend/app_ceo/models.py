from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.postgres.fields import JSONField


class User(AbstractUser):
    institution = models.CharField(max_length=255, blank=True)
    group_name = models.CharField(max_length=255, blank=True)
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('tutor', 'Tutor'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')

class FinancialData(models.Model):
    company_name = models.CharField(max_length=255)
    cash = models.DecimalField(max_digits=15, decimal_places=2)
    banks = models.DecimalField(max_digits=15, decimal_places=2)
    computer_equipment = models.DecimalField(max_digits=15, decimal_places=2)
    furniture_fixtures = models.DecimalField(max_digits=15, decimal_places=2)
    machinery_equipment = models.JSONField()  # Cambiado aquí
    patents = models.DecimalField(max_digits=15, decimal_places=2)
    accounts_payable = models.DecimalField(max_digits=15, decimal_places=2)
    notes_payable = models.DecimalField(max_digits=15, decimal_places=2)
    long_term_debt = models.DecimalField(max_digits=15, decimal_places=2)
    capital = models.DecimalField(max_digits=15, decimal_places=2)
    other_financial_data = models.JSONField()  # Cambiado aquí
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class RawMaterialInventory(models.Model):
    financial_data = models.ForeignKey(FinancialData, on_delete=models.CASCADE)
    material_code = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    quantity = models.DecimalField(max_digits=15, decimal_places=2)
    unit = models.CharField(max_length=50)
    cost_per_unit = models.DecimalField(max_digits=15, decimal_places=2)
    total_cost = models.DecimalField(max_digits=15, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)