import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompanyInfo } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";

// Importa o crea nuevos iconos según sea necesario
import { MarketIcon } from "../icons/sidebar/market-icon";
import { FinanceIcon } from "../icons/sidebar/finance-icon";
import { HRIcon } from "../icons/sidebar/hr-icon";
import { SalesIcon } from "../icons/sidebar/sales-icon";
import { BudgetIcon } from "../icons/sidebar/budget-icon";
import { InventoryIcon } from "../icons/sidebar/inventory-icon";

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
                isActive={pathname === "/mercado"}
                title="Información de Mercado"
                icon={<MarketIcon />}
                href="/mercado"
              />
              <CollapseItems
                icon={<FinanceIcon />}
                items={[
                  { name: "Estados Financieros", href: "/finanzas/estados" },
                  { name: "Créditos Bancarios", href: "/finanzas/creditos" },
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
