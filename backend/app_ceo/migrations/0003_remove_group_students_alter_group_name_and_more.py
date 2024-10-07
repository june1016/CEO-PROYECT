# Generated by Django 4.2.10 on 2024-10-07 03:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_ceo', '0002_user_group_alter_group_students'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='group',
            name='students',
        ),
        migrations.AlterField(
            model_name='group',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='group',
            name='tutor',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tutored_groups', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='user',
            name='group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='students', to='app_ceo.group'),
        ),
        migrations.AlterField(
            model_name='user',
            name='institution',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('student', 'Estudiante'), ('tutor', 'Tutor'), ('admin', 'Administrador')], default='student', max_length=10),
        ),
    ]