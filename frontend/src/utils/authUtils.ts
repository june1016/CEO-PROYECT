// frontend/src/utils/authUtils.ts
import Cookies from "js-cookie";

// Función para eliminar las cookies relacionadas con la autenticación
export const deleteAuthCookie = () => {
  Cookies.remove("access_token");
};
