import { tv } from "@nextui-org/react";

export const SidebarWrapper = tv({
  base: "bg-background transition-all duration-300 h-full shrink-0 z-[202] overflow-y-auto border-r border-divider flex-col py-4 px-2",

  variants: {
    collapsed: {
      true: "w-[64px] items-center",
      false: "w-[240px]",
    },
  },
});

export const Overlay = tv({
  base: "bg-[rgb(15_23_42/0.3)] fixed inset-0 z-[201] opacity-80 transition-opacity md:hidden md:z-auto md:opacity-100",
});

export const Header = tv({
  base: "flex items-center px-4",
});

export const Body = tv({
  base: "flex flex-col gap-2 mt-4",
});

export const Footer = tv({
  base: "flex items-center justify-center gap-6 pt-16 pb-8 px-8 md:pt-10 md:pb-0",
});

export const Sidebar = Object.assign(SidebarWrapper, {
  Header,
  Body,
  Overlay,
  Footer,
});
