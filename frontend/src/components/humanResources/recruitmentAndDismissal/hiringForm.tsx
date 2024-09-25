// "use client";
// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input, Button, Select, SelectItem } from "@nextui-org/react";
// import { Employee } from "@/types/humanResources";

// const hiringSchema = z.object({
//   name: z.string().min(1, "El nombre es requerido"),
//   position: z.string().min(1, "La posición es requerida"),
//   salary: z.number().min(0, "El salario debe ser mayor o igual a 0"),
//   contractType: z.enum(["fullTime", "partTime", "temporary"]),
// });

// type HiringFormData = z.infer<typeof hiringSchema>;

// interface HiringFormProps {
//   onHire: (employee: Omit<Employee, "id">) => void;
// }

// const HiringForm: React.FC<HiringFormProps> = ({ onHire }) => {
//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<HiringFormData>({
//     resolver: zodResolver(hiringSchema),
//     defaultValues: {
//       name: "",
//       position: "",
//       salary: 0,
//       contractType: "fullTime",
//     },
//   });

//   const onSubmit = (data: HiringFormData) => {
//     onHire(data);
//     reset();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <Controller
//         name="name"
//         control={control}
//         render={({ field }) => (
//           <Input
//             {...field}
//             label="Nombre"
//             placeholder="Ingrese el nombre del empleado"
//             errorMessage={errors.name?.message}
//           />
//         )}
//       />
//       <Controller
//         name="position"
//         control={control}
//         render={({ field }) => (
//           <Input
//             {...field}
//             label="Posición"
//             placeholder="Ingrese la posición del empleado"
//             errorMessage={errors.position?.message}
//           />
//         )}
//       />
//       <Controller
//         name="salary"
//         control={control}
//         render={({ field }) => (
//           <Input
//             {...field}
//             type="number"
//             label="Salario"
//             placeholder="Ingrese el salario del empleado"
//             errorMessage={errors.salary?.message}
//           />
//         )}
//       />
//       <Controller
//         name="contractType"
//         control={control}
//         render={({ field }) => (
//           <Select
//             {...field}
//             label="Tipo de Contrato"
//             placeholder="Seleccione el tipo de contrato"
//             errorMessage={errors.contractType?.message}
//           >
//             <SelectItem key="fullTime" value="fullTime">
//               Tiempo Completo
//             </SelectItem>
//             <SelectItem key="partTime" value="partTime">
//               Medio Tiempo
//             </SelectItem>
//             <SelectItem key="temporary" value="temporary">
//               Temporal
//             </SelectItem>
//           </Select>
//         )}
//       />
//       <Button type="submit" color="primary">
//         Contratar Empleado
//       </Button>
//     </form>
//   );
// };

// export default HiringForm;
