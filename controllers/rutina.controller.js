// controllers/rutina.controller.js
import { rutinaSchema, rutinaUpdateSchema } from "../models/rutina.model.js";
import {
    procesarYGuardar,
    leerTodasLasRutinas,
    leerRutinaPorId,
    actualizarRutina,
    eliminarRutina,
} from "../services/rutina.service.js";

export const createRutina = async (req, res, next) => {
    try {
        const usuario_id = req.user.id;
        const rutinaConUsuario = { ...req.body, usuario_id };

        const validacion = rutinaSchema.safeParse(rutinaConUsuario);
        if (!validacion.success) {
            return res.status(400).json({
                error: "Datos de rutina no válidos",
                detalles: validacion.error.errors,
            });
        }

        const rutinaGuardada = await procesarYGuardar(validacion.data);
        res.status(201).json({
            message: "Rutina creada exitosamente",
            rutina: rutinaGuardada,
        });
    } catch (error) {
        next(error); 
    }
};

export const getRutinas = async (req, res, next) => {
    try {
        const usuario_id = req.user.id;
        const rutinas = await leerTodasLasRutinas(usuario_id);
        res.status(200).json(rutinas);
    } catch (error) {
        next(error);
    }
};

export const getRutinaPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const rutina = await leerRutinaPorId(id);

        // IDOR check: la rutina existe pero no es de este usuario
        if (rutina.usuario_id !== req.user.id) {
            return res.status(403).json({ error: "No tienes permiso para ver esta rutina" });
        }

        res.status(200).json(rutina);
    } catch (error) {
        next(error);
    }
};

export const patchRutina = async (req, res, next) => {
    try {
        const { id } = req.params;

        const validacion = rutinaUpdateSchema.safeParse(req.body);
        if (!validacion.success) {
            return res.status(400).json({
                error: "Datos no válidos",
                detalles: validacion.error.errors,
            });
        }

        const rutinaExistente = await leerRutinaPorId(id);
        if (rutinaExistente.usuario_id !== req.user.id) {
            return res.status(403).json({ error: "No tienes permiso para modificar esta rutina" });
        }

        await actualizarRutina(id, validacion.data);
        res.status(200).json({ message: "Rutina actualizada exitosamente" });
    } catch (error) {
        next(error);
    }
};

export const deleteRutina = async (req, res, next) => {
    try {
        const { id } = req.params;

        const rutinaExistente = await leerRutinaPorId(id);
        if (rutinaExistente.usuario_id !== req.user.id) {
            return res.status(403).json({ error: "No tienes permiso para eliminar esta rutina" });
        }

        await eliminarRutina(id);
        res.status(200).json({ message: "Rutina eliminada exitosamente" });
    } catch (error) {
        next(error);
    }
};