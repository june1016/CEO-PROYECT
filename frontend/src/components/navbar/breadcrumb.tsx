import React from "react";
import { usePathname } from "next/navigation";
import { Link } from "@nextui-org/react";

const translatePath = (path: string) => {
  const translations: { [key: string]: string } = {
    home: "Inicio",
    market: "Información de Mercado",
    financialManagement: "Gestión Financiera",
    financialStatements: "Estados Financieros",
    // Añade más traducciones según sea necesario
  };
  return translations[path.toLowerCase()] || path;
};

export const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav aria-label="breadcrumb" className="flex">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" color="foreground">
            Inicio
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const translatedSegment = translatePath(segment);
          return (
            <li key={segment} className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              {isLast ? (
                <span className="text-gray-800 font-medium">
                  {translatedSegment}
                </span>
              ) : (
                <Link href={href} color="foreground">
                  {translatedSegment}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
