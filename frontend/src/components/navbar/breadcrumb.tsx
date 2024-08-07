import React from "react";
import { Link } from "@nextui-org/react";
import { useBreadcrumbs } from "@/components/hooks/useBreadcrumbs";

export const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <nav aria-label="breadcrumb" className="flex">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-500">/</span>}
            {crumb.isLast ? (
              <span className="text-gray-800 font-medium">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} color="foreground">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
