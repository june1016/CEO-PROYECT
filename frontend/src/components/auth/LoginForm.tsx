import React, { useState } from "react";
import Cookies from "js-cookie";
import api from "@/utils/axiosInstance";
import { useRouter } from "next/navigation"; // Cambiado a useRouter de 'next/navigation'

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      // Enviar la solicitud de inicio de sesión al backend
      const response = await api.post("auth/login/", {
        username,
        password,
      });

      // Obtener el token de la respuesta
      const { access } = response.data;

      // Almacenar el token en las cookies
      Cookies.set("access_token", access, { expires: 1 }); // Expira en 1 día

      // Redirigir al usuario a la página de inicio
      router.push("/"); // Uso de router.push en lugar de window.location.href
    } catch (error: any) {
      // Manejar errores, por ejemplo credenciales incorrectas
      if (error.response && error.response.status === 401) {
        setErrorMessage("Nombre de usuario o contraseña incorrectos");
      } else {
        setErrorMessage(
          "Hubo un problema al iniciar sesión. Inténtalo de nuevo."
        );
      }
      console.error("Error al iniciar sesión", error);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default LoginForm;
