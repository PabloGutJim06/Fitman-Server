// models/usuario.model.js
import { z } from "zod";

export const usuarioSchema = z.object({
    id: z.string().optional(),
    nombre: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("El email no es válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    edad: z.number().int().positive("La edad debe ser un número entero positivo"),
    peso_actual: z.number().positive("El peso actual debe ser un número positivo"),
    // Usamos z.coerce.date() que convierte "2024-01-01" → new Date() automáticamente.
    // El default asegura que si el cliente no envía fecha, se pone la actual.
    fecha_registro: z.coerce.date().default(() => new Date()),
    objetivo: z.enum(["perder peso", "ganar músculo", "mantener peso"]).optional(),
});

// Schema para PATCH /me — solo los campos que un usuario puede actualizar sobre sí mismo.
// Extraído aquí para que el controller no tenga lógica de validación inline.
// Nota: email separado intencionalmente — cambiar email requiere
// verificar que no esté en uso, lo que es responsabilidad del service, no del schema.
export const usuarioUpdateSchema = z.object({
    nombre: z.string().min(1, "El nombre no puede estar vacío").optional(),
    edad: z.number().int().positive("La edad debe ser un número entero positivo").optional(),
    peso_actual: z.number().positive("El peso actual debe ser un número positivo").optional(),
    objetivo: z.enum(["perder peso", "ganar músculo", "mantener peso"]).optional(),
});
