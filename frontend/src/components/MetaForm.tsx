// src/components/MetaForm.tsx
import React, { useState } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Meta } from "./MetasList";

interface MetaFormProps {
  onAddMeta: (meta: Omit<Meta, 'id'>) => void;
}

const MetaForm: React.FC<MetaFormProps> = ({ onAddMeta }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [estado, setEstado] = useState("PENDIENTE");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !fechaInicio || !fechaFin) return;
    
    const newMeta: Omit<Meta, 'id'> = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      fechaInicio,
      fechaFin,
      estado: estado as "PENDIENTE" | "EN_PROGRESO" | "COMPLETADA",
    };
    
    onAddMeta(newMeta);
    setNombre("");
    setDescripcion("");
    setFechaInicio("");
    setFechaFin("");
    setEstado("PENDIENTE");
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{ 
        mb: 3, 
        p: 2, 
        borderRadius: 2, 
        boxShadow: 1, 
        backgroundColor: "background.paper" 
      }}
    >
      <TextField
        label="Nombre de la meta"
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
        multiline
        rows={3}
      />
      
      <TextField
        label="Fecha de inicio"
        type="date"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: today }}
      />
      
      <TextField
        label="Fecha de fin"
        type="date"
        value={fechaFin}
        onChange={(e) => setFechaFin(e.target.value)}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: fechaInicio || today }}
      />
      
      <TextField
        select
        label="Estado"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="PENDIENTE">Pendiente</MenuItem>
        <MenuItem value="EN_PROGRESO">En Progreso</MenuItem>
        <MenuItem value="COMPLETADA">Completada</MenuItem>
      </TextField>
      
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button type="submit" variant="contained" size="large">
          Crear Meta
        </Button>
      </Box>
    </Box>
  );
};

export default MetaForm;