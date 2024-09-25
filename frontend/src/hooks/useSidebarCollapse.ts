import { useState, useCallback } from "react";
import { useSidebarContext } from "../components/layout/layoutContext";

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
