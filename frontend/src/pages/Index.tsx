import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box, Card, CardContent, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { 
  FitnessCenter, 
  TrendingUp, 
  Group, 
  AccessTime,
  DirectionsRun, 
  LocalDrink, 
  Restaurant, 
  Bedtime 
} from "@mui/icons-material";

export default function Index() {
  const [currentQuote, setCurrentQuote] = useState(0);

  // Frases motivacionales rotativas
  const heroQuotes = [
    "Transforma tu vida un hábito a la vez 🚀",
    "Tu mejor proyecto eres tú 💪", 
    "Pequeños pasos, grandes cambios 🌟",
    "La consistencia es tu superpoder ⚡",
    "Hoy es el día para empezar 🌈"
  ];

  // Rotar frases cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % heroQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: 4,
          position: "relative"
        }}
      >
        <Container>
          <FitnessCenter 
            sx={{ 
              fontSize: 80, 
              mb: 3,
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
            }} 
          />
          
          <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
            Bienvenido a Salud & Fitness
          </Typography>
          
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              mb: 3,
              fontStyle: "italic",
              minHeight: "40px",
              transition: "opacity 0.5s ease-in-out"
            }}
          >
            {heroQuotes[currentQuote]}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
            Registra tus hábitos, haz seguimiento de tu progreso y alcanza tus metas de fitness.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mt: 4 }}>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{ 
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(255, 105, 135, .4)"
                },
                transition: "all 0.3s ease-in-out"
              }}
            >
              Empieza Gratis
            </Button>
            
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="large"
              sx={{ 
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transform: "translateY(-2px)"
                },
                transition: "all 0.3s ease-in-out"
              }}
            >
              Inicia Sesión
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
        <Container>
          <Typography 
            variant="h3" 
            component="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ fontWeight: "bold", mb: 6, color: "#2c3e50" }}
          >
            Por Qué Elegir Salud & Fitness
          </Typography>
          
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
            {/* Feature 1 */}
            <Card sx={{ width: "100%", maxWidth: "600px", p: 3, textAlign: "center" }}>
              <CardContent>
                <TrendingUp sx={{ fontSize: 50, color: "primary.main", mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  Seguimiento de Progreso
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Monitoriza tu evolución con métricas detalladas y lleva un registro de todos tus logros
                </Typography>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card sx={{ width: "100%", maxWidth: "600px", p: 3, textAlign: "center" }}>
              <CardContent>
                <Group sx={{ fontSize: 50, color: "primary.main", mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  Comunidad Motivadora
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Conecta con otros usuarios y comparte tus logros y desafíos en el camino fitness
                </Typography>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card sx={{ width: "100%", maxWidth: "600px", p: 3, textAlign: "center" }}>
              <CardContent>
                <AccessTime sx={{ fontSize: 50, color: "primary.main", mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  Recordatorios Inteligentes
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Nunca olvides un hábito con notificaciones inteligentes y recordatorios diarios
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* Popular Habits Section */}
      <Box sx={{ py: 8, background: "white" }}>
        <Container>
          <Typography 
            variant="h3" 
            component="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ fontWeight: "bold", mb: 2, color: "#2c3e50" }}
          >
            Hábitos Populares
          </Typography>
          
          <Typography 
            variant="h6" 
            textAlign="center" 
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Comienza con estos hábitos que transformarán tu rutina diaria
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center", mb: 6 }}>
            {/* Habit 1 */}
            <Card sx={{ width: "100%", maxWidth: "500px", p: 3, textAlign: "center" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 2 }}>
                  <DirectionsRun sx={{ fontSize: 40, color: "success.main" }} />
                  <Typography variant="h6" component="h3">
                    Ejercicio Diario
                  </Typography>
                </Box>
                <Chip label="ejercicio" color="success" variant="outlined" />
              </CardContent>
            </Card>

            {/* Habit 2 */}
            <Card sx={{ width: "100%", maxWidth: "500px", p: 3, textAlign: "center" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 2 }}>
                  <LocalDrink sx={{ fontSize: 40, color: "info.main" }} />
                  <Typography variant="h6" component="h3">
                    Hidratación
                  </Typography>
                </Box>
                <Chip label="hidratacion" color="info" variant="outlined" />
              </CardContent>
            </Card>

            {/* Habit 3 */}
            <Card sx={{ width: "100%", maxWidth: "500px", p: 3, textAlign: "center" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 2 }}>
                  <Restaurant sx={{ fontSize: 40, color: "warning.main" }} />
                  <Typography variant="h6" component="h3">
                    Alimentación Saludable
                  </Typography>
                </Box>
                <Chip label="nutricion" color="warning" variant="outlined" />
              </CardContent>
            </Card>

            {/* Habit 4 */}
            <Card sx={{ width: "100%", maxWidth: "500px", p: 3, textAlign: "center" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 2 }}>
                  <Bedtime sx={{ fontSize: 40, color: "secondary.main" }} />
                  <Typography variant="h6" component="h3">
                    Sueño de Calidad
                  </Typography>
                </Box>
                <Chip label="sueño" color="secondary" variant="outlined" />
              </CardContent>
            </Card>
          </Box>

          {/* Final CTA */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: "#2c3e50" }}>
              ¿Listo para Transformar Tus Hábitos?
            </Typography>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{ 
                px: 6,
                py: 2,
                fontSize: "1.2rem",
                background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)"
                },
                transition: "all 0.3s ease-in-out"
              }}
            >
              Crear Mi Cuenta Gratis
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ background: "#2c3e50", color: "white", py: 4, textAlign: "center" }}>
        <Container>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2024 Salud & Fitness. Transformando vidas a través de hábitos saludables.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}