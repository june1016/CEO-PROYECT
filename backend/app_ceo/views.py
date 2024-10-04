# Django imports
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.utils.encoding import smart_bytes, smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

# Rest Framework imports
from rest_framework import generics, permissions, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

# Local imports
from .models import User, FinancialData, RawMaterialInventory
from .serializers import (
    RegisterSerializer, 
    UserSerializer, 
    FinancialDataSerializer, 
    RawMaterialInventorySerializer,
    SetNewPasswordSerializer,
)

# Vistas para la Autenticación

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# 2.5. Configurar Restablecimiento de Contraseña

class RequestPasswordResetEmail(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        email = request.data.get('email', '')
        user = User.objects.filter(email=email).first()
        if user:
            # Generar token y enviar correo
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            # Enviar correo (implementa tu lógica de envío de correo aquí)
        return Response({'message': 'Si existe una cuenta con este email, se ha enviado un enlace para restablecer la contraseña.'}, status=status.HTTP_200_OK)

class PasswordTokenCheckAPI(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token inválido'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'success': True, 'message': 'Credenciales válidas', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)
        except DjangoUnicodeDecodeError:
            return Response({'error': 'Token inválido'}, status=status.HTTP_401_UNAUTHORIZED)

class SetNewPasswordAPIView(APIView):
    permission_classes = (AllowAny,)

    def patch(self, request):
        serializer = SetNewPasswordSerializer(data=request.data)
        if serializer.is_valid():
            try:
                id = smart_str(urlsafe_base64_decode(serializer.validated_data['uidb64']))
                user = User.objects.get(id=id)
                user.set_password(serializer.validated_data['password'])
                user.save()
                return Response({'success': True, 'message': 'Contraseña restablecida correctamente'}, status=status.HTTP_200_OK)
            except Exception:
                return Response({'error': 'Algo salió mal'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 3. Desarrollo de la Fase 3: Información de Apertura

class FinancialDataListView(generics.ListAPIView):
    queryset = FinancialData.objects.all()
    serializer_class = FinancialDataSerializer
    permission_classes = [permissions.IsAuthenticated]

class RawMaterialInventoryListView(generics.ListAPIView):
    serializer_class = RawMaterialInventorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        financial_data_id = self.request.query_params.get('financial_data_id')
        return RawMaterialInventory.objects.filter(financial_data_id=financial_data_id)
