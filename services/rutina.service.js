// services/rutina.service.js
import {
    crearRutina as guardarEnBD,
    obtenerRutinas as obtenerTodasLasRutinas,
    obtenerRutinaPorId,
    actualizarRutina as actualizarEnRepo,
    eliminarRutina as eliminarEnRepo,
} from "../repositories/rutina.repository.js";

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