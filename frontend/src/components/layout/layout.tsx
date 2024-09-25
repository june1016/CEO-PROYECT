"use client";

import React from "react";
import { useLockedBody } from "../../hooks/useBodyLock";
import { NavbarWrapper } from "../navbar/navbar";
import { SidebarWrapper } from "../sidebar/sidebar";
import { SidebarContext } from "./layoutContext";
import { useSidebarState } from "../../hooks/useSidebarState";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const { collapsed, setCollapsed, locked, setLocked } = useSidebarState();

  const handleToggleSidebar = (value: boolean) => {
    setCollapsed(value);
    setLocked(!value);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        <SidebarWrapper />
        <NavbarWrapper>
          <main className="max-w-[1536px] w-full mx-auto px-6 flex-grow">
            {children}
          </main>
        </NavbarWrapper>
      </section>
    </SidebarContext.Provider>
  );
};
