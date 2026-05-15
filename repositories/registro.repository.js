// repositories/registro.repository.js
import { db } from "../config/firebase.js";
import admin from "firebase-admin";
import { NotFoundError } from "../utils/errors.js";

// POST — guardar nuevo registro de entrenamiento
export const crearRegistro = async (registroData) => {
    const docRef = await db.collection("registros").add({
        ...registroData,
        
        fecha: admin.firestore.Timestamp.now(),
    });
    return docRef.id;
};

// GET — todos los registros de un usuario, ordenados por fecha descendente
export const obtenerRegistrosPorUsuario = async (userId) => {
    const snapshot = await db.collection("registros")
        .where("usuario_id", "==", userId)
        .orderBy("fecha", "desc")
        .get();

    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
       
            fecha: data.fecha?.toDate?.()?.toISOString() ?? null,
        };
    });
};

// GET — contadores para el resumen del perfil
export const obtenerResumenPorUsuario = async (userId) => {
    // Total histórico — todos los registros del usuario
    const snapshotTotal = await db.collection("registros")
        .where("usuario_id", "==", userId)
        .get();

    // Este mes — desde el primer día del mes actual a las 00:00:00
    const ahora = new Date();
    const primerDiaDelMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
    const timestampMes = admin.firestore.Timestamp.fromDate(primerDiaDelMes);

    const snapshotMes = await db.collection("registros")
        .where("usuario_id", "==", userId)
        .where("fecha", ">=", timestampMes)
        .get();

    return {
        total: snapshotTotal.size,
        este_mes: snapshotMes.size,
    };
};