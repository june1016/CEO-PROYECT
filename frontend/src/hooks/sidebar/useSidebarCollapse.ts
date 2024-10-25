import { useState, useCallback } from "react";
import { useSidebarContext } from "@/app/(app)/layout";

export const useSidebarCollapse = () => {
  const { collapsed, setCollapsed } = useSidebarContext();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setCollapsed(false);
  }, [setCollapsed]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCollapsed(true);
  }, [setCollapsed]);

  const isCollapsed = collapsed && !isHovered;

  return { isCollapsed, handleMouseEnter, handleMouseLeave };
};
