// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";

// // Definición clara del contexto
// interface SidebarContextType {
//   collapsed: boolean;
//   setCollapsed: (collapsed: boolean) => void;
// }

// const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// // Hook para usar el contexto
// export const useSidebarContext = () => {
//   const context = useContext(SidebarContext);
//   if (!context) {
//     throw new Error("useSidebarContext must be used within a SidebarProvider");
//   }
//   return context;
// };

// export const useSidebar = () => {
//   const [collapsed, setCollapsed] = useState(true);
//   const [isHovered, setIsHovered] = useState(false);

//   const handleMouseEnter = useCallback(() => {
//     setIsHovered(true);
//     setCollapsed(false);
//   }, []);

//   const handleMouseLeave = useCallback(() => {
//     setIsHovered(false);
//     setCollapsed(true);
//   }, []);

//   const toggleSidebar = useCallback((value: boolean) => {
//     setCollapsed(value);
//   }, []);

//   // Añadimos lógica de colapso en función del tamaño de la pantalla
//   useEffect(() => {
//     const handleResize = () => {
//       setCollapsed(window.innerWidth < 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Proveedor del contexto
//   const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
//     children,
//   }) => (
//     <SidebarContext.Provider value={{ collapsed, setCollapsed: toggleSidebar }}>
//       {children}
//     </SidebarContext.Provider>
//   );

//   // Retornamos el estado y las funciones relevantes
//   return {
//     SidebarProvider,
//     isCollapsed: collapsed && !isHovered,
//     collapsed,
//     setCollapsed: toggleSidebar,
//     handleMouseEnter,
//     handleMouseLeave,
//   };
// };
