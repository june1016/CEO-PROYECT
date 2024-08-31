import { Account } from "@/types/financialManagement";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateAgeingReport = (
  accountsReceivable: Account[],
  accountsPayable: Account[]
): void => {
  const doc = new jsPDF();

  const generateTable = (accounts: Account[], title: string): void => {
    doc.text(title, 14, 15);
    (doc as any).autoTable({
      startY: 20,
      head: [
        [
          "Cliente/Proveedor",
          "Monto",
          "Fecha de Vencimiento",
          "Estado",
          "Días de Atraso",
        ],
      ],
      body: accounts.map((account) => [
        account.clientName,
        `$${account.amount.toFixed(2)}`,
        new Date(account.dueDate).toLocaleDateString(),
        account.status,
        calculateDaysOverdue(account.dueDate),
      ]),
    });
  };

  generateTable(
    accountsReceivable,
    "Reporte de Antigüedad - Cuentas por Cobrar"
  );
  doc.addPage();
  generateTable(accountsPayable, "Reporte de Antigüedad - Cuentas por Pagar");

  doc.save("reporte_antiguedad.pdf");
};

const calculateDaysOverdue = (dueDate: string): number => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = Math.abs(today.getTime() - due.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return today > due ? diffDays : 0;
};
