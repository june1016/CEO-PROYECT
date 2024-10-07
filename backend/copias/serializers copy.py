# from rest_framework import serializers
# from django.contrib.auth.password_validation import validate_password
# from .models import User, FinancialData, RawMaterialInventory

# # Serializador de Usuario
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'email', 'first_name', 'last_name', 'institution', 'group_name', 'role', 'tutor')
#         read_only_fields = ['id', 'role', 'tutor']  # El rol y tutor no deberían ser modificados directamente por el usuario.


# # Serializador para Registro de Usuario
# class RegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
#     password2 = serializers.CharField(write_only=True, required=True)  # Campo adicional para confirmar la contraseña

#     class Meta:
#         model = User
#         fields = ('email', 'password', 'password2', 'first_name', 'last_name', 'institution', 'group_name', 'role', 'tutor')

#     def validate(self, attrs):
#         """Validación personalizada para asegurar que las contraseñas coincidan"""
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError({'password': 'Las contraseñas no coinciden.'})
#         return attrs

#     def create(self, validated_data):
#         """Crear un nuevo usuario"""
#         validated_data.pop('password2')  # Remover el campo password2 ya que no lo necesitamos para crear el usuario
#         return User.objects.create_user(**validated_data)


# # Serializador para Solicitar Reseteo de Contraseña
# class ResetPasswordEmailRequestSerializer(serializers.Serializer):
#     email = serializers.EmailField(min_length=2)

#     class Meta:
#         fields = ['email']

#     # Puedes agregar validaciones adicionales si deseas verificar si el correo existe en la base de datos


# # Serializador para Establecer Nueva Contraseña (después de restablecer)
# class SetNewPasswordSerializer(serializers.Serializer):
#     password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
#     password2 = serializers.CharField(write_only=True, required=True)
#     token = serializers.CharField(min_length=1, write_only=True)
#     uidb64 = serializers.CharField(min_length=1, write_only=True)

#     class Meta:
#         fields = ['password', 'password2', 'token', 'uidb64']

#     def validate(self, attrs):
#         """Validación para asegurar que ambas contraseñas coincidan"""
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError({'password': 'Las contraseñas no coinciden.'})
#         return attrs

#     # Aquí deberías agregar la lógica para validar el token y uidb64 antes de guardar la nueva contraseña


# # Serializador para los Datos Financieros
# class FinancialDataSerializer(serializers.ModelSerializer):
#     tutor = serializers.StringRelatedField(read_only=True)  # Mostrar el nombre del tutor

#     class Meta:
#         model = FinancialData
#         fields = '__all__'

#     def validate(self, data):
#         """Puedes agregar validaciones personalizadas para asegurarte de que los datos financieros sean válidos."""
#         # Ejemplo: Si ciertos valores no deben ser negativos, puedes validarlos aquí.
#         if data['cash_on_hand'] < 0:
#             raise serializers.ValidationError("El dinero en caja no puede ser negativo.")
#         return data


# # Serializador para Inventario de Materias Primas
# class RawMaterialInventorySerializer(serializers.ModelSerializer):
#     financial_data = serializers.PrimaryKeyRelatedField(queryset=FinancialData.objects.all())  # Vinculación a los datos financieros

#     class Meta:
#         model = RawMaterialInventory
#         fields = '__all__'

#     def validate(self, data):
#         """Validación para asegurar la integridad entre datos financieros e inventario"""
#         if data['quantity'] <= 0:
#             raise serializers.ValidationError("La cantidad de materia prima debe ser mayor que cero.")
#         return data
