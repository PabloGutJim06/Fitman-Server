// models/usuario.model.js
import { z } from "zod";

export const usuarioSchema = z.object({
    id: z.string().optional(),
    nombre: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("El email no es válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    edad: z.number().int().positive("La edad debe ser un número entero positivo").optional(),
    peso_actual: z.number().positive("El peso actual debe ser un número positivo").optional(),
    altura: z.number().positive("La altura debe ser un número positivo").optional(),
    fecha_registro: z.coerce.date().default(() => new Date()),
    objetivo: z.enum(["perder peso", "ganar músculo", "mantener peso"]).optional(),
    nivel: z.enum(["principiante", "intermedio", "avanzado", "culturista"]).optional(),
});

export const usuarioUpdateSchema = z.object({
    nombre: z.string().min(1, "El nombre no puede estar vacío").optional(),
    edad: z.number().int().positive("La edad debe ser un número entero positivo").optional(),
    peso_actual: z.number().positive("El peso actual debe ser un número positivo").optional(),
    altura: z.number().positive("La altura debe ser un número positivo").optional(),
    objetivo: z.enum(["perder peso", "ganar músculo", "mantener peso"]).optional(),
    nivel: z.enum(["principiante", "intermedio", "avanzado", "culturista"]).optional(),
});
