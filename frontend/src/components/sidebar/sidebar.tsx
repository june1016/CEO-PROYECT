import React, { lazy, Suspense } from "react";
import { Sidebar } from "./sidebarStyles";
import { CompanyInfo } from "./companyLogo";
import { HomeIcon } from "../icons/sidebar/homeIcon";
import { SidebarItem } from "./sidebarItem";
import { SidebarMenu } from "./sidebarMenu";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebarCollapse } from "../../hooks/useSidebarCollapse";

// Lazy load other components
const LazyCollapseItems = lazy(() =>
  import("./collapseItems").then((mod) => ({ default: mod.CollapseItems }))
);

// Lazy load icons
const LazyMarketIcon = lazy(() =>
  import("../icons/sidebar/marketIcon").then((mod) => ({
    default: mod.MarketIcon,
  }))
);
const LazyObjectivesIcon = lazy(() =>
  import("../icons/sidebar/objectivesIcon").then((mod) => ({
    default: mod.ObjectivesIcon,
  }))
);
const LazyFinanceIcon = lazy(() =>
  import("../icons/sidebar/financeIcon").then((mod) => ({
    default: mod.FinanceIcon,
  }))
);
const LazyHRIcon = lazy(() =>
  import("../icons/sidebar/hrIcon").then((mod) => ({ default: mod.HRIcon }))
);
const LazyProductionIcon = lazy(() =>
  import("../icons/sidebar/productionIcon").then((mod) => ({
    default: mod.ProductionIcon,
  }))
);
const LazyCostIcon = lazy(() =>
  import("../icons/sidebar/costIcon").then((mod) => ({ default: mod.CostIcon }))
);
const LazySalesIcon = lazy(() =>
  import("../icons/sidebar/salesIcon").then((mod) => ({
    default: mod.SalesIcon,
  }))
);
const LazyReportsIcon = lazy(() =>
  import("../icons/sidebar/reportsIcon").then((mod) => ({
    default: mod.ReportsIcon,
  }))
);

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { isCollapsed, handleMouseEnter, handleMouseLeave } =
    useSidebarCollapse();

  const sidebarVariants = {
    expanded: { width: "280px" },
    collapsed: { width: "88px" },
  };

  return (
    <motion.aside
      className="h-screen z-[20] sticky top-0"
      initial={isCollapsed ? "collapsed" : "expanded"}
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`${Sidebar({
          collapsed: isCollapsed,
        })} bg-background border-r border-divider h-full flex flex-col overflow-hidden`}
      >
        <div className={Sidebar.Header()}>
          <CompanyInfo collapsed={isCollapsed} />
        </div>
        <div className="flex flex-col justify-between h-full overflow-y-auto custom-scrollbar">
          <AnimatePresence>
            <motion.div
              className={Sidebar.Body()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SidebarItem
                title="Panel de Control"
                icon={<HomeIcon />}
                isActive={pathname === "/"}
                href="/"
                collapsed={isCollapsed}
              />
              <Suspense fallback={<div>Loading...</div>}>
                <SidebarMenu title="Gestión de Empresa" collapsed={isCollapsed}>
                  <SidebarItem
                    isActive={pathname === "/openingInformation"}
                    title="Información de Apertura"
                    icon={<LazyMarketIcon />}
                    href="/openingInformation"
                    collapsed={isCollapsed}
                  />
                  <SidebarItem
                    isActive={pathname === "/companyObjectives"}
                    title="Objetivos Empresariales"
                    icon={<LazyObjectivesIcon />}
                    href="/companyObjectives"
                    collapsed={isCollapsed}
                  />
                </SidebarMenu>

                <LazyCollapseItems
                  icon={<LazyFinanceIcon />}
                  title="Gestión Financiera"
                  items={[
                    {
                      name: "Estados Financieros",
                      href: "/financialManagement/financialStatements",
                    },
                    {
                      name: "Gestión de Activos y Pasivos",
                      href: "/financialManagement/assetLiabilityManagement",
                    },
                    {
                      name: "Sistema de Créditos Bancarios",
                      href: "/financialManagement/BankCreditSystem",
                    },
                    {
                      name: "Flujo de Caja y Proyecciones",
                      href: "/financialManagement/cashFlowProjections",
                    },
                    {
                      name: "Presupuestos y Análisis Financiero",
                      href: "/financialManagement/budgetAnalysis",
                    },
                  ]}
                  collapsed={isCollapsed}
                />

                <LazyCollapseItems
                  icon={<LazyHRIcon />}
                  title="Recursos Humanos"
                  items={[
                    {
                      name: "Gestión de Nómina",
                      href: "/humanResources/payrollManagement",
                    },
                    {
                      name: "Contratación y Despido de Personal",
                      href: "/humanResources/hiringFiring",
                    },
                    {
                      name: "Estructura Organizacional",
                      href: "/humanResources/organizationalStructure",
                    },
                    {
                      name: "Impacto en Productividad",
                      href: "/humanResources/productivityImpact",
                    },
                    {
                      name: "Historial de Cambios",
                      href: "/humanResources/changeHistory",
                    },
                  ]}
                  collapsed={isCollapsed}
                />

                <LazyCollapseItems
                  icon={<LazyProductionIcon />}
                  title="Producción"
                  items={[
                    {
                      name: "Gestión de Inventario",
                      href: "/production/inventoryManagement",
                    },
                    {
                      name: "Planificación de Producción",
                      href: "/production/productionPlanning",
                    },
                    {
                      name: "Control de Calidad",
                      href: "/production/qualityControl",
                    },
                    {
                      name: "Mantenimiento de Equipos",
                      href: "/production/equipmentMaintenance",
                    },
                  ]}
                  collapsed={isCollapsed}
                />

                <LazyCollapseItems
                  icon={<LazyCostIcon />}
                  title="Costos"
                  items={[
                    {
                      name: "Análisis de Costos",
                      href: "/costs/costAnalysis",
                    },
                    {
                      name: "Gestión de Proveedores",
                      href: "/costs/supplierManagement",
                    },
                    {
                      name: "Optimización de Costos",
                      href: "/costs/costOptimization",
                    },
                  ]}
                  collapsed={isCollapsed}
                />

                <LazyCollapseItems
                  icon={<LazySalesIcon />}
                  title="Ventas y Marketing"
                  items={[
                    {
                      name: "Gestión de Clientes",
                      href: "/salesMarketing/customerManagement",
                    },
                    {
                      name: "Campañas de Marketing",
                      href: "/salesMarketing/marketingCampaigns",
                    },
                    {
                      name: "Análisis de Ventas",
                      href: "/salesMarketing/salesAnalysis",
                    },
                  ]}
                  collapsed={isCollapsed}
                />

                <LazyCollapseItems
                  icon={<LazyReportsIcon />}
                  title="Informes y Análisis"
                  items={[
                    {
                      name: "Informes Financieros",
                      href: "/reports/financialReports",
                    },
                    {
                      name: "Análisis de Rendimiento",
                      href: "/reports/performanceAnalysis",
                    },
                    {
                      name: "Proyecciones de Negocio",
                      href: "/reports/businessProjections",
                    },
                  ]}
                  collapsed={isCollapsed}
                />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
};
