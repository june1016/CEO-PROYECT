// frontend/src/components/humanResources/payrollManagement/payrollManagementTabs.tsx
"use client";
import React, { useMemo } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { useTabSelection } from "@/hooks/useTabSelection";
import EmployeeTable from "./employeeTable";
import SalaryAdjustForm from "./salaryAdjustForm";
import PayrollDashboard from "./payrollDashboard";
import usePayrollManagement from "@/hooks/humanResources/payrollManagement/usePayrollManagement";

const PayrollManagementTabs: React.FC = () => {
  const { selectedTab, handleTabChange } = useTabSelection("dashboard");
  const { employees, adjustSalary } = usePayrollManagement();

  const tabItems = useMemo(
    () => [
      {
        key: "dashboard",
        title: "Dashboard",
        content: <PayrollDashboard employees={employees} />,
      },
      {
        key: "employeeList",
        title: "Lista de Empleados",
        content: (
          <EmployeeTable employees={employees} onSalaryChange={adjustSalary} />
        ),
      },
      {
        key: "salaryAdjust",
        title: "Ajuste de Salarios",
        content: (
          <SalaryAdjustForm
            employees={employees}
            onSalaryAdjust={adjustSalary}
          />
        ),
      },
    ],
    [employees, adjustSalary]
  );

  return (
    <div className="flex flex-col space-y-4">
      <Tabs
        aria-label="Gestión de Nómina"
        selectedKey={selectedTab}
        onSelectionChange={handleTabChange as any}
      >
        {tabItems.map((item) => (
          <Tab key={item.key} title={item.title}>
            {item.content}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default PayrollManagementTabs;
