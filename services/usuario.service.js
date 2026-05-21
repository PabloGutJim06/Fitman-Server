// services/usuario.service.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    crearUsuario,
    obtenerUsuarioPorId,
    buscarPorEmail,
    actualizarUsuario,
} from "../repositories/usuario.repository.js"; 
import { ConflictError } from "../utils/errors.js";

export const createUsuario = async (datosUsuario) => {
    const usuarioExistente = await buscarPorEmail(datosUsuario.email);
    if (usuarioExistente) {
        throw new ConflictError("El correo electrónico ya está registrado");
    }

    const hashedPassword = await bcrypt.hash(datosUsuario.password, 10);

    const usuarioConHash = { ...datosUsuario, password: hashedPassword };
    const id = await crearUsuario(usuarioConHash);

    const { password, ...usuarioSinPassword } = usuarioConHash;
    return { id, ...usuarioSinPassword };
};

export const loginUsuario = async (email, password) => {
    const usuario = await buscarPorEmail(email);

    if (!usuario) {
        throw new Error("Credenciales inválidas");
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
        throw new Error("Credenciales inválidas");
    }

    const payload = { id: usuario.id, email: usuario.email };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "100d" });

    return {
        token,
        usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
    };
};

export const getUsuarioInfo = async (id) => {
    
    const usuario = await obtenerUsuarioPorId(id);
    const { password, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
};

export const updateUsuarioInfo = async (id, datosNuevos) => {
    await actualizarUsuario(id, datosNuevos);
    return { message: "Perfil actualizado correctamente" };
};