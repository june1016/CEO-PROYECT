"use client";
import React from "react";
import { createContext, useContext } from "react";
import { NavbarWrapper } from "@/components/navbar/navbar";
import { SidebarWrapper } from "@/components/sidebar/sidebar";
import { useSidebarState } from "@/hooks/sidebar/useSidebarState";
import "@/styles/globals.css";

// Movemos el contexto directamente al archivo
interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  setCollapsed: () => {},
});

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
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
}
