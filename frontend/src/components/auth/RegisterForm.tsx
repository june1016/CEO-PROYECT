import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import api from "@/services/axiosInstance";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const registerSchema = z
  .object({
    email: z.string().email("Correo electrónico inválido"),
    firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
    registrationCode: z.string().min(1, "El código de registro es obligatorio"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await api.post("auth/register/", {
        email: data.email,
        password: data.password,
        password2: data.confirmPassword, // Asegúrate de que este campo se llame 'password2'
        first_name: data.firstName,
        last_name: data.lastName,
        registration_code: data.registrationCode,
      });
      console.log("Respuesta del servidor:", response.data);
      toast.success("Registro exitoso");
      router.push("/login");
    } catch (error: any) {
      console.error("Error completo:", error);
      const errorMsg =
        error.response?.data?.registration_code?.[0] ||
        error.response?.data?.email?.[0] ||
        error.response?.data?.password?.[0] ||
        error.response?.data?.detail ||
        "Error al registrarse";
      toast.error(errorMsg);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader className="flex gap-3">
          <h1 className="text-2xl font-bold">Registrar Cuenta</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Correo electrónico"
                  type="email"
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Nombre"
                  errorMessage={errors.firstName?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Apellido"
                  errorMessage={errors.lastName?.message}
                />
              )}
            />
            <Controller
              name="registrationCode"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Código de Registro"
                  errorMessage={errors.registrationCode?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Contraseña"
                  type="password"
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Confirmar Contraseña"
                  type="password"
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />
            <Button
              type="submit"
              color="primary"
              fullWidth
              isLoading={isSubmitting}
            >
              Registrarse
            </Button>
          </form>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default RegisterForm;
