// frontend/src/app/(app)/humanResources/payrollManagement/page.tsx
"use client";
import React from "react";
import PayrollManagementTabs from "@/components/humanResources/payrollManagement/payrollManagementTabs";
import { motion } from "framer-motion";

const PayrollManagementPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 max-w-7xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Gestión de Nómina</h1>
      <PayrollManagementTabs />
    </motion.div>
  );
};

export default PayrollManagementPage;
