import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Avatar
} from "@mui/material";
import { FitnessCenter, Logout } from "@mui/icons-material";
import { logout, getCurrentUser } from "../services/authService";

interface NavbarProps {
  user?: any;
  setUser?: (user: any) => void;
}

export default function Navbar({ user, setUser }: NavbarProps) {
  const navigate = useNavigate();
  const currentUser = user || getCurrentUser();

  const handleLogout = () => {
    logout();
    if (setUser) setUser(null);
    navigate("/");
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: "linear-gradient(45deg, #3f51b5, #2196f3)",
        boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)"
      }}
    >
      <Toolbar>
        <FitnessCenter sx={{ mr: 2 }} />
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: "bold",
            fontFamily: "'Roboto', sans-serif"
          }}
        >
          Salud & Fitness
        </Typography>
        
        <Box>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{ mx: 1 }}
          >
            Inicio
          </Button>

          {/* Mostrar estas opciones solo si el usuario está autenticado */}
          {currentUser ? (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/home"
                sx={{ mx: 1 }}
              >
                Mis Hábitos
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/dashboard"
                sx={{ mx: 1 }}
              >
                Dashboard
              </Button>
              
              <Avatar 
                sx={{ 
                  mx: 2, 
                  bgcolor: "secondary.main",
                  width: 32,
                  height: 32,
                  fontSize: '0.875rem'
                }}
              >
                {currentUser.nombre?.charAt(0) || 'U'}
              </Avatar>
              
              <Button 
                color="inherit" 
                onClick={handleLogout}
                startIcon={<Logout />}
                sx={{ mx: 1 }}
              >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                sx={{ mx: 1 }}
              >
                Iniciar Sesión
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/register"
                sx={{ 
                  mx: 1,
                  border: "1px solid white"
                }}
              >
                Registrarse
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}