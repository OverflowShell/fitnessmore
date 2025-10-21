// src/App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getCurrentUser } from "./services/authService";

/**
 * Componente protegido que verifica autenticación
 * Mantiene la compatibilidad con React.createElement
 */
const ProtectedRoute: React.FC<{ 
  component: React.ComponentType<any>;
  props?: any;
}> = ({ component: Component, props = {} }) => {
  const user = getCurrentUser();
  return user ? React.createElement(Component as any, props) : <Navigate to="/login" />;
};

const App: React.FC = () => {
  // declarar explícitamente como any[] evita que TypeScript infiera never[]
  const [habits, setHabits] = useState<any[]>([]);
  const [metas, setMetas] = useState<any[]>([]);
  const [registros, setRegistros] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  // Verificar usuario al cargar la aplicación
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <Router>
      {/* Pasamos user y setUser al Navbar para manejar estado de autenticación */}
      <Navbar user={user} setUser={setUser} />
      
      <Routes>
        <Route path="/" element={<Index />} />

        {/* Ruta protegida - solo para usuarios autenticados */}
        <Route
          path="/home"
          element={
            <ProtectedRoute 
              component={Home} 
              props={{ habits, setHabits }}
            />
          }
        />

        {/* Ruta protegida - solo para usuarios autenticados */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute 
              component={Dashboard}
              props={{
                habits,
                metas,
                registros,
                setMetas,
                setRegistros,
              }}
            />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Redirección por defecto para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;