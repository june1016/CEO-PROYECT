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

from app_ceo.models import User, FinancialData, RawMaterialInventory

def populate_data():
    # Crear un tutor si no existe
    tutor_email = 'tutor1@empresa.com'
    tutor, created = User.objects.get_or_create(
        email=tutor_email,
        defaults={
            'first_name': 'Carlos',
            'last_name': 'Gomez',
            'role': 'tutor',
            'is_staff': True,
            'is_superuser': False,
            'is_active': True,
        }
    )
    if created:
        tutor.set_password('tutorpassword123')
        tutor.save()
        print(f"Tutor creado: {tutor_email}")
    else:
        print(f"Tutor existente: {tutor_email}")

    # Crear datos financieros detallados para la empresa
    financial_data, created = FinancialData.objects.get_or_create(
        tutor=tutor,
        company_name='Empresa de Bicicletas XYZ',
        defaults={
            # Activos
            'cash_on_hand': 5000.00,          # Dinero en caja
            'cash_in_bank': 20000.00,         # Dinero en banco
            'accounts_receivable': 10000.00,  # Cuentas por cobrar
            'inventory': 15000.00,            # Inventario
            'computer_equipment': 15000.00,   # Equipos de cómputo
            'furniture_fixtures': 10000.00,   # Muebles y enseres
            'machinery_equipment': 80000.00,  # Maquinaria y equipo total
            'patents': 25000.00,              # Patentes

            # Pasivos
            'accounts_payable': 8000.00,      # Cuentas por pagar
            'notes_payable': 5000.00,         # Letras por pagar
            'long_term_debt': 65000.00,       # Deuda a largo plazo

            # Patrimonio
            'capital_stock': 50000.00,        # Capital social
            'retained_earnings': 12000.00,    # Utilidades retenidas

            # Información adicional
            'projected_sales': 100000.00,     # Ventas proyectadas
            'operating_costs': 60000.00,      # Costos operativos estimados
        }
    )
    if created:
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
        # Puedes añadir más materiales si lo deseas
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
