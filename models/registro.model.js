// models/registro.model.js
import { z } from "zod";

// Schema para validar el body del POST /api/registros
export const registroSchema = z.object({
    rutina_id: z.string().min(1, { message: "El ID de la rutina es obligatorio" }),
    rutina_nombre: z.string().min(1, { message: "El nombre de la rutina es obligatorio" }),
    num_ejercicios: z.number().int().positive({ message: "El número de ejercicios debe ser un entero positivo" }),
    notas: z.string().nullable().optional(), // opcional, puede ser null
});