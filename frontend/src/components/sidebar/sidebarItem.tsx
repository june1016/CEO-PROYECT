import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useSidebarContext } from "../layout/layoutContext";
import { Tooltip } from "@nextui-org/react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
  collapsed?: boolean;
}

export const SidebarItem = ({
  icon,
  title,
  isActive,
  href = "",
  collapsed,
}: Props) => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && ref.current) {
        ref.current.click();
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (element) {
        element.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, []);

  const variants = {
    expanded: { width: "100%", transition: { duration: 0.3 } },
    collapsed: { width: "fit-content", transition: { duration: 0.3 } },
  };

  const content = (
    <motion.div
      variants={variants}
      initial={collapsed ? "collapsed" : "expanded"}
      animate={collapsed ? "collapsed" : "expanded"}
      className={`flex items-center w-full p-2 ${
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-foreground/80 hover:bg-default-100"
      } ${
        collapsed ? "justify-center" : "justify-start"
      } rounded-lg transition-all duration-300 ease-in-out cursor-pointer`}
      role="menuitem"
      tabIndex={0}
      aria-current={isActive ? "page" : undefined}
    >
      <div
        className="w-10 h-10 flex items-center justify-center"
        aria-hidden="true"
      >
        {icon}
      </div>
      {!collapsed && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm ml-4 whitespace-nowrap"
        >
          {title}
        </motion.span>
      )}
    </motion.div>
  );

  if (collapsed) {
    return (
      <Tooltip content={title} placement="right">
        <Link href={href} ref={ref} aria-label={title}>
          {content}
        </Link>
      </Tooltip>
    );
  }

  return (
    <Link href={href} ref={ref}>
      {content}
    </Link>
  );
};
