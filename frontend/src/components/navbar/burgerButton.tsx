import React from "react";
import { useSidebarContext } from "../layout/layoutContext";
import { StyledBurgerButton } from "./navbarStyles";

export const BurguerButton = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <div
      className={StyledBurgerButton()}
      // open={collapsed}
      onClick={setCollapsed}
    >
      <div />
      <div />
    </div>
  );
};
