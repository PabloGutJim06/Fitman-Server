// repositories/usuario.repository.js
import { db } from "../config/firebase.js";
import { NotFoundError } from "../utils/errors.js";

// POST — guardar nuevo usuario
export const crearUsuario = async (userData) => {
    const docRef = await db.collection("usuarios").add(userData);
    return docRef.id;
};

// GET — usuario por ID de Firestore
export const obtenerUsuarioPorId = async (id) => {
    const doc = await db.collection("usuarios").doc(id).get();
    if (!doc.exists) {
        throw new NotFoundError("Usuario no encontrado");
    }
    const data = doc.data();

    return {
        id: doc.id,
        ...data,
        fecha_registro: data.fecha_registro?.toDate?.()?.toISOString() ?? null,
    };
};

// GET — todos los usuarios (uso interno / admin)
export const obtenerUsuarios = async () => {
    const snapshot = await db.collection("usuarios").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const buscarPorEmail = async (email) => {
    const snapshot = await db.collection("usuarios")
        .where("email", "==", email)
        .get();
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};

// PATCH — actualizar campos del usuario
export const actualizarUsuario = async (id, userData) => {
    const userRef = db.collection("usuarios").doc(id);
    await userRef.update(userData);
    return true;
};