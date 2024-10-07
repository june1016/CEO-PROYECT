from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, Group, FinancialData, RawMaterialInventory

# Serializador de Usuario
class UserSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group.name', read_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'institution', 'role', 'group', 'group_name')
        read_only_fields = ['id']

# Serializador para Registro de Usuario
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'password2', 'first_name', 'last_name', 'institution', 'role')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user
    
# Serializador para el modelo Group
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name', 'tutor')

# Serializador para el modelo FinancialData
class FinancialDataSerializer(serializers.ModelSerializer):
    group = serializers.StringRelatedField(read_only=True)
    total_assets = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)
    total_liabilities = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)
    total_equity = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)

    class Meta:
        model = FinancialData
        fields = '__all__'

    def validate(self, data):
        if data.get('cash_on_hand', 0) < 0: 
            raise serializers.ValidationError("El dinero en caja no puede ser negativo.")
        return data

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['total_assets'] = instance.total_assets()
        representation['total_liabilities'] = instance.total_liabilities()
        representation['total_equity'] = instance.total_equity()
        return representation

# Serializador para el modelo RawMaterialInventory
class RawMaterialInventorySerializer(serializers.ModelSerializer):
    financial_data = serializers.PrimaryKeyRelatedField(queryset=FinancialData.objects.all())

    class Meta:
        model = RawMaterialInventory
        fields = '__all__'

    def validate(self, data):
        if data['quantity'] <= 0:
            raise serializers.ValidationError("La cantidad de materia prima debe ser mayor que cero.")
        return data

# Serializador para Solicitud de Restablecimiento de Contraseña por Email
class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    class Meta:
        fields = ['email']

# Serializador para Establecer Nueva Contraseña (después de restablecer)
class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'password2', 'token', 'uidb64']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'Las contraseñas no coinciden.'})
        return attrs