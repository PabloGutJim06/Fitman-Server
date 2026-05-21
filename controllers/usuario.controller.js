// controllers/usuario.controller.js
import { usuarioSchema, usuarioUpdateSchema } from "../models/usuario.model.js";
import {
    createUsuario,
    loginUsuario,
    getUsuarioInfo,
    updateUsuarioInfo,
} from "../services/usuario.service.js"; 

export const createUsuarioController = async (req, res, next) => { 
    try {
        const validacion = usuarioSchema.safeParse(req.body);
        if (!validacion.success) {
            return res.status(400).json({
                error: "Datos de usuario no válidos",
                detalles: validacion.error.errors,
            });
        }
        const usuarioCreado = await createUsuario(validacion.data);
        res.status(201).json(usuarioCreado);
    } catch (error) {
        next(error); 
    }
};

export const login = async (req, res, next) => { 
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email y contraseña son requeridos" });
        }
        const resultadoLogin = await loginUsuario(email, password);
        res.status(200).json({ message: "Login exitoso", ...resultadoLogin });
    } catch (error) {
        // "Credenciales inválidas"
        res.status(401).json({ error: error.message });
    }
};

export const getPerfil = async (req, res, next) => { 
    try {
        const usuarioId = req.user.id;
        const usuario = await getUsuarioInfo(usuarioId);
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
};

export const patchPerfil = async (req, res, next) => {
    try {
        const usuarioId = req.user.id;

        const validacion = usuarioUpdateSchema.safeParse(req.body);
        if (!validacion.success) {
            return res.status(400).json({
                error: "Datos no válidos para actualizar",
                detalles: validacion.error.errors,
            });
        }

        const resultado = await updateUsuarioInfo(usuarioId, validacion.data);
        res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
};