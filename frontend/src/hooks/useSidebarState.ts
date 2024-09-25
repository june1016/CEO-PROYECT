import { useState, useEffect } from "react";
import { useLockedBody } from "./useBodyLock";

export const useSidebarState = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [locked, setLocked] = useLockedBody(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { collapsed, setCollapsed, locked, setLocked };
};
