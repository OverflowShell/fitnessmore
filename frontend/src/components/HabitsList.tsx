// components/HabitsList.tsx
import React from "react";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";

export interface Habit {
  id: number;
  nombre: string;
  descripcion: string;
  categoria?: string;
  unidad?: string;
  objetivo?: number;
  usuario?: {
    id: number;
    nombre: string;
  };
}

interface Props {
  habits: Habit[];
}

const HabitsList: React.FC<Props> = ({ habits }) => {
  return (
    <Box
      component="section"
      sx={{
        mt: 3,
        display: "grid",
        gap: 2,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
      }}
      aria-label="lista-de-habitos"
    >
      {habits.map((habit) => (
        <Card key={habit.id} sx={{ boxShadow: 3, minHeight: 120 }}>
          <CardContent>
            <Typography variant="h6" component="h3">
              {habit.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {habit.descripcion || "—"}
            </Typography>
            {habit.categoria && (
              <Chip 
                label={habit.categoria} 
                size="small" 
                sx={{ mt: 1 }} 
                color="primary"
                variant="outlined"
              />
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default HabitsList;