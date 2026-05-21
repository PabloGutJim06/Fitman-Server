// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET no está definida. Revisa tu .env o las variables de entorno en Render.");
    process.exit(1);
}

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });
    }

    const token = authHeader.substring(7);

    try {

        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token expirado. Inicia sesión de nuevo." });
        }
        return res.status(401).json({ error: "Token inválido." });
    }
};