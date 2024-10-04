import React, { useState } from "react";
import api from "@/utils/axiosInstance";
import { useRouter } from "next/navigation"; // Para manejar la redirección tras el registro

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      // Enviar la solicitud de registro al backend
      const response = await api.post("auth/register/", {
        username,
        password,
        email,
      });

      // Mostrar mensaje de éxito y redirigir al usuario
      setSuccessMessage("Registro exitoso, redirigiendo al login...");
      setTimeout(() => {
        router.push("/login"); // Redirigir al login después de registrarse
      }, 2000);
    } catch (error: any) {
      // Manejar errores
      if (error.response) {
        setErrorMessage(error.response.data.message || "Error al registrarse");
      } else {
        setErrorMessage("Hubo un problema, intenta de nuevo.");
      }
    }
  };

  return (
    <div>
      <h2>Registrar Cuenta</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
};

export default RegisterForm;
