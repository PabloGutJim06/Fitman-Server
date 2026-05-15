// routes/registro.routes.js
import { Router } from "express";
import {
    createRegistro,
    getRegistros,
    getResumen,
} from "../controllers/registro.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verificarToken, createRegistro);
router.get("/", verificarToken, getRegistros);
router.get("/resumen", verificarToken, getResumen);

export default router;