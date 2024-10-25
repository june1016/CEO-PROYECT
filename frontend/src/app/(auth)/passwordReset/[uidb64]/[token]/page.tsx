"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter, useParams } from "next/navigation";
import api from "@/services/axiosInstance";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const { uidb64, token } = useParams<{ uidb64: string; token: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await api.patch("auth/passwordResetComplete/", {
        password: data.password,
        password2: data.confirmPassword,
        uidb64,
        token,
      });
      toast.success("Contraseña restablecida correctamente");
      router.push("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail || "Error al restablecer la contraseña"
      );
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
          <h1 className="text-2xl font-bold">Restablecer Contraseña</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Nueva Contraseña"
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
              Restablecer Contraseña
            </Button>
          </form>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default ResetPasswordPage;
