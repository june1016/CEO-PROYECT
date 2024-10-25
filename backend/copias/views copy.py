# from django.contrib.auth.tokens import PasswordResetTokenGenerator
# from django.core.mail import send_mail
# from django.utils.encoding import smart_bytes, smart_str
# from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from rest_framework import generics, permissions, status, serializers
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.exceptions import PermissionDenied
# from django.shortcuts import get_object_or_404
# from .models import User, Group, FinancialData, RawMaterialInventory
# from .serializers import (
#     RegisterSerializer, 
#     UserSerializer, 
#     GroupSerializer,
#     FinancialDataSerializer, 
#     RawMaterialInventorySerializer,
#     SetNewPasswordSerializer,
# )
# # Authentication Views
# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = (permissions.AllowAny,)
#     serializer_class = RegisterSerializer

# class UserListView(generics.ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [permissions.IsAdminUser]

# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         email = attrs.get('email')
#         password = attrs.get('password')
#         user = User.objects.filter(email=email).first()
#         if not user or not user.check_password(password):
#             raise serializers.ValidationError('Invalid login credentials')
#         return super().validate(attrs)

# class CustomTokenObtainPairView(TokenObtainPairView):
#     serializer_class = CustomTokenObtainPairSerializer

# class UserDetailView(generics.RetrieveAPIView):
#     serializer_class = UserSerializer
#     permission_classes = [IsAuthenticated]
#     def get_object(self):
#         return self.request.user

# class RequestPasswordResetEmail(APIView):
#     permission_classes = [AllowAny]
#     def post(self, request):
#         email = request.data.get('email', '')
#         user = User.objects.filter(email=email).first()
#         if user:
#             uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
#             token = PasswordResetTokenGenerator().make_token(user)
#             send_mail(
#                 subject="Password Reset Request",
#                 message=f"Reset link: /auth/password-reset/{uidb64}/{token}/",
#                 from_email="support@example.com",
#                 recipient_list=[email],
#                 fail_silently=False,
#             )
#         return Response({'message': 'If an account with this email exists, a reset link has been sent.'}, status=status.HTTP_200_OK)

# class PasswordTokenCheckAPI(APIView):
#     permission_classes = [AllowAny]
#     def get(self, request, uidb64, token):
#         try:
#             user_id = smart_str(urlsafe_base64_decode(uidb64))
#             user = User.objects.get(id=user_id)
#             if not PasswordResetTokenGenerator().check_token(user, token):
#                 return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
#             return Response({'success': True, 'message': 'Valid credentials'}, status=status.HTTP_200_OK)
#         except (ValueError, User.DoesNotExist):
#             return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

# class SetNewPasswordAPIView(APIView):
#     permission_classes = [AllowAny]
#     def patch(self, request):
#         serializer = SetNewPasswordSerializer(data=request.data)
#         if serializer.is_valid():
#             try:
#                 user_id = smart_str(urlsafe_base64_decode(serializer.validated_data['uidb64']))
#                 user = User.objects.get(id=user_id)
#                 user.set_password(serializer.validated_data['password'])
#                 user.save()
#                 return Response({'success': True, 'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
#             except User.DoesNotExist:
#                 return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # Vista para listar los grupos
# class GroupListView(generics.ListAPIView):
#     serializer_class = GroupSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         if user.role == 'tutor':
#             return Group.objects.filter(tutor=user)
#         elif user.role == 'student':
#             return Group.objects.filter(id=user.group.id) if user.group else Group.objects.none()
#         return Group.objects.none()

# # Vista para listar los datos financieros
# class FinancialDataListView(generics.ListCreateAPIView):
#     serializer_class = FinancialDataSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         if user.role == 'tutor':
#             return FinancialData.objects.filter(group__tutor=user)
#         elif user.role == 'student':
#             return FinancialData.objects.filter(group__students=user)
#         return FinancialData.objects.none()

#     def perform_create(self, serializer):
#         group = get_object_or_404(Group, id=self.request.data.get('group'))
#         if self.request.user.role == 'tutor' and group.tutor == self.request.user:
#             serializer.save(group=group)
#         else:
#             raise PermissionDenied("No tienes permiso para crear datos financieros para este grupo.")

# # Vista para listar el inventario de materia prima
# class RawMaterialInventoryListView(generics.ListCreateAPIView):
#     serializer_class = RawMaterialInventorySerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         financial_data_id = self.request.query_params.get('financial_data_id')
#         user = self.request.user
#         if financial_data_id:
#             financial_data = get_object_or_404(FinancialData, id=financial_data_id)
#             if user.role == 'tutor' and financial_data.group.tutor == user:
#                 return RawMaterialInventory.objects.filter(financial_data_id=financial_data_id)
#             elif user.role == 'student' and user in financial_data.group.students.all():
#                 return RawMaterialInventory.objects.filter(financial_data_id=financial_data_id)
#         return RawMaterialInventory.objects.none()

#     def perform_create(self, serializer):
#         financial_data = get_object_or_404(FinancialData, id=self.request.data.get('financial_data'))
#         if self.request.user.role == 'tutor' and financial_data.group.tutor == self.request.user:
#             serializer.save()
#         else:
#             raise PermissionDenied("No tienes permiso para crear inventario de materia prima para estos datos financieros.")