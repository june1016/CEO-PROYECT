import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { SidebarItem } from "./sidebarItem";
import { useSidebarContext } from "@/app/(app)/layout";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  icon: React.ReactNode;
  title: string;
  items: Array<{ name: string; href: string }>;
  collapsed: boolean;
}

export const CollapseItems = ({ icon, title, items, collapsed }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { collapsed: sidebarCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (!sidebarCollapsed) {
      setIsOpen(!isOpen);
    }
  };

  const variants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        height: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
  };

  return (
    <div className="w-full">
      <div
        className={`flex items-center cursor-pointer p-2 rounded-lg transition-all duration-200 ease-in-out ${
          isOpen ? "bg-default-100" : ""
        } ${collapsed ? "justify-center" : "justify-start"}`}
        onClick={handleClick}
      >
        <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
        {!collapsed && (
          <>
            <span className="text-sm ml-4">{title}</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="ml-auto"
            >
              <ChevronDownIcon className="w-5 h-5" />
            </motion.div>
          </>
        )}
      </div>
      <AnimatePresence initial={false}>
        {!collapsed && isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
          >
            <div className="pl-12">
              {items.map((item, index) => (
                <SidebarItem
                  key={index}
                  title={item.name}
                  href={item.href}
                  icon={
                    <div className="w-2 h-2 rounded-full bg-foreground/50 ml-1" />
                  }
                  collapsed={collapsed}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
