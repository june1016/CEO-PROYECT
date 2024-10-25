from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.utils.encoding import smart_bytes, smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.conf import settings

from rest_framework import generics, permissions, status, serializers, viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import logging

from .models import User, Group, Institution, Role, RegistrationCode
from .serializers import (
    RegisterSerializer, 
    UserSerializer, 
    GroupSerializer,
    InstitutionSerializer,
    RoleSerializer,
    RegistrationCodeSerializer,
    SetNewPasswordSerializer,
    CreateGroupSerializer,
    CreateRegistrationCodeSerializer
)

# Fase 1(Autenticación y Gestión de Usuarios)

# Vista para Registro de Usuario
logger = logging.getLogger(__name__)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        logger.info(f"Datos recibidos: {request.data}")
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            logger.error(f"Errores de validación: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

# Vista para obtener detalles del usuario autenticado
class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return self.request.user


# Vista para autenticación personalizada #TODO: NEW
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Lógica de validación personalizada
        email = attrs.get('email')
        password = attrs.get('password')
        user = User.objects.filter(email=email).first()
        
        if not user or not user.check_password(password):
            raise serializers.ValidationError('Credenciales de inicio de sesión inválidas')
        if not user.is_active:
            raise serializers.ValidationError('Esta cuenta está inactiva')
        
        # Llamar a la validación original y obtener los datos
        data = super().validate(attrs)

        # Obtener el token de actualización
        refresh = self.get_token(self.user)
        data['access'] = str(refresh.access_token)
        data['refresh'] = str(refresh)

        # Agregar información adicional
        data['role'] = self.user.role.name

        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Agregar información adicional al token
        token['role'] = user.role.name

        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# Vista para listar los grupos
class GroupListView(generics.ListAPIView):
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role.name == 'tutor':
            return Group.objects.filter(tutor=user)
        elif user.role.name == 'student':
            return Group.objects.filter(id=user.group.id) if user.group else Group.objects.none()
        return Group.objects.none()

# Vista para listar las instituciones (opcional)
class InstitutionListView(generics.ListAPIView):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer
    permission_classes = [permissions.IsAuthenticated]

# Esta vista maneja la solicitud inicial de restablecimiento de contraseña.
class RequestPasswordResetEmail(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '')
        if email:
            user = User.objects.filter(email=email).first()
            if user:
                uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
                token = PasswordResetTokenGenerator().make_token(user)
                reset_url = f"{settings.FRONTEND_URL}/passwordReset/{uidb64}/{token}"
                send_mail(
                    subject='Restablecimiento de contraseña',
                    message=f'Utilice el siguiente enlace para restablecer su contraseña: {reset_url}',
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[email],
                    fail_silently=False,
                )
        return Response({'message': 'Si existe una cuenta con este correo, se ha enviado un enlace para restablecer la contraseña.'}, status=status.HTTP_200_OK)

# Verifica la validez del token cuando el usuario hace clic en el enlace.
class PasswordTokenCheckAPI(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token no válido o expirado'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'success': True, 'message': 'Credenciales válidas', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)
        except (DjangoUnicodeDecodeError, User.DoesNotExist):
            return Response({'error': 'Token no válido o expirado'}, status=status.HTTP_401_UNAUTHORIZED)

# Permite al usuario establecer una nueva contraseña. 
class SetNewPasswordAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Contraseña restablecida correctamente'}, status=status.HTTP_200_OK)



# Vista para que los tutores creen grupos #TODO: NEW
class GroupViewSet(viewsets.ModelViewSet):
    serializer_class = CreateGroupSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role.name == 'tutor':
            return Group.objects.filter(tutor=user)
        else:
            return Group.objects.none()

    def perform_create(self, serializer):
        serializer.save()

# Vista para que los tutores generen códigos de registro para sus grupos #TODO: NEW
class RegistrationCodeViewSet(viewsets.ModelViewSet):
    serializer_class = RegistrationCodeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role.name == 'tutor':
            return RegistrationCode.objects.filter(group__tutor=user)
        else:
            return RegistrationCode.objects.none()

    def create(self, request, *args, **kwargs):
        serializer = CreateRegistrationCodeSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
