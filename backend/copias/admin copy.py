# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
# from .models import User, FinancialData, RawMaterialInventory

# # Administración personalizada para el modelo User
# @admin.register(User)
# class CustomUserAdmin(UserAdmin):
#     model = User
#     list_display = ('email', 'first_name', 'last_name', 'institution', 'group_name', 'role', 'tutor', 'is_active')
#     list_filter = ('role', 'is_active')
#     search_fields = ('email', 'first_name', 'last_name')
#     ordering = ['email']

#     fieldsets = (
#         (None, {'fields': ('email', 'password')}),
#         ('Información personal', {
#             'fields': ('first_name', 'last_name', 'institution', 'group_name', 'tutor')
#         }),
#         ('Permisos', {
#             'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
#         }),
#         ('Fechas importantes', {
#             'fields': ('last_login', 'date_joined')
#         }),
#     )

#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('email', 'password1', 'password2', 'first_name', 'last_name', 'institution', 'group_name', 'role', 'tutor', 'is_active')
#         }),
#     )

# # Administración para el modelo FinancialData
# @admin.register(FinancialData)
# class FinancialDataAdmin(admin.ModelAdmin):
#     list_display = (
#         'company_name', 'cash_on_hand', 'cash_in_bank', 'accounts_receivable',
#         'inventory', 'computer_equipment', 'furniture_fixtures', 'machinery_equipment',
#         'patents', 'accounts_payable', 'notes_payable', 'long_term_debt',
#         'capital_stock', 'retained_earnings', 'projected_sales', 'operating_costs',
#         'created_at'
#     )
#     search_fields = ('company_name',)
#     list_filter = ('created_at', 'updated_at')
#     ordering = ['-created_at']

# # Administración para el modelo RawMaterialInventory
# @admin.register(RawMaterialInventory)
# class RawMaterialInventoryAdmin(admin.ModelAdmin):
#     list_display = ('material_code', 'description', 'quantity', 'total_cost', 'financial_data')
#     search_fields = ('material_code', 'description')
#     list_filter = ('created_at', 'updated_at')
#     ordering = ['-created_at']
