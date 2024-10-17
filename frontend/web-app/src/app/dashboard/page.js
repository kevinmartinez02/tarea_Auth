'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  // Estado para manejar los datos del usuario
  const [userInfo, setUserInfo] = useState(null);

  // Función para obtener la información del usuario
  const handleGetUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/get-user', {
        credentials: 'include', // Para incluir las cookies en la solicitud
      });
      const data = await response.json();
      setUserInfo(data); // Se asume que 'data' contiene user_name, email, password y role
    } catch (error) {
      console.error("Error obteniendo la información del usuario:", error);
    }
  };

  // Función para hacer logout
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/authUser/logout', {
        method: 'POST',
        credentials: 'include', // Para asegurarse de que las cookies se eliminen
      });
      router.push('/login'); // Redirige al usuario a la página de login tras el logout
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Panel de Usuario</h1>

      <div style={styles.actionButtons}>
        <button style={styles.button} onClick={handleGetUserInfo}>Obtener Información del Usuario</button>
        <button style={styles.button} onClick={handleLogout}>Cerrar Sesión</button>
      </div>

      {/* Mostrar información del usuario si está disponible */}
      {userInfo && (
        <div style={styles.userInfo}>
          <h2>Información del Usuario:</h2>
          <div style={styles.infoBox}>
            <p><strong>Nombre de usuario:</strong> <span style={styles.infoText}>{userInfo.user_name}</span></p>
            <p><strong>Email:</strong> <span style={styles.infoText}>{userInfo.email}</span></p>
            
            <p><strong>Rol:</strong> <span style={styles.infoText}>{userInfo.role}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

// Estilos en línea
const styles = {
  container: {
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f6f9',
    minHeight: '100vh',
  },
  title: {
    fontSize: '28px',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '30px',
  },
  actionButtons: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '16px',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
  },
  userInfo: {
    marginTop: '40px',
    backgroundColor: '#ecf0f1',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '500px',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  infoBox: {
    backgroundColor: '#34495e', // Fondo oscuro para mejor contraste
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    color: '#ffffff', // Texto blanco para contraste
  },
  infoText: {
    fontSize: '16px',
    color: '#ecf0f1', // Texto ligeramente más claro que el fondo oscuro
    margin: '10px 0',
  },
};
