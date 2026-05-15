// services/registro.service.js
import {
    crearRegistro,
    obtenerRegistrosPorUsuario,
    obtenerResumenPorUsuario,
} from "../repositories/registro.repository.js";

export const guardarRegistro = async (userId, registroData) => {
    const registroCompleto = {
        ...registroData,
        usuario_id: userId,
    };

    const id = await crearRegistro(registroCompleto);
    return { id, ...registroCompleto };
};

export const leerRegistrosDeUsuario = async (userId) => {
    return await obtenerRegistrosPorUsuario(userId);
};

export const leerResumenDeUsuario = async (userId) => {
    return await obtenerResumenPorUsuario(userId);
};