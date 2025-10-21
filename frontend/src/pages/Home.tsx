// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Container, 
  Typography, 
  Box,
  Card,
  CardContent,
  Chip
} from "@mui/material";
import { 
  FitnessCenter, 
  DirectionsRun, 
  LocalDrink, 
  Bedtime, 
  Restaurant 
} from "@mui/icons-material";
import HabitForm from "../components/HabitForm";
import HabitsList, { Habit } from "../components/HabitsList";

interface HomeProps {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

const API = "http://localhost:8080/api/habitos";

// Frases motivacionales de fitness
const fitnessQuotes = [
  "💪 El éxito se construye hábito a hábito",
  "🔥 Cada día es una nueva oportunidad para ser mejor",
  "🌟 La disciplina es el puente entre metas y logros",
  "🚀 Pequeños hábitos, grandes resultados",
  "🌈 Tu cuerpo puede hacerlo, es tu mente la que necesitas convencer"
];

const Home: React.FC<HomeProps> = ({ habits, setHabits }) => {
  const [currentQuote, setCurrentQuote] = useState(0);

  // Si no hay hábitos cargados en el estado padre, los traemos del backend
  useEffect(() => {
    const load = async () => {
      try {
        // Solo cargar si el array está vacío
        if (!habits || habits.length === 0) {
          const res = await axios.get<Habit[]>(API);
          setHabits(res.data || []);
        }
      } catch (err) {
        console.error("Error cargando hábitos:", err);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rotar frases cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % fitnessQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // CORREGIDO: Ahora recibe Omit<Habit, 'id'> en lugar de Habit
  const handleAddHabit = async (habit: Omit<Habit, 'id'>) => {
    try {
      const body = {
        nombre: habit.nombre,
        descripcion: habit.descripcion,
        categoria: habit.categoria,
        unidad: habit.unidad,
        objetivo: habit.objetivo,
      };
      const res = await axios.post<Habit>(API, body);
      // usar la respuesta del backend (con id real de BD)
      setHabits((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error guardando hábito en backend, agregando localmente:", err);
      // fallback: crear un hábito temporal con ID
      const tempHabit: Habit = {
        id: Date.now(), // ID temporal
        ...habit
      };
      setHabits((prev) => [...prev, tempHabit]);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header Motivacional */}
      <Box 
        sx={{ 
          textAlign: "center", 
          mb: 4,
          p: 3,
          borderRadius: 2,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white"
        }}
      >
        <FitnessCenter sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Mis Hábitos Fitness
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            fontStyle: "italic",
            opacity: 0.9,
            minHeight: "32px"
          }}
        >
          {fitnessQuotes[currentQuote]}
        </Typography>
      </Box>

      {/* Sección de Estadísticas Rápidas */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Resumen de Hábitos
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Chip 
            icon={<DirectionsRun />} 
            label={`Ejercicio: ${habits.filter(h => h.categoria === 'ejercicio').length}`}
            color="success"
            variant="outlined"
          />
          <Chip 
            icon={<Restaurant />} 
            label={`Nutrición: ${habits.filter(h => h.categoria === 'nutricion').length}`}
            color="warning"
            variant="outlined"
          />
          <Chip 
            icon={<LocalDrink />} 
            label={`Hidratación: ${habits.filter(h => h.categoria === 'hidratacion').length}`}
            color="info"
            variant="outlined"
          />
          <Chip 
            icon={<Bedtime />} 
            label={`Sueño: ${habits.filter(h => h.categoria === 'sueño').length}`}
            color="secondary"
            variant="outlined"
          />
          <Chip 
            label={`Total: ${habits.length}`}
            color="primary"
            variant="filled"
          />
        </Box>
      </Card>

      {/* Contenedor Principal - Layout con Flexbox */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        
        {/* Sección del Formulario */}
        <Box sx={{ width: { xs: "100%", md: "35%" } }}>
          <Card sx={{ p: 2, position: "sticky", top: 20 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Agregar Nuevo Hábito
            </Typography>
            <HabitForm onAddHabit={handleAddHabit} />
          </Card>
        </Box>

        {/* Sección de Lista de Hábitos */}
        <Box sx={{ width: { xs: "100%", md: "65%" } }}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Mis Hábitos ({habits.length})
            </Typography>
            {habits.length === 0 ? (
              <Box 
                sx={{ 
                  textAlign: "center", 
                  py: 4,
                  color: "text.secondary"
                }}
              >
                <FitnessCenter sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                <Typography variant="h6" gutterBottom>
                  ¡Comienza tu journey fitness!
                </Typography>
                <Typography variant="body2">
                  Agrega tu primer hábito para empezar a trackear tu progreso
                </Typography>
              </Box>
            ) : (
              <HabitsList habits={habits} />
            )}
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;