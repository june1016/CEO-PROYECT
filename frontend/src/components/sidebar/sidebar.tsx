import React from "react";
import { Sidebar } from "./sidebarStyles";
// import { Avatar, Tooltip } from "@nextui-org/react";
import { CompanyInfo } from "./companyLogo";
import { HomeIcon } from "../icons/sidebar/homeIcon";
//import { AccountsIcon } from "../icons/sidebar/accountsIcon";
import { ProductsIcon } from "../icons/sidebar/productsIcon";
import { ReportsIcon } from "../icons/sidebar/reportsIcon";
import { CollapseItems } from "./collapseItems";
import { SidebarItem } from "./sidebarItem";
import { SidebarMenu } from "./sidebarMenu";
import { useSidebarContext } from "../layout/layoutContext";
import { usePathname } from "next/navigation";

// Importa o crea nuevos iconos según sea necesario
import { MarketIcon } from "../icons/sidebar/marketIcon";
import { FinanceIcon } from "../icons/sidebar/financeIcon";
import { HRIcon } from "../icons/sidebar/hrIcon";
import { SalesIcon } from "../icons/sidebar/salesIcon";
import { BudgetIcon } from "../icons/sidebar/budgetIcon";
import { InventoryIcon } from "../icons/sidebar/inventoryIcon";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompanyInfo />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Panel de Control"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Gestión Empresarial">
              <SidebarItem
                isActive={pathname === "/market"}
                title="Información de Mercado"
                icon={<MarketIcon />}
                href="/market"
              />
              <CollapseItems
                icon={<FinanceIcon />}
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
                    href: "/financialManagement/cashFlow",
                  },
                  {
                    name: "Presupuestos y Análisis Financiero",
                    href: "/financialManagement/budgetAnalysis",
                  },
                ]}
                title="Gestión Financiera"
              />
              <SidebarItem
                isActive={pathname === "/recursos-humanos"}
                title="Recursos Humanos"
                icon={<HRIcon />}
                href="/recursos-humanos"
              />
              <CollapseItems
                icon={<ProductsIcon />}
                items={[
                  { name: "Control de Costos", href: "/costos" },
                  { name: "Gestión de Precios", href: "/precios" },
                ]}
                title="Costos y Precios"
              />
              <CollapseItems
                icon={<SalesIcon />}
                items={[
                  { name: "Estrategias de Venta", href: "/ventas/estrategias" },
                  { name: "Licitaciones", href: "/ventas/licitaciones" },
                  { name: "Marketing", href: "/ventas/marketing" },
                ]}
                title="Estrategias de Venta"
              />
              <CollapseItems
                icon={<BudgetIcon />}
                items={[
                  { name: "Presupuestos", href: "/presupuestos" },
                  { name: "Análisis Financiero", href: "/analisis-financiero" },
                ]}
                title="Presupuestos y Análisis"
              />
              <CollapseItems
                icon={<InventoryIcon />}
                items={[
                  { name: "Producción", href: "/produccion" },
                  { name: "Inventarios", href: "/inventarios" },
                ]}
                title="Producción e Inventarios"
              />
            </SidebarMenu>

            <SidebarMenu title="Informes y Análisis">
              <SidebarItem
                isActive={pathname === "/reportes"}
                title="Informes"
                icon={<ReportsIcon />}
                href="/reportes"
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            {/* Eliminado el botón de configuración */}
          </div>
        </div>
      </div>
    </aside>
  );
};
