// components/HabitForm.tsx
import React, { useState } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Habit } from "./HabitsList";

interface HabitFormProps {
  onAddHabit: (habit: Omit<Habit, 'id'>) => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ onAddHabit }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [unidad, setUnidad] = useState("");
  const [objetivo, setObjetivo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    
    const newHabit: Omit<Habit, 'id'> = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      categoria: categoria || undefined,
      unidad: unidad || undefined,
      objetivo: objetivo ? parseFloat(objetivo) : undefined,
    };
    
    onAddHabit(newHabit);
    setNombre("");
    setDescripcion("");
    setCategoria("");
    setUnidad("");
    setObjetivo("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, p: 2, borderRadius: 2, boxShadow: 1, backgroundColor: "background.paper" }}>
      <TextField
        label="Nombre del hábito"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="">Seleccionar categoría</MenuItem>
        <MenuItem value="ejercicio">Ejercicio</MenuItem>
        <MenuItem value="nutricion">Nutrición</MenuItem>
        <MenuItem value="sueño">Sueño</MenuItem>
        <MenuItem value="hidratacion">Hidratación</MenuItem>
        <MenuItem value="mental">Salud Mental</MenuItem>
      </TextField>
      <TextField
        label="Unidad (opcional)"
        value={unidad}
        onChange={(e) => setUnidad(e.target.value)}
        fullWidth
        margin="normal"
        placeholder="ej: ml, minutos, pasos"
      />
      <TextField
        label="Objetivo (opcional)"
        type="number"
        value={objetivo}
        onChange={(e) => setObjetivo(e.target.value)}
        fullWidth
        margin="normal"
        placeholder="ej: 2000, 30, 10000"
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <Button type="submit" variant="contained">
          Agregar Hábito
        </Button>
      </Box>
    </Box>
  );
};

export default HabitForm;