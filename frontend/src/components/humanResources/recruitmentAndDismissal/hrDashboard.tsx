// "use client";
// import React from "react";
// import { Card, CardBody, CardHeader } from "@nextui-org/react";
// import { Employee } from "@/types/humanResources";

// interface HRDashboardProps {
//   employees: Employee[];
// }

// const HRDashboard: React.FC<HRDashboardProps> = ({ employees }) => {
//   const totalEmployees = employees.length;
//   const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
//   const averageSalary = totalEmployees > 0 ? totalSalary / totalEmployees : 0;

//   const contractTypeCounts = employees.reduce(
//     (acc, emp) => {
//       acc[emp.contractType]++;
//       return acc;
//     },
//     { fullTime: 0, partTime: 0, temporary: 0 }
//   );

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       <Card>
//         <CardHeader>Total de Empleados</CardHeader>
//         <CardBody>{totalEmployees}</CardBody>
//       </Card>
//       <Card>
//         <CardHeader>Salario Total</CardHeader>
//         <CardBody>${totalSalary.toLocaleString()}</CardBody>
//       </Card>
//       <Card>
//         <CardHeader>Salario Promedio</CardHeader>
//         <CardBody>${averageSalary.toLocaleString()}</CardBody>
//       </Card>
//       <Card>
//         <CardHeader>Distribución de Contratos</CardHeader>
//         <CardBody>
//           <p>Tiempo Completo: {contractTypeCounts.fullTime}</p>
//           <p>Medio Tiempo: {contractTypeCounts.partTime}</p>
//           <p>Temporal: {contractTypeCounts.temporary}</p>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default HRDashboard;
