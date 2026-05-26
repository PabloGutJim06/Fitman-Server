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
import {
    crearRutina,
} from "../repositories/rutina.repository.js";


const _crearRutinaEjemplo = async (usuarioId) => {
    const rutina = {
        usuario_id: usuarioId,
        rutina_nombre: "Mi primera rutina",
        ejercicios: [
            {
                nombre: "Press Banca Plano",
                descripcion: "",
                series: 4,
                repeticiones: 10,
                duracion: 0,
                descanso_segundos: 0,
            },
            {
                nombre: "Descanso",
                duracion: 60,
                series: 0,
                repeticiones: 0,
                descanso_segundos: 0,
            },
            {
                nombre: "Sentadilla con Barra",
                descripcion: "",
                series: 4,
                repeticiones: 8,
                duracion: 0,
                descanso_segundos: 0,
            },
            {
                nombre: "Descanso",
                duracion: 90,
                series: 0,
                repeticiones: 0,
                descanso_segundos: 0,
            },
            {
                nombre: "Dominadas",
                descripcion: "",
                series: 3,
                repeticiones: 8,
                duracion: 0,
                descanso_segundos: 0,
            },
        ],
        calorias: 0,
        duracion_total: 150, // 60 + 90 segundos de descanso
        colaboradores: [],
        colaboradores_ids: [],
    };

    try {
        await crearRutina(rutina);
    } catch (e) {
        console.error("Error al crear rutina de ejemplo:", e.message);
    }
};

export const createUsuario = async (datosUsuario) => {
    const usuarioExistente = await buscarPorEmail(datosUsuario.email);
    if (usuarioExistente) {
        throw new ConflictError("El correo electrónico ya está registrado");
    }

    const hashedPassword = await bcrypt.hash(datosUsuario.password, 10);
    const usuarioConHash = { ...datosUsuario, password: hashedPassword };
    const id = await crearUsuario(usuarioConHash);

    await _crearRutinaEjemplo(id);

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
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "720d" });

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