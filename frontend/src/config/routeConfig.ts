export const routeConfig = {
  "/": "Inicio",
  "/login": "Iniciar Sesión", // Ruta para el login
  "/register": "Registrar Cuenta", // Añadir esta ruta para el registro de usuarios
  "/market": "Información de Mercado",
  "/financialManagement": "Gestión Financiera",
  "/financialManagement/financialStatements": "Estados Financieros",
  "/financialManagement/assetLiabilityManagement":
    "Gestión de Activos y Pasivos",
  "/financialManagement/assetLiabilityManagement/cashBank":
    "Control de Caja y Bancos",
  "/financialManagement/assetLiabilityManagement/accounts":
    "Cuentas por Cobrar y Pagar",
  "/financialManagement/bankCredits": "Sistema de Créditos Bancarios",
  "/financialManagement/cashFlow": "Flujo de Caja y Proyecciones",
  "/financialManagement/budgetAnalysis": "Presupuestos y Análisis Financiero",
  // Añade más rutas según sea necesario
};

export type RouteKey = keyof typeof routeConfig;
