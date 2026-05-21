// repositories/ejercicio.repository.js
import { db } from "../config/firebase.js";

export const obtenerTodosLosEjercicios = async () => {
    const snapshot = await db.collection("ejercicios_globales")
        .orderBy("nombre", "asc")
        .get();

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
};