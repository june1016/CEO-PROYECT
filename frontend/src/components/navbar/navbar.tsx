import { Navbar, NavbarContent, NavbarBrand } from "@nextui-org/react";
import React from "react";
import { BurguerButton } from "./burgerButton";
import { NotificationsDropdown } from "./notificationsDropdown";
import { UserDropdown } from "./userDropdown";
import { Breadcrumb } from "./breadcrumb";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarBrand className="flex-grow">
          <Breadcrumb />
        </NavbarBrand>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <NotificationsDropdown />
          <UserDropdown />
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
