// src/components/auth/LoginForm.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post("auth/login/", data);
      const { access } = response.data;
      Cookies.set("access_token", access, { expires: 1 });
      toast.success("Inicio de sesión exitoso");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Error al iniciar sesión");
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
          <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
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
            <Button
              type="submit"
              color="primary"
              fullWidth
              isLoading={isSubmitting}
            >
              Iniciar Sesión
            </Button>
          </form>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default LoginForm;
