// import React, { useState, useEffect, useCallback } from "react";
// import { Sidebar } from "./sidebarStyles";
// import { CompanyInfo } from "./companyLogo";
// import { HomeIcon } from "../icons/sidebar/homeIcon";
// import { CollapseItems } from "./collapseItems";
// import { SidebarItem } from "./sidebarItem";
// import { SidebarMenu } from "./sidebarMenu";
// import { useSidebarContext } from "../layout/layoutContext";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";

// // Import other necessary icons
// import { MarketIcon } from "../icons/sidebar/marketIcon";
// import { ObjectivesIcon } from "../icons/sidebar/objectivesIcon";
// import { FinanceIcon } from "../icons/sidebar/financeIcon";
// import { HRIcon } from "../icons/sidebar/hrIcon";
// import { ProductionIcon } from "../icons/sidebar/productionIcon";
// import { CostIcon } from "../icons/sidebar/costIcon";
// import { SalesIcon } from "../icons/sidebar/salesIcon";
// import { ReportsIcon } from "../icons/sidebar/reportsIcon";

// export const SidebarWrapper = () => {
//   const pathname = usePathname();
//   const { collapsed, setCollapsed } = useSidebarContext();
//   const [isHovered, setIsHovered] = useState(false);

//   const handleMouseEnter = useCallback(() => {
//     setIsHovered(true);
//     setCollapsed(false);
//   }, [setCollapsed]);

//   const handleMouseLeave = useCallback(() => {
//     setIsHovered(false);
//     setCollapsed(true);
//   }, [setCollapsed]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setCollapsed(true);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [setCollapsed]);

//   const sidebarVariants = {
//     expanded: { width: "280px" },
//     collapsed: { width: "88px" },
//   };

//   return (
//     <motion.aside
//       className="h-screen z-[20] sticky top-0"
//       initial={collapsed ? "collapsed" : "expanded"}
//       animate={collapsed && !isHovered ? "collapsed" : "expanded"}
//       variants={sidebarVariants}
//       transition={{ type: "spring", stiffness: 400, damping: 30 }}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div
//         className={`${Sidebar({
//           collapsed: collapsed && !isHovered,
//         })} bg-background border-r border-divider h-full flex flex-col overflow-hidden`}
//       >
//         <div className={Sidebar.Header()}>
//           <CompanyInfo collapsed={collapsed && !isHovered} />
//         </div>
//         <div className="flex flex-col justify-between h-full overflow-y-auto custom-scrollbar">
//           <AnimatePresence>
//             <motion.div
//               className={Sidebar.Body()}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <SidebarItem
//                 title="Panel de Control"
//                 icon={<HomeIcon />}
//                 isActive={pathname === "/"}
//                 href="/"
//                 collapsed={collapsed && !isHovered}
//               />
//               {/* Fase 3: Gestión de Empresa */}
//               <SidebarMenu
//                 title="Gestión de Empresa"
//                 collapsed={collapsed && !isHovered}
//               >
//                 <SidebarItem
//                   isActive={pathname === "/market"}
//                   title="Información de Mercado"
//                   icon={<MarketIcon />}
//                   href="/market"
//                   collapsed={collapsed && !isHovered}
//                 />
//                 <SidebarItem
//                   isActive={pathname === "/companyObjectives"}
//                   title="Objetivos Empresariales"
//                   icon={<ObjectivesIcon />}
//                   href="/companyObjectives"
//                   collapsed={collapsed && !isHovered}
//                 />
//               </SidebarMenu>

//               {/* Fase 4: Gestión Financiera */}
//               <CollapseItems
//                 icon={<FinanceIcon />}
//                 title="Gestión Financiera"
//                 items={[
//                   {
//                     name: "Estados Financieros",
//                     href: "/financialManagement/financialStatements",
//                   },
//                   {
//                     name: "Gestión de Activos y Pasivos",
//                     href: "/financialManagement/assetLiabilityManagement",
//                   },
//                   {
//                     name: "Sistema de Créditos Bancarios",
//                     href: "/financialManagement/BankCreditSystem",
//                   },
//                   {
//                     name: "Flujo de Caja y Proyecciones",
//                     href: "/financialManagement/cashFlowProjections",
//                   },
//                   {
//                     name: "Presupuestos y Análisis Financiero",
//                     href: "/financialManagement/budgetAnalysis",
//                   },
//                 ]}
//                 collapsed={collapsed && !isHovered}
//               />

//               {/* Fase 5: Recursos Humanos */}
//               <CollapseItems
//                 icon={<HRIcon />}
//                 title="Recursos Humanos"
//                 items={[
//                   {
//                     name: "Gestión de Nómina",
//                     href: "/humanResources/payrollManagement",
//                   },
//                   {
//                     name: "Contratación y Despido de Personal",
//                     href: "/humanResources/hiringFiring",
//                   },
//                   {
//                     name: "Estructura Organizacional",
//                     href: "/humanResources/organizationalStructure",
//                   },
//                   {
//                     name: "Impacto en Productividad",
//                     href: "/humanResources/productivityImpact",
//                   },
//                   {
//                     name: "Historial de Cambios",
//                     href: "/humanResources/changeHistory",
//                   },
//                 ]}
//                 collapsed={collapsed && !isHovered}
//               />

//               {/* Add the rest of your phases here */}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </motion.aside>
//   );
// };
