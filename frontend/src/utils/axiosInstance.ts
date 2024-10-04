import axios from "axios";
import Cookies from "js-cookie";

// Función para obtener el token de las cookies
const getToken = () => {
  return Cookies.get("access_token");
};

// Crear una instancia de Axios con una configuración base
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/", // Usamos la variable de entorno y un valor por defecto
  timeout: 15000, // Ajustar el timeout si es necesario para desarrollo
});

// Interceptor para agregar el token JWT en las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = getToken(); // Utilizamos la función auxiliar
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Añadir el token en el header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Manejamos cualquier error que ocurra en la configuración de la solicitud
  }
);

// Interceptor para manejar errores de respuestas
api.interceptors.response.use(
  (response) => {
    return response; // Retornar la respuesta si todo está bien
  },
  (error) => {
    // Manejar errores de manera centralizada
    if (error.response && error.response.status === 401) {
      // Si el error es 401 (no autorizado), redirigir al login
      console.error("Sesión expirada. Redirigiendo al login...");
      Cookies.remove("access_token"); // Eliminar el token inválido
      window.location.href = "/login"; // Redirigir al login
    }
    return Promise.reject(error); // Retornar el error para ser manejado donde sea necesario
  }
);

export default api;
