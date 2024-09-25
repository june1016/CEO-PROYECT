// frontend/src/hooks/humanResources/payrollManagement/usePayrollManagement.ts
import { useState, useCallback } from "react";
import { Employee } from "@/types/humanResources";
import { employeeData } from "@/data/humanResources/payrollManagement/employeeData";

const usePayrollManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>(employeeData);

  const adjustSalary = useCallback((id: string, newSalary: number) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              salary: newSalary,
              totalCompensation: newSalary + emp.bonuses + emp.commissions,
            }
          : emp
      )
    );
  }, []);

  return {
    employees,
    adjustSalary,
  };
};

export default usePayrollManagement;
