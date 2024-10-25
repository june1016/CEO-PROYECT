// "use client";
// import React, { useMemo } from "react";
// import { ReusableTabs, TabItem } from "@/components/shared/reusableTabs";
// import { useTabSelection } from "@/hooks/useTabSelection";
// import HiringForm from "./hiringForm";
// import EmployeeTable from "./employeeTable";
// import HRDashboard from "./hrDashboard";
// import useRecruitmentAndDismissal from "@/hooks/humanResources/recruitmentAndDismissal/useRecruitmentAndDismissal";

// const RecruitmentAndDismissalTabs: React.FC = () => {
//   const { selectedTab, handleTabChange } = useTabSelection("dashboard");
//   const { employees, hireEmployee, dismissEmployee } =
//     useRecruitmentAndDismissal();

//   const tabItems: TabItem[] = useMemo(
//     () => [
//       {
//         key: "dashboard",
//         title: "Dashboard",
//         content: <HRDashboard employees={employees} />,
//       },
//       {
//         key: "hiring",
//         title: "Contratación",
//         content: <HiringForm onHire={hireEmployee} />,
//       },
//       {
//         key: "employees",
//         title: "Empleados",
//         content: (
//           <EmployeeTable employees={employees} onDismiss={dismissEmployee} />
//         ),
//       },
//     ],
//     [employees, hireEmployee, dismissEmployee]
//   );

//   return (
//     <div className="flex flex-col space-y-4">
//       <ReusableTabs
//         items={tabItems}
//         selectedTab={selectedTab}
//         onSelectionChange={handleTabChange}
//         ariaLabel="Contratación y Despido de Personal"
//       />
//       {tabItems.find((item) => item.key === selectedTab)?.content}
//     </div>
//   );
// };

// export default RecruitmentAndDismissalTabs;
