// middlewares/auth.middleware.js
// Este código es una composición basada en patrones oficiales de Node.js y los recursos de miduDev

import jwt from "jsonwebtoken";

// ✅ Verificación temprana igual que en firebase.js
// Si no hay JWT_SECRET, cualquier token es inválido — mejor saberlo al arrancar
if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET no está definida. Revisa tu .env o las variables de entorno en Render.");
    process.exit(1);
}

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // ✅ Optional chaining — más limpio que el doble if
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });
    }

    const token = authHeader.substring(7);

    try {
        // jwt.verify lanza excepción si el token es inválido o ha expirado
        // El resultado decodificado (payload) lo colgamos en req.user
        // para que los controllers sepan quién hace la petición
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        // ✅ Distinguimos expirado vs inválido — ayuda al cliente Flutter a saber qué hacer
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token expirado. Inicia sesión de nuevo." });
        }
        return res.status(401).json({ error: "Token inválido." });
    }
};