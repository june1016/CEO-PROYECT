import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import api from "@/services/axiosInstance";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const requestResetSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
});

type RequestResetFormData = z.infer<typeof requestResetSchema>;

const RequestPasswordResetForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestResetFormData>({
    resolver: zodResolver(requestResetSchema),
  });

  const onSubmit = async (data: RequestResetFormData) => {
    try {
      await api.post("auth/requestPasswordReset/", data);
      toast.success(
        "Si existe una cuenta con este correo, se ha enviado un enlace para restablecer la contraseña."
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail ||
          "Error al solicitar el restablecimiento de contraseña"
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
          <h1 className="text-2xl font-bold">
            Solicitar Restablecimiento de Contraseña
          </h1>
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
            <Button
              type="submit"
              color="primary"
              fullWidth
              isLoading={isSubmitting}
            >
              Enviar Enlace
            </Button>
          </form>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default RequestPasswordResetForm;
