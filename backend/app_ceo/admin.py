from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, FinancialData, RawMaterialInventory

# Configuración personalizada para la administración de usuarios
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'first_name', 'last_name', 'institution', 'role', 'is_active')
    list_filter = ('role', 'is_active')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Información personal', {'fields': ('first_name', 'last_name', 'institution', 'group_name')}),
        ('Permisos', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Fechas importantes', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'last_name', 'institution', 'group_name', 'role', 'is_active')}
        ),
    )

# Registro del modelo User con la configuración personalizada
admin.site.register(User, CustomUserAdmin)

# Configuración de la interfaz de administración para FinancialData
@admin.register(FinancialData)
class FinancialDataAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'cash', 'banks', 'created_at')
    search_fields = ('company_name',)
    list_filter = ('created_at', 'updated_at')
    ordering = ('-created_at',)

# Configuración de la interfaz de administración para RawMaterialInventory
@admin.register(RawMaterialInventory)
class RawMaterialInventoryAdmin(admin.ModelAdmin):
    list_display = ('material_code', 'description', 'quantity', 'total_cost', 'financial_data')
    search_fields = ('material_code', 'description')
    list_filter = ('created_at', 'updated_at')
    ordering = ('-created_at',)

# TODO: Considerar agregar opciones adicionales en el administrador para 
# gestionar permisos o acciones personalizadas para los modelos.