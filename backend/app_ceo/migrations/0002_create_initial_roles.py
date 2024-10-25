from django.db import migrations

def create_initial_roles(apps, schema_editor):
    Role = apps.get_model('app_ceo', 'Role')
    roles = ['student', 'tutor', 'admin']
    for role_name in roles:
        Role.objects.create(name=role_name)

class Migration(migrations.Migration):

    dependencies = [
        ('app_ceo', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_initial_roles),
    ]
