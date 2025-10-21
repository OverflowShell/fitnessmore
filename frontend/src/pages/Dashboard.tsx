// src/pages/Dashboard.tsx
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
  EmojiEvents,
  CheckCircle,
  PlayArrow,
  Pending
} from "@mui/icons-material";
import MetaForm from "../components/MetaForm";
import MetasList, { Meta } from "../components/MetasList";

interface DashboardProps {
  metas: Meta[];
  setMetas: React.Dispatch<React.SetStateAction<Meta[]>>;
}

const API_METAS = "http://localhost:8080/api/metas";

const Dashboard: React.FC<DashboardProps> = ({ metas, setMetas }) => {
  // Cargar metas al montar el componente
  useEffect(() => {
    const cargarMetas = async () => {
      try {
        const response = await axios.get<Meta[]>(API_METAS);
        setMetas(response.data);
      } catch (error) {
        console.error("Error cargando metas:", error);
      }
    };
    cargarMetas();
  }, [setMetas]);

  const handleAddMeta = async (meta: Omit<Meta, 'id'>) => {
    try {
      const response = await axios.post<Meta>(API_METAS, meta);
      setMetas(prev => [...prev, response.data]);
    } catch (error) {
      console.error("Error creando meta:", error);
      // Fallback: agregar meta temporal con ID
      const tempMeta: Meta = {
        id: Date.now(),
        ...meta
      };
      setMetas(prev => [...prev, tempMeta]);
    }
  };

  const handleUpdateMeta = async (metaId: number, nuevoEstado: Meta['estado']) => {
    try {
      const metaActual = metas.find(m => m.id === metaId);
      if (!metaActual) return;

      const metaActualizada = { ...metaActual, estado: nuevoEstado };
      await axios.put(`${API_METAS}/${metaId}`, metaActualizada);
      
      setMetas(prev => 
        prev.map(meta => 
          meta.id === metaId ? { ...meta, estado: nuevoEstado } : meta
        )
      );
    } catch (error) {
      console.error("Error actualizando meta:", error);
    }
  };

  // Estadísticas
  const metasCompletadas = metas.filter(m => m.estado === 'COMPLETADA').length;
  const metasEnProgreso = metas.filter(m => m.estado === 'EN_PROGRESO').length;
  const metasPendientes = metas.filter(m => m.estado === 'PENDIENTE').length;

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header del Dashboard */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <EmojiEvents sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Mis Metas Fitness
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Define y gestiona tus objetivos para alcanzar el éxito
        </Typography>
      </Box>

      {/* Estadísticas Rápidas */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Resumen de Metas
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Chip 
            icon={<EmojiEvents />} 
            label={`Total: ${metas.length}`}
            color="primary"
            variant="filled"
          />
          <Chip 
            icon={<CheckCircle />} 
            label={`Completadas: ${metasCompletadas}`}
            color="success"
            variant="outlined"
          />
          <Chip 
            icon={<PlayArrow />} 
            label={`En Progreso: ${metasEnProgreso}`}
            color="warning"
            variant="outlined"
          />
          <Chip 
            icon={<Pending />} 
            label={`Pendientes: ${metasPendientes}`}
            color="default"
            variant="outlined"
          />
        </Box>
      </Card>

      {/* Contenedor Principal */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        
        {/* Sección del Formulario */}
        <Box sx={{ width: { xs: "100%", md: "35%" } }}>
          <Card sx={{ p: 2, position: "sticky", top: 20 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Crear Nueva Meta
            </Typography>
            <MetaForm onAddMeta={handleAddMeta} />
          </Card>
        </Box>

        {/* Sección de Lista de Metas */}
        <Box sx={{ width: { xs: "100%", md: "65%" } }}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Mis Metas ({metas.length})
            </Typography>
            {metas.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
                <EmojiEvents sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                <Typography variant="h6" gutterBottom>
                  ¡Comienza a definir tus metas!
                </Typography>
                <Typography variant="body2">
                  Crea tu primera meta para empezar a trackear tu progreso hacia tus objetivos
                </Typography>
              </Box>
            ) : (
              <MetasList metas={metas} onUpdateMeta={handleUpdateMeta} />
            )}
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;