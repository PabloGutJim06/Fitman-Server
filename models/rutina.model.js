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
    colaboradores: z.array(z.object({
        usuario_id: z.string(),
        nombre: z.string(),
        email: z.string(),
        puede_editar: z.boolean().default(false),
    })).optional().default([]),
    colaboradores_ids: z.array(z.string()).optional().default([]),
});

export const rutinaUpdateSchema = z.object({
    rutina_nombre: z.string().min(1, { message: "El nombre no puede estar vacío" }).optional(),
    calorias: z.number().positive().optional(),
    duracion_total: z.number().nonnegative().optional(),
    ejercicios: z.array(ejercicioSchema).min(1, { message: "Si actualizas ejercicios, debe haber al menos uno" }).optional(),
});
