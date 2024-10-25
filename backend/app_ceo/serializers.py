from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, Group, Institution, Role, RegistrationCode
from django.utils.http import urlsafe_base64_decode 
from django.utils.encoding import smart_str
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import DjangoUnicodeDecodeError
from rest_framework.exceptions import ValidationError
import secrets
import datetime
from django.shortcuts import get_object_or_404

# Fase 1(Autenticación y Gestión de Usuarios)

# Serializador para el modelo Institution
class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ('id', 'name', 'address', 'contact_info')

# Serializador para el modelo Role
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'name')

# Serializador de Usuario
class UserSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group.name', read_only=True)
    role_name = serializers.CharField(source='role.name', read_only=True)
    institution_name = serializers.CharField(source='institution.name', read_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'institution', 'institution_name', 'role', 'role_name', 'group', 'group_name')
        read_only_fields = ['id']

# Serializador para Registro de Usuario
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    registration_code = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'password2', 'first_name', 'last_name', 'registration_code')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        registration_code_str = validated_data.pop('registration_code')
        try:
            registration_code = RegistrationCode.objects.get(code=registration_code_str)
            if not registration_code.is_valid():
                raise serializers.ValidationError({"registration_code": "El código de registro no es válido o ya ha sido utilizado."})
        except RegistrationCode.DoesNotExist:
            raise serializers.ValidationError({"registration_code": "El código de registro no existe."})

        validated_data['role'] = registration_code.role
        validated_data['group'] = registration_code.group
        user = User.objects.create_user(**validated_data)
        registration_code.is_used = True
        registration_code.save()
        return user

# Serializador para el modelo Group
class GroupSerializer(serializers.ModelSerializer):
    tutor_email = serializers.CharField(source='tutor.email', read_only=True)
    institution_name = serializers.CharField(source='institution.name', read_only=True)

    class Meta:
        model = Group
        fields = ('id', 'name', 'tutor', 'tutor_email', 'institution', 'institution_name')

# Serializador para el modelo RegistrationCode
class RegistrationCodeSerializer(serializers.ModelSerializer):
    role_name = serializers.CharField(source='role.name', read_only=True)
    group_name = serializers.CharField(source='group.name', read_only=True)

    class Meta:
        model = RegistrationCode
        fields = ('id', 'code', 'role', 'role_name', 'group', 'group_name', 'is_used', 'expiry_date')


# Serializador para crear grupos #TODO: NEW
class CreateGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name', 'institution')

    def create(self, validated_data):
        tutor = self.context['request'].user
        # Asegurarse de que el tutor tenga el rol correcto
        if tutor.role.name != 'tutor':
            raise ValidationError('Solo los tutores pueden crear grupos.')
        validated_data['tutor'] = tutor
        return super().create(validated_data)
    

# Serializador para generar códigos de registro #TODO: NEW
class CreateRegistrationCodeSerializer(serializers.ModelSerializer):
    group_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = RegistrationCode
        fields = ('id', 'group_id')

    def create(self, validated_data):
        tutor = self.context['request'].user
        group_id = validated_data.pop('group_id')
        group = get_object_or_404(Group, id=group_id, tutor=tutor)
        role = Role.objects.get(name='student')

        registration_code = RegistrationCode.objects.create(
            code=secrets.token_urlsafe(12),
            role=role,
            group=group,
            expiry_date=datetime.date.today() + datetime.timedelta(days=30)
        )

        return registration_code


# Serializador para cambiar la contraseña
class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    uidb64 = serializers.CharField(write_only=True)
    token = serializers.CharField(write_only=True)

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uidb64 = attrs.get('uidb64')
            token = attrs.get('token')

            if password != password2:
                raise serializers.ValidationError({'password': 'Las contraseñas no coinciden.'})

            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError({'token': 'El token no es válido o ha expirado.'})

            user.set_password(password)
            user.save()

            return attrs
        except (DjangoUnicodeDecodeError, User.DoesNotExist):
            raise serializers.ValidationError({'token': 'El token no es válido o ha expirado.'})
