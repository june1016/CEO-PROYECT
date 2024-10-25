import os
import sys
import django

# Obtener la ruta absoluta al directorio 'backend'
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Agregar 'backend' al sys.path
sys.path.insert(0, backend_dir)

# Establecer DJANGO_SETTINGS_MODULE
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project_ceo.settings')

# Inicializar Django
django.setup()

from app_ceo.models import User, Group, FinancialData, RawMaterialInventory

def populate_data():
    # Crear un grupo si no existe
    group, group_created = Group.objects.get_or_create(
        name='Grupo-A',
        defaults={'tutor': None}
    )
    if group_created:
        print(f"Grupo creado: {group.name}")
    else:
        print(f"Grupo existente: {group.name}")

    # Crear un tutor si no existe
    tutor_email = 'tutor1@empresa.com'
    tutor, tutor_created = User.objects.get_or_create(
        email=tutor_email,
        defaults={
            'first_name': 'Carlos',
            'last_name': 'Gomez',
            'role': 'tutor',
            'is_staff': True,
            'is_superuser': False,
            'is_active': True,
            'institution': 'UNI-COL',
        }
    )
    if tutor_created:
        tutor.set_password('syHxuKTysoWf')
        tutor.save()
        print(f"Tutor creado: {tutor_email}")
    else:
        print(f"Tutor existente: {tutor_email}")

    # Asignar el tutor al grupo
    group.tutor = tutor
    group.save()

    # Crear datos financieros detallados para la empresa
    financial_data, fin_created = FinancialData.objects.get_or_create(
        group=group,
        company_name='Empresa de Bicicletas XYZ',
        defaults={
            # Activos
            'cash_on_hand': 5000.00,
            'cash_in_bank': 20000.00,
            'accounts_receivable': 10000.00,
            'inventory': 15000.00,
            'computer_equipment': 15000.00,
            'furniture_fixtures': 10000.00,
            'machinery_equipment': 80000.00,
            'patents': 25000.00,

            # Pasivos
            'accounts_payable': 8000.00,
            'notes_payable': 5000.00,
            'long_term_debt': 65000.00,

            # Patrimonio
            'capital_stock': 50000.00,
            'retained_earnings': 12000.00,

            # Información adicional
            'projected_sales': 100000.00,
            'operating_costs': 60000.00,
        }
    )
    if fin_created:
        print("Datos financieros creados para la empresa.")
    else:
        print("Datos financieros ya existentes para la empresa.")

    # Crear inventario de materias primas asociado a los datos financieros
    raw_materials = [
        {
            'material_code': 'MAT001',
            'description': 'Acero Inoxidable',
            'quantity': 500.00,
            'unit': 'kg',
            'cost_per_unit': 10.00,
            'total_cost': 5000.00,
        },
        {
            'material_code': 'MAT002',
            'description': 'Aluminio',
            'quantity': 300.00,
            'unit': 'kg',
            'cost_per_unit': 15.00,
            'total_cost': 4500.00,
        },
    ]

    for material in raw_materials:
        obj, created = RawMaterialInventory.objects.get_or_create(
            financial_data=financial_data,
            material_code=material['material_code'],
            defaults={
                'description': material['description'],
                'quantity': material['quantity'],
                'unit': material['unit'],
                'cost_per_unit': material['cost_per_unit'],
                'total_cost': material['total_cost'],
            }
        )
        if created:
            print(f"Materia prima creada: {material['material_code']}")
        else:
            print(f"Materia prima existente: {material['material_code']}")

if __name__ == '__main__':
    populate_data()
