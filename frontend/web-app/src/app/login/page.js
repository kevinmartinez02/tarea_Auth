'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
export default function LoginPage() {
  // Estado para los datos
  const router = useRouter();
  const [data, setData] = useState({});

  // Función para manejar el envío del formulario
  async function onSubmit(event) {
    event.preventDefault();
    // Crear el FormData a partir del formulario
    const formData = new FormData(event.target);

    // Convertir FormData a objeto simple
    const jsonData = Object.fromEntries(formData.entries());

    // Actualizar el estado con los datos del formulario
    setData(jsonData);

    // Hacer la solicitud fetch con credentials: 'include' para enviar/recibir cookies
    const response = await fetch('http://localhost:5000/api/authUser/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData), // Enviar los datos como JSON
      credentials: 'include',  // Esto asegura que las cookies se envíen y reciban
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Usuario autenticado:', result);
      router.push("/dashboard");

    } else {
      console.error('Error en la solicitud:', response.statusText);
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={onSubmit} style={styles.form}>
        <h2 style={styles.title}>Inicio de Sesión</h2>
        <input type="text" name="user_name" placeholder="Nombre de usuario" required style={styles.input} />
        <input type="password" name="password" placeholder="Contraseña" required style={styles.input} />
        <button type="submit" style={styles.button}>Iniciar sesión</button>
      </form>
    </div>
  );
}

// Estilos en línea
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333333',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #cccccc',
    fontSize: '16px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#ffffff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};
