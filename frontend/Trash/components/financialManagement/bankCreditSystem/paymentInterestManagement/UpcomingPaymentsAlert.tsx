// frontend/src/components/financialManagement/bankCreditSystem/paymentInterestManagement/UpcomingPaymentsAlert.tsx

import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { ActiveLoan } from "@/types/financialManagement";

interface UpcomingPaymentsAlertProps {
  activeLoans: ActiveLoan[];
}

const UpcomingPaymentsAlert: React.FC<UpcomingPaymentsAlertProps> = ({
  activeLoans,
}) => {
  const upcomingPayments = activeLoans.filter((loan) => {
    const dueDate = new Date(loan.dueDate);
    const today = new Date();
    const differenceInDays = Math.ceil(
      (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
    return differenceInDays <= 7 && differenceInDays > 0;
  });

  return (
    <Card>
      <CardHeader>Próximos Vencimientos (7 días)</CardHeader>
      <CardBody>
        {upcomingPayments.length > 0 ? (
          upcomingPayments.map((loan) => (
            <div key={loan.id} className="mb-2">
              <p>
                Préstamo {loan.id}: Vence el{" "}
                {new Date(loan.dueDate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No hay pagos próximos en los siguientes 7 días.</p>
        )}
      </CardBody>
    </Card>
  );
};

export default UpcomingPaymentsAlert;
