from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Group, FinancialData, RawMaterialInventory

# Administración personalizada para el modelo User
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'first_name', 'last_name', 'institution', 'role', 'group', 'is_active')
    list_filter = ('role', 'is_active', 'group')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Información personal', {'fields': ('first_name', 'last_name', 'institution')}),
        ('Roles y grupos', {'fields': ('role', 'group')}),
        ('Permisos', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions')}),
        ('Fechas importantes', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'last_name', 'institution', 'role', 'group', 'is_active')
        }),
    )
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

# Administración personalizada para el modelo Group
@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'tutor', 'student_count')
    search_fields = ('name', 'tutor__email')

    def student_count(self, obj):
        return obj.students.count()
    student_count.short_description = 'Número de estudiantes'

# Administración personalizada para el modelo FinancialData
@admin.register(FinancialData)
class FinancialDataAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'group', 'cash_on_hand', 'cash_in_bank', 'created_at')
    search_fields = ('company_name', 'group__name')
    list_filter = ('created_at', 'updated_at')
    ordering = ['-created_at']

# Administración personalizada para el modelo RawMaterialInventory
@admin.register(RawMaterialInventory)
class RawMaterialInventoryAdmin(admin.ModelAdmin):
    list_display = ('material_code', 'description', 'quantity', 'total_cost', 'financial_data')
    search_fields = ('material_code', 'description')
    list_filter = ('created_at', 'updated_at')
    ordering = ['-created_at']