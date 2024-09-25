// import { useState, useCallback, useEffect } from "react";
// import { useLockedBody } from "./useBodyLock";
// import { useSidebarContext } from "../components/layout/layoutContext";

// export const useSidebar = () => {
//   const { collapsed, setCollapsed } = useSidebarContext();
//   const [isHovered, setIsHovered] = useState(false);
//   const [locked, setLocked] = useLockedBody(false);

//   const handleMouseEnter = useCallback(() => {
//     setIsHovered(true);
//     setCollapsed(false);
//   }, [setCollapsed]);

//   const handleMouseLeave = useCallback(() => {
//     setIsHovered(false);
//     setCollapsed(true);
//   }, [setCollapsed]);

//   const isCollapsed = collapsed && !isHovered;

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setCollapsed(true);
//       } else {
//         setCollapsed(false);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, [setCollapsed]);

//   return {
//     isCollapsed,
//     handleMouseEnter,
//     handleMouseLeave,
//     locked,
//     setLocked,
//     setCollapsed,
//   };
// };
