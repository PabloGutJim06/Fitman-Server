// services/rutina.service.js
import {
    crearRutina as guardarEnBD,
    obtenerRutinas as obtenerTodasLasRutinas,
    obtenerRutinaPorId,
    actualizarRutina as actualizarEnRepo,
    eliminarRutina as eliminarEnRepo,
    añadirColaborador,
    quitarColaborador,
} from "../repositories/rutina.repository.js";
import { buscarPorEmail } from "../repositories/usuario.repository.js";
import { NotFoundError, ConflictError, ForbiddenError } from "../utils/errors.js";

const calcularMetricas = (ejercicios) => {
    const duracion_total = ejercicios.reduce(
        (total, ejercicio) => total + (ejercicio.duracion ?? 0), 0
    );
    const calorias = Math.round(duracion_total * 0.15);
    return { duracion_total, calorias };
};

export const procesarYGuardar = async (rutinaData) => {
    const metricas = calcularMetricas(rutinaData.ejercicios);
    const rutinaConCalculos = { ...rutinaData, ...metricas };
    const idGenerado = await guardarEnBD(rutinaConCalculos);
    return { id: idGenerado, ...rutinaConCalculos };
};

export const leerTodasLasRutinas = async (userId) => {
    return await obtenerTodasLasRutinas(userId);
};

export const leerRutinaPorId = async (id) => {
    return await obtenerRutinaPorId(id);
};

export const actualizarRutina = async (id, rutinaData) => {
    if (rutinaData.ejercicios) {
        const metricas = calcularMetricas(rutinaData.ejercicios);
        rutinaData = { ...rutinaData, ...metricas };
    }
    return await actualizarEnRepo(id, rutinaData);
};

export const eliminarRutina = async (id) => {
    return await eliminarEnRepo(id);
};

export const agregarColaborador = async (rutinaId, emailColaborador, esCreador) => {
    // Solo el creador puede añadir colaboradores
    if (!esCreador) {
        throw new ForbiddenError("Solo el creador puede gestionar colaboradores");
    }

    // Buscar usuario por email — buscarPorEmail devuelve null si no existe
    const usuario = await buscarPorEmail(emailColaborador);
    if (!usuario) {
        throw new NotFoundError("No existe ningún usuario con ese email");
    }

    // El creador no puede ser colaborador de su propia rutina
    const rutina = await leerRutinaPorId(rutinaId);
    if (rutina.usuario_id === usuario.id) {
        throw new ConflictError("El creador no puede ser colaborador de su propia rutina");
    }

    // Idempotencia — no añadir si ya es colaborador
    const yaEsColaborador = (rutina.colaboradores_ids ?? []).includes(usuario.id);
    if (yaEsColaborador) {
        throw new ConflictError("Este usuario ya es colaborador");
    }

    const colaborador = {
        usuario_id: usuario.id,
        nombre: usuario.nombre,     
        email: usuario.email,
        puede_editar: false,        
    };

    await añadirColaborador(rutinaId, colaborador);
    return colaborador;
};

export const eliminarColaborador = async (rutinaId, colaboradorId, solicitanteId) => {
    const rutina = await leerRutinaPorId(rutinaId);

    if (rutina.usuario_id !== solicitanteId) {
        throw new ForbiddenError("Solo el creador puede quitar colaboradores");
    }

    await quitarColaborador(rutinaId, colaboradorId);
    return true;
};