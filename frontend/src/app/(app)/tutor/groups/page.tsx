// Página para listar y crear grupos #TODO: NEW

"use client";
import React, { useEffect, useState } from "react";
import api from "@/services/axiosInstance";
import { Group } from "@/types/tutor";
import { useForm } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import toast from "react-hot-toast";

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const { register, handleSubmit, reset } = useForm<{ name: string }>();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await api.get("groups/");
      setGroups(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: { name: string }) => {
    try {
      await api.post("groups/", data);
      toast.success("Grupo creado exitosamente");
      reset();
      fetchGroups();
    } catch (error) {
      toast.error("Error al crear el grupo");
    }
  };

  return (
    <div>
      <h1>Mis Grupos</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("name")} placeholder="Nombre del grupo" />
        <Button type="submit">Crear Grupo</Button>
      </form>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsPage;
