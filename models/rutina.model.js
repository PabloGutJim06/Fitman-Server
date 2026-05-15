// models/rutina.model.js
import { z } from "zod";

export const ejercicioSchema = z.object({
    id: z.string().optional(),
    nombre: z.string().min(1, { message: "El nombre no puede estar vacío" }),
    descripcion: z.string().min(1, { message: "La descripción no puede estar vacía" }).optional(),
    duracion: z.number().nonnegative({ message: "La duración debe ser 0 o positivo" }).optional(),
    series: z.number().int().nonnegative().optional(),
    repeticiones: z.number().int().nonnegative().optional(),
    descanso_segundos: z.number().int().nonnegative().optional(),
});

export const rutinaSchema = z.object({
    id: z.string().optional(),
    usuario_id: z.string({ message: "El id del usuario es obligatorio" }),
    rutina_nombre: z.string().min(1, { message: "El nombre de la rutina no puede estar vacío" }),
    calorias: z.number().positive().optional(),
    duracion_total: z.number().nonnegative().optional(),
    ejercicios: z.array(ejercicioSchema).min(1, { message: "La rutina debe contener al menos un ejercicio" }),
});

export const rutinaUpdateSchema = z.object({
    rutina_nombre: z.string().min(1, { message: "El nombre no puede estar vacío" }).optional(),
    calorias: z.number().positive().optional(),
    duracion_total: z.number().nonnegative().optional(),
    // Si se envían ejercicios en el PATCH, siguen necesitando al menos uno
    ejercicios: z.array(ejercicioSchema).min(1, { message: "Si actualizas ejercicios, debe haber al menos uno" }).optional(),
});
// Nota: usuario_id e id nunca se permiten actualizar desde el cliente — no están en este schema