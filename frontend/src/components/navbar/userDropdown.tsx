import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { deleteAuthCookie } from "@/utils/authUtils";
import { DarkModeSwitch } from "./darkmodeswitch";
import { useUser } from "@/hooks/navbar/useUser"; // Hook para obtener el usuario

export const UserDropdown = () => {
  const router = useRouter();
  const { data: user, isLoading, isError } = useUser(); // Obtener los datos del usuario

  const handleLogout = useCallback(() => {
    deleteAuthCookie(); // Eliminar el token de las cookies
    router.replace("/login"); // Redirigir al login
  }, [router]);

  if (isLoading) {
    return <div>Cargando...</div>; // Mostrar un indicador mientras se cargan los datos
  }

  if (isError) {
    return <div>Error al cargar los datos del usuario</div>; // Manejar error en caso de que falle
  }

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="secondary"
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu aria-label="User menu actions">
        <DropdownItem key="profile">
          <div className="flex flex-col">
            <span className="text-sm">Iniciado sesión como</span>
            <span className="text-sm font-semibold">
              {user?.email || "Usuario"} {/* Muestra el correo real */}
            </span>
          </div>
        </DropdownItem>
        <DropdownItem key="settings">Mis ajustes</DropdownItem>
        <DropdownItem key="logout" color="danger" onPress={handleLogout}>
          Cerrar sesión
        </DropdownItem>
        <DropdownItem key="switch">
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
