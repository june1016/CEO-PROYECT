// import { useState, useCallback } from "react";
// import { Employee } from "@/types/humanResources";
// import { v4 as uuidv4 } from "uuid";

// const useRecruitmentAndDismissal = () => {
//   const [employees, setEmployees] = useState<Employee[]>([]);

//   const hireEmployee = useCallback((newEmployee: Omit<Employee, "id">) => {
//     setEmployees((prevEmployees) => [
//       ...prevEmployees,
//       { ...newEmployee, id: uuidv4() },
//     ]);
//   }, []);

//   const dismissEmployee = useCallback((employeeId: string) => {
//     setEmployees((prevEmployees) =>
//       prevEmployees.filter((emp) => emp.id !== employeeId)
//     );
//   }, []);

//   return {
//     employees,
//     hireEmployee,
//     dismissEmployee,
//   };
// };

// export default useRecruitmentAndDismissal;
