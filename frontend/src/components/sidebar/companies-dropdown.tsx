"use client";
import React from "react";
import { AcmeIcon } from "../icons/acme-icon";

export const CompanyInfo = () => {
  const company = {
    name: "UNI-COL",
    location: "Simulador CEO",
    logo: <AcmeIcon />,
  };

  return (
    <div className="flex items-center gap-2 p-4">
      {company.logo}
      <div className="flex flex-col">
        <h3 className="text-xl font-medium m-0 text-default-900 whitespace-nowrap">
          {company.name}
        </h3>
        <span className="text-xs font-medium text-default-500">
          {company.location}
        </span>
      </div>
    </div>
  );
};
