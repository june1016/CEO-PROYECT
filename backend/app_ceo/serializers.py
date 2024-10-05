from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, FinancialData, RawMaterialInventory

# Serializadores de Usuario
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'institution', 'group_name', 'role')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'password2', 'first_name', 'last_name', 'institution', 'group_name', 'role')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'Las contraseñas no coinciden.'})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        return User.objects.create_user(**validated_data)

    # TODO: Considerar agregar lógica de confirmación de email durante el registro

# Serializadores de Gestión de Contraseñas
class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    # TODO: Implementar validación para verificar si el email existe en la base de datos

class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    # TODO: Agregar un método para validar el token y uidb64 antes de guardar la nueva contraseña

# Serializadores de Datos Financieros
class FinancialDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialData
        fields = '__all__'

class RawMaterialInventorySerializer(serializers.ModelSerializer):
    financial_data = serializers.PrimaryKeyRelatedField(queryset=FinancialData.objects.all())

    class Meta:
        model = RawMaterialInventory
        fields = '__all__'

    # TODO: Agregar validación para asegurar la integridad de datos entre financial_data e inventario