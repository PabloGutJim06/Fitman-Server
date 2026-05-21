// models/ejercicio.model.js
import { z } from "zod";

export const ejercicioGlobalSchema = z.object({
    nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
    descripcion: z.string().min(1, { message: "La descripción es obligatoria" }),
    grupo_muscular: z.enum([
        "pecho", "espalda", "piernas", "hombros",
        "brazos", "core", "cardio", "gluteos"
    ], { message: "Grupo muscular no válido" }),
    nivel_dificultad: z.enum([
        "principiante", "intermedio", "avanzado"
    ]).optional(),
});