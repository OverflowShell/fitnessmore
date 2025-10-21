// src/components/MetasList.tsx
import React from "react";
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip,
  Button 
} from "@mui/material";
import { 
  CheckCircle, 
  PlayArrow, 
  Pending,
  CalendarToday 
} from "@mui/icons-material";

export interface Meta {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  estado: "PENDIENTE" | "EN_PROGRESO" | "COMPLETADA";
  usuario?: {
    id: number;
    nombre: string;
  };
}

interface Props {
  metas: Meta[];
  onUpdateMeta?: (id: number, nuevoEstado: Meta['estado']) => void;
}

const MetasList: React.FC<Props> = ({ metas, onUpdateMeta }) => {
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'COMPLETADA': return 'success';
      case 'EN_PROGRESO': return 'warning';
      case 'PENDIENTE': return 'default';
      default: return 'default';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'COMPLETADA': return <CheckCircle />;
      case 'EN_PROGRESO': return <PlayArrow />;
      case 'PENDIENTE': return <Pending />;
      default: return <Pending />;
    }
  };

  const calcularProgreso = (fechaInicio: string, fechaFin: string) => {
    const inicio = new Date(fechaInicio).getTime();
    const fin = new Date(fechaFin).getTime();
    const hoy = new Date().getTime();
    
    if (hoy < inicio) return 0;
    if (hoy > fin) return 100;
    
    const total = fin - inicio;
    const transcurrido = hoy - inicio;
    return Math.round((transcurrido / total) * 100);
  };

  return (
    <Box
      component="section"
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}
      aria-label="lista-de-metas"
    >
      {metas.map((meta) => {
        const progreso = calcularProgreso(meta.fechaInicio, meta.fechaFin);
        const estaVencida = new Date(meta.fechaFin) < new Date() && meta.estado !== 'COMPLETADA';
        
        return (
          <Card 
            key={meta.id} 
            sx={{ 
              boxShadow: 3, 
              borderLeft: `4px solid ${
                meta.estado === 'COMPLETADA' ? '#4CAF50' : 
                meta.estado === 'EN_PROGRESO' ? '#FF9800' : 
                estaVencida ? '#f44336' : '#9E9E9E'
              }`
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                <Typography variant="h6" component="h3">
                  {meta.nombre}
                </Typography>
                <Chip 
                  icon={getEstadoIcon(meta.estado)}
                  label={meta.estado.replace('_', ' ')}
                  color={getEstadoColor(meta.estado)}
                  size="small"
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {meta.descripcion || "—"}
              </Typography>
              
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  <CalendarToday sx={{ fontSize: 16, verticalAlign: "middle", mr: 0.5 }} />
                  {new Date(meta.fechaInicio).toLocaleDateString()} - {new Date(meta.fechaFin).toLocaleDateString()}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color={
                    progreso === 100 ? "success.main" :
                    progreso > 50 ? "warning.main" : "primary.main"
                  }
                  fontWeight="bold"
                >
                  {progreso}% completado
                </Typography>
              </Box>
              
              {/* Barra de progreso */}
              <Box sx={{ width: "100%", height: 6, bgcolor: "grey.200", borderRadius: 3, overflow: "hidden", mb: 2 }}>
                <Box 
                  sx={{ 
                    height: "100%", 
                    bgcolor: 
                      meta.estado === 'COMPLETADA' ? "success.main" :
                      estaVencida ? "error.main" : "primary.main",
                    width: `${progreso}%`,
                    transition: "width 0.3s ease-in-out"
                  }} 
                />
              </Box>
              
              {/* Botones de acción */}
              {onUpdateMeta && (
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {meta.estado === 'PENDIENTE' && (
                    <Button 
                      size="small" 
                      variant="outlined" 
                      color="warning"
                      onClick={() => onUpdateMeta(meta.id, 'EN_PROGRESO')}
                    >
                      Iniciar
                    </Button>
                  )}
                  
                  {meta.estado === 'EN_PROGRESO' && (
                    <Button 
                      size="small" 
                      variant="outlined" 
                      color="success"
                      onClick={() => onUpdateMeta(meta.id, 'COMPLETADA')}
                    >
                      Completar
                    </Button>
                  )}
                  
                  {(meta.estado === 'PENDIENTE' || meta.estado === 'EN_PROGRESO') && (
                    <Button 
                      size="small" 
                      variant="outlined" 
                      color="primary"
                      onClick={() => onUpdateMeta(meta.id, 'PENDIENTE')}
                    >
                      Reiniciar
                    </Button>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default MetasList;