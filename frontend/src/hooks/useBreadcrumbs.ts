import { usePathname } from "next/navigation";
import { routeConfig, RouteKey } from "../config/routeConfig";

export const useBreadcrumbs = () => {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const pathSegments = pathname.split("/").filter((segment) => segment);
    let currentPath = "";

    return pathSegments.map((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      // Buscar la ruta más específica que coincida
      const matchingRoute = Object.keys(routeConfig)
        .reverse()
        .find((route) => currentPath.startsWith(route));

      return {
        href: currentPath,
        label: matchingRoute ? routeConfig[matchingRoute as RouteKey] : segment,
        isLast,
      };
    });
  };

  return getBreadcrumbs();
};
