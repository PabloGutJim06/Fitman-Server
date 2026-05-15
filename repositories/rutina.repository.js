// repositories/rutina.repository.js
import { db } from "../config/firebase.js";
import { NotFoundError } from "../utils/errors.js";

// POST — guardar nueva rutina
export const crearRutina = async (rutinaData) => {
    const rutinaRef = await db.collection("rutinas").add(rutinaData);
    return rutinaRef.id;
};

// GET — todas las rutinas de un usuario
export const obtenerRutinas = async (userId) => {
    const snapshot = await db.collection("rutinas")
        .where("usuario_id", "==", userId)
        .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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