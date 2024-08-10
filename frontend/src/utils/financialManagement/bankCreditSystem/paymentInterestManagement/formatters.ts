// frontend/src/components/utils/financialManagement/bankCreditSystem/paymentInterestManagement/formatters.ts

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("es-CO");
};
