// api/habitsApi.ts
import axios from "axios";
import { Habit } from "../components/HabitsList";
import { getCurrentUser } from "../services/authService";

const API_URL = "http://localhost:8080/api/habitos";

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Interceptor para agregar token de autenticación si lo implementas después
api.interceptors.request.use((config) => {
  const user = getCurrentUser();
  if (user) {
    // Si luego implementas JWT, lo agregas aquí
    // config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const getHabits = async (): Promise<Habit[]> => {
  const response = await api.get("/habitos");
  return response.data;
};

export const createHabit = async (habit: Omit<Habit, 'id'>): Promise<Habit> => {
  const response = await api.post("/habitos", habit);
  return response.data;
};

export const updateHabit = async (id: number, habit: Partial<Habit>): Promise<Habit> => {
  const response = await api.put(`/habitos/${id}`, habit);
  return response.data;
};

export const deleteHabit = async (id: number): Promise<void> => {
  await api.delete(`/habitos/${id}`);
};

export const getHabitsByUser = async (userId: number): Promise<Habit[]> => {
  const response = await api.get(`/habitos/usuario/${userId}`);
  return response.data;
};