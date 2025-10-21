// pages/Login.tsx
import { useState } from "react";
import { login, setCurrentUser, LoginData } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress
} from "@mui/material";
import { FitnessCenter } from "@mui/icons-material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      console.log("Intentando login con:", email);
      const credentials: LoginData = { email, password };
      const response = await login(credentials);
      
      console.log("Respuesta del login:", response);
      
      if (response.user) {
        setCurrentUser(response.user);
        alert("✅ Login exitoso");
        navigate("/home");
      } else {
        setError("Error inesperado en el login - no se recibió usuario");
      }
    } catch (err: any) {
      console.error("Error completo en login:", err);
      setError(err.message || "Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}
    >
      <Paper 
        elevation={8} 
        sx={{ 
          p: 4, 
          width: "100%", 
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.95)"
        }}
      >
        <Box textAlign="center" mb={3}>
          <FitnessCenter 
            sx={{ 
              fontSize: 48, 
              color: "primary.main",
              mb: 1
            }} 
          />
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Salud & Fitness
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Iniciar Sesión
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            disabled={loading}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            disabled={loading}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ 
              py: 1.5,
              mb: 2,
              borderRadius: 2
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Iniciar Sesión"}
          </Button>

          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              ¿No tienes cuenta?{" "}
              <Link 
                to="/register" 
                style={{ 
                  textDecoration: "none", 
                  color: "#1976d2",
                  fontWeight: "bold"
                }}
              >
                Regístrate aquí
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}