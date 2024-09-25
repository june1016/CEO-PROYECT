import React from "react";
import { Tooltip } from "@nextui-org/react";
import { AcmeIcon } from "../icons/acmeIcon";
import { motion, AnimatePresence } from "framer-motion";

interface CompanyInfoProps {
  collapsed: boolean;
}

export const CompanyInfo: React.FC<CompanyInfoProps> = ({ collapsed }) => {
  const logoContent = (
    <div
      className={`flex items-center ${
        collapsed ? "justify-center" : "justify-start"
      } w-full transition-all duration-200 ease-in-out py-4`}
    >
      <div
        className={`flex items-center justify-center transition-all duration-200 ease-in-out ${
          collapsed ? "w-12 h-12" : "w-14 h-14"
        }`}
      >
        <AcmeIcon size={collapsed ? 32 : 36} />
      </div>
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.span
            className="font-semibold text-inherit text-xl ml-4 whitespace-nowrap"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            Tu Empresa
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );

  return collapsed ? (
    <Tooltip content="Tu Empresa" placement="right">
      {logoContent}
    </Tooltip>
  ) : (
    logoContent
  );
};
