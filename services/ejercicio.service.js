// services/ejercicio.service.js
import { obtenerTodosLosEjercicios } from "../repositories/ejercicio.repository.js";

export const leerTodosLosEjercicios = async () => {
    return await obtenerTodosLosEjercicios();
};