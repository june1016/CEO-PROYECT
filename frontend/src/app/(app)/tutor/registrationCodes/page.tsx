"use client";
import React, { useEffect, useState } from "react";
import api from "@/services/axiosInstance";
import { RegistrationCode, Group } from "@/types/tutor";
import { useForm, Controller } from "react-hook-form";
import { Select, SelectItem, Button } from "@nextui-org/react";
import toast from "react-hot-toast";

const RegistrationCodesPage: React.FC = () => {
  const [codes, setCodes] = useState<RegistrationCode[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const { control, handleSubmit } = useForm<{ group_id: string }>();

  useEffect(() => {
    fetchCodes();
    fetchGroups();
  }, []);

  const fetchCodes = async () => {
    try {
      const response = await api.get("registrationCodes/");
      setCodes(response.data);
    } catch (error: any) {
      console.error(
        "Error fetching codes:",
        error.response?.data || error.message
      );
      if (error.response?.status === 401) {
        toast.error("Sesión expirada. Por favor, inicia sesión nuevamente.");
        // Redirigir al login si es necesario
        // router.push('/login');
      } else {
        toast.error("Error al cargar los códigos de registro");
      }
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await api.get("groups/");
      setGroups(response.data);
    } catch (error: any) {
      console.error(
        "Error fetching groups:",
        error.response?.data || error.message
      );
      toast.error("Error al cargar los grupos");
    }
  };

  const onSubmit = async (data: { group_id: string }) => {
    try {
      await api.post("registrationCodes/", { group_id: data.group_id });
      toast.success("Código generado exitosamente");
      fetchCodes();
    } catch (error: any) {
      console.error(
        "Error generating code:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.detail || "Error al generar el código");
    }
  };

  return (
    <div>
      <h1>Códigos de Registro</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="group_id"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Selecciona un grupo"
              placeholder="Elige un grupo"
              aria-label="Selección de grupo"
            >
              {groups.map((group) => (
                <SelectItem key={group.id} value={group.id.toString()}>
                  {group.name}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Button type="submit">Generar Código</Button>
      </form>
      <ul>
        {codes.map((code) => (
          <li key={code.id}>
            Código: {code.code} - Grupo: {code.group_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegistrationCodesPage;
