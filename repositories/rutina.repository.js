// repositories/rutina.repository.js
import { db } from "../config/firebase.js";
import admin from "firebase-admin";
import { NotFoundError } from "../utils/errors.js";

// POST — guardar nueva rutina
export const crearRutina = async (rutinaData) => {
    const rutinaRef = await db.collection("rutinas").add(rutinaData);
    return rutinaRef.id;
};

// GET — rutinas propias + rutinas donde soy colaborador
export const obtenerRutinas = async (userId) => {
    // Query 1: rutinas donde soy el creador
    const snapshotMias = await db.collection("rutinas")
        .where("usuario_id", "==", userId)
        .get();

    const snapshotColaboradas = await db.collection("rutinas")
        .where("colaboradores_ids", "array-contains", userId)
        .get();

    // Merge sin duplicados usando Map
    const todas = new Map();

    snapshotMias.docs.forEach(doc =>
        todas.set(doc.id, {
            id: doc.id,
            ...doc.data(),
            es_creador: true,   // Flutter usa esto para mostrar controles de edición
        })
    );

    snapshotColaboradas.docs.forEach(doc => {
        if (!todas.has(doc.id)) {
            const colabs = doc.data().colaboradores ?? [];
            const miRol = colabs.find(c => c.usuario_id === userId);
            todas.set(doc.id, {
                id: doc.id,
                ...doc.data(),
                es_creador: false,
                puede_editar: miRol?.puede_editar ?? false,
            });
        }
    });

    return Array.from(todas.values());
};

// GET — una rutina por su ID de Firestore
export const obtenerRutinaPorId = async (id) => {
    const doc = await db.collection("rutinas").doc(id).get();
    if (!doc.exists) {
        throw new NotFoundError("Rutina no encontrada");
    }
    return { id: doc.id, ...doc.data() };
};

// PATCH — actualizar campos de una rutina existente
export const actualizarRutina = async (id, rutinaData) => {
    const rutinaRef = db.collection("rutinas").doc(id);
    await rutinaRef.update(rutinaData);
    return true;
};

// DELETE — eliminar una rutina por ID
export const eliminarRutina = async (id) => {
    return await db.collection("rutinas").doc(id).delete();
};

// POST colaborador — añadir colaborador a una rutina
export const añadirColaborador = async (rutinaId, colaborador) => {
    const rutinaRef = db.collection("rutinas").doc(rutinaId);
    await rutinaRef.update({
        colaboradores: admin.firestore.FieldValue.arrayUnion(colaborador),
        colaboradores_ids: admin.firestore.FieldValue.arrayUnion(
            colaborador.usuario_id
        ),
    });
    return true;
};

// DELETE colaborador — quitar colaborador de una rutina
export const quitarColaborador = async (rutinaId, usuarioId) => {
    const rutinaRef = db.collection("rutinas").doc(rutinaId);
    const doc = await rutinaRef.get();
    if (!doc.exists) throw new NotFoundError("Rutina no encontrada");

    const colaboradores = (doc.data().colaboradores ?? [])
        .filter(c => c.usuario_id !== usuarioId);

    await rutinaRef.update({
        colaboradores,
        colaboradores_ids: admin.firestore.FieldValue.arrayRemove(usuarioId),
    });
    return true;
};