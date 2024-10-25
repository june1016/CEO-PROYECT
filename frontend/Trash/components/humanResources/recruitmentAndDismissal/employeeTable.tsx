// "use client";
// import React from "react";
// import { ResponsiveTable } from "@/components/shared/responsiveTable";
// import { Button } from "@nextui-org/react";
// import { Employee } from "@/types/humanResources";

// interface EmployeeTableProps {
//   employees: Employee[];
//   onDismiss: (employeeId: string) => void;
// }

// const EmployeeTable: React.FC<EmployeeTableProps> = ({
//   employees,
//   onDismiss,
// }) => {
//   const columns = [
//     { name: "Nombre", uid: "name" },
//     { name: "Posición", uid: "position" },
//     { name: "Salario", uid: "salary" },
//     { name: "Tipo de Contrato", uid: "contractType" },
//     { name: "Acciones", uid: "actions" },
//   ];

//   const renderCell = (employee: Employee, columnKey: React.Key) => {
//     switch (columnKey) {
//       case "name":
//         return employee.name;
//       case "position":
//         return employee.position;
//       case "salary":
//         return `$${employee.salary.toLocaleString()}`;
//       case "contractType":
//         return employee.contractType === "fullTime"
//           ? "Tiempo Completo"
//           : employee.contractType === "partTime"
//           ? "Medio Tiempo"
//           : "Temporal";
//       case "actions":
//         return (
//           <Button
//             color="danger"
//             size="sm"
//             onClick={() => onDismiss(employee.id)}
//           >
//             Despedir
//           </Button>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <ResponsiveTable
//       columns={columns}
//       items={employees}
//       renderCell={renderCell}
//     />
//   );
// };

// export default EmployeeTable;
