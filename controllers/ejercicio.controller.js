// controllers/ejercicio.controller.js
import { leerTodosLosEjercicios } from "../services/ejercicio.service.js";

export const getEjercicios = async (req, res, next) => {
    try {
        const ejercicios = await leerTodosLosEjercicios();
        res.status(200).json(ejercicios);
    } catch (error) {
        next(error);
    }
};