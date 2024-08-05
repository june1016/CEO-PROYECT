import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
<<<<<<< HEAD
import { NotificationIcon } from "../icons/navbar/notificationicon";
=======
import { NotificationIcon } from "../icons/navbar/notificationIcon";
>>>>>>> dea8224fafe553c760f1e666622c57409ee05d55

export const NotificationsDropdown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <NavbarItem>
          <NotificationIcon />
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu className="w-80" aria-label="Notificaciones">
        <DropdownSection title="Notificaciones">
          <DropdownItem
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            key="1"
            description="Se ha completado el período de simulación actual."
          >
            🏁 Fin del período de simulación
          </DropdownItem>
          <DropdownItem
            key="2"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Los resultados financieros del último trimestre están disponibles."
          >
            📊 Resultados financieros disponibles
          </DropdownItem>
          <DropdownItem
            key="3"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Se requiere tomar una decisión importante para el próximo período."
          >
            🚨 Decisión pendiente
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
