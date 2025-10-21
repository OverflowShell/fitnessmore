// services/authService.ts
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export interface User {
  id: number;
  nombre: string;
  email: string;
  edad?: number;
  peso?: number;
  altura?: number;
  fechaRegistro?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface RegisterData {
  nombre: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Registrar usuario - MEJOR MANEJO DE ERRORES
export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      timeout: 5000, // 5 segundos timeout
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error completo en register:', error);
    
    if (error.code === 'ECONNREFUSED') {
      throw new Error('El servidor no está disponible. Verifica que el backend esté ejecutándose en puerto 8080.');
    }
    
    if (error.response) {
      // El servidor respondió con un error
      const errorMessage = error.response.data?.error || error.response.data?.message || 'Error del servidor';
      throw new Error(errorMessage);
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      throw new Error('No se pudo conectar con el servidor. Verifica que esté ejecutándose.');
    } else {
      // Algo pasó en la configuración de la petición
      throw new Error('Error en la configuración de la petición');
    }
  }
};

// Login de usuario - MEJOR MANEJO DE ERRORES
export const login = async (credentials: LoginData): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error completo en login:', error);
    
    if (error.code === 'ECONNREFUSED') {
      throw new Error('El servidor no está disponible.');
    }
    
    if (error.response) {
      const errorMessage = error.response.data?.error || error.response.data?.message || 'Error de credenciales';
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error('No se pudo conectar con el servidor.');
    } else {
      throw new Error('Error en la configuración de la petición');
    }
  }
};

// Obtener usuario actual desde localStorage
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Guardar usuario en localStorage
export const setCurrentUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Cerrar sesión
export const logout = (): void => {
  localStorage.removeItem('user');
};