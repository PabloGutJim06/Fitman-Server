import { Router } from "express";
import { enviarMensaje } from "../controllers/chat.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verificarToken, enviarMensaje);

export default router;