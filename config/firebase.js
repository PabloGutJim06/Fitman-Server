// config/firebase.js

import admin from "firebase-admin";


if (!process.env.FIREBASE_CREDENTIALS) {
    console.error(" FIREBASE_CREDENTIALS no está definida. Revisa .env o las variables de entorno en Render.");
    process.exit(1);
}

let serviceAccount;
try {

    serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
} catch (e) {
    console.error("FIREBASE_CREDENTIALS no es un JSON válido:", e.message);
    process.exit(1);
}

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase inicializado correctamente");
} catch (e) {
    console.error("Error al inicializar Firebase:", e.message);
    process.exit(1);
}

export const db = admin.firestore();