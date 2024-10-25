import React from "react";
import { useSidebarContext } from "@/app/(app)/layout";
import { StyledBurgerButton } from "./navbarStyles";

export const BurguerButton = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <div
      className={StyledBurgerButton()}
      // open={collapsed}
      onClick={() => setCollapsed(!collapsed)} // Cambiado para manejar el evento correctamente
    >
      <div />
      <div />
    </div>
  );
};
