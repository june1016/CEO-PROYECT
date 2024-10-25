from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Group, Institution, Role, RegistrationCode

# Fase 1: Autenticación y Gestión de Usuarios

# Registro del modelo Role
@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

# Registro del modelo Institution
@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'address', 'contact_info')

# Administración personalizada para el modelo User
@admin.register(User)
class UserAdmin(BaseUserAdmin):
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
    list_display = ('name', 'tutor', 'institution', 'student_count')
    search_fields = ('name', 'tutor__email')
    list_filter = ('institution',)

    def student_count(self, obj):
        return obj.students.count()
    student_count.short_description = 'Número de estudiantes'

# Registro del modelo RegistrationCode
@admin.register(RegistrationCode)
class RegistrationCodeAdmin(admin.ModelAdmin):
    list_display = ('code', 'role', 'group', 'is_used', 'expiry_date')
    list_filter = ('role', 'is_used', 'expiry_date')
    search_fields = ('code',)

