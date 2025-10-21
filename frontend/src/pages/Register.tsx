import { useState } from "react";
import { register, RegisterData } from "../services/authService";
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
import { PersonAdd } from "@mui/icons-material";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    if (!nombre || !email || !password) {
      setError("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      const userData: RegisterData = { nombre, email, password };
      const response = await register(userData);
      
      alert("✅ Usuario registrado con éxito");
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Error al registrar usuario");
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
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
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
          <PersonAdd 
            sx={{ 
              fontSize: 48, 
              color: "primary.main",
              mb: 1
            }} 
          />
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Crear Cuenta
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Únete a Salud & Fitness
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            margin="normal"
            required
            disabled={loading}
            sx={{ mb: 2 }}
          />
          
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
            label="Contraseña (mínimo 6 caracteres)"
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
              borderRadius: 2,
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Registrarse"}
          </Button>

          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              ¿Ya tienes cuenta?{" "}
              <Link 
                to="/login" 
                style={{ 
                  textDecoration: "none", 
                  color: "#1976d2",
                  fontWeight: "bold"
                }}
              >
                Inicia sesión aquí
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}