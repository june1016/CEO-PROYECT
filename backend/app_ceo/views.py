# Django imports
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.utils.encoding import smart_bytes, smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

# Rest Framework imports
from rest_framework import generics, permissions, status, serializers
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated

# Local imports
from .models import User, FinancialData, RawMaterialInventory
from .serializers import (
    RegisterSerializer, 
    UserSerializer, 
    FinancialDataSerializer, 
    RawMaterialInventorySerializer,
    SetNewPasswordSerializer,
)

# Authentication Views
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = User.objects.filter(email=email).first()

        if user is None or not user.check_password(password):
            raise serializers.ValidationError('Invalid login credentials')

        return super().validate(attrs)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# Vista para obtener los detalles del usuario autenticado
class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

# Password Reset Views
class RequestPasswordResetEmail(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        email = request.data.get('email', '')
        user = User.objects.filter(email=email).first()
        if user:
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            send_mail(
                subject="Password Reset Request",
                message=f"Reset link: /auth/password-reset/{uidb64}/{token}/",
                from_email="support@example.com",
                recipient_list=[email],
                fail_silently=False,
            )
        return Response({'message': 'If an account with this email exists, a reset link has been sent.'}, status=status.HTTP_200_OK)

class PasswordTokenCheckAPI(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'success': True, 'message': 'Valid credentials', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)
        except (DjangoUnicodeDecodeError, User.DoesNotExist):
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

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
                return Response({'success': True, 'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Desarrollo de la Fase 3: Información de Apertura
class FinancialDataListView(generics.ListAPIView):
    queryset = FinancialData.objects.all()
    serializer_class = FinancialDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # TODO: Implement filtering to show only the data relevant to the user's permissions
        return FinancialData.objects.filter(user=user)

class RawMaterialInventoryListView(generics.ListAPIView):
    serializer_class = RawMaterialInventorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        financial_data_id = self.request.query_params.get('financial_data_id')
        if financial_data_id:
            return RawMaterialInventory.objects.filter(financial_data_id=financial_data_id)
        return RawMaterialInventory.objects.none()