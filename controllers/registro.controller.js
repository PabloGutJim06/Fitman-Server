// controllers/registro.controller.js
import { registroSchema } from "../models/registro.model.js";
import {
    guardarRegistro,
    leerRegistrosDeUsuario,
    leerResumenDeUsuario,
} from "../services/registro.service.js";

export const createRegistro = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const validacion = registroSchema.safeParse(req.body);
        if (!validacion.success) {
            return res.status(400).json({
                error: "Datos del registro no válidos",
                detalles: validacion.error.errors,
            });
        }

        const registroGuardado = await guardarRegistro(userId, validacion.data);
        res.status(201).json({
            message: "Registro creado exitosamente",
            registro: registroGuardado,
        });
    } catch (error) {
        next(error);
    }
};

export const getRegistros = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const registros = await leerRegistrosDeUsuario(userId);
        res.status(200).json(registros);
    } catch (error) {
        next(error);
    }
};

export const getResumen = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const resumen = await leerResumenDeUsuario(userId);
        res.status(200).json(resumen);
    } catch (error) {
        next(error);
    }
};