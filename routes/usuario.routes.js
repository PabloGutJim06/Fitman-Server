// routes/usuario.routes.js
import { Router } from "express";
import {
    createUsuarioController,
    login,
    getPerfil,
    patchPerfil,
} from "../controllers/usuario.controller.js"; 
import { verificarToken } from "../middlewares/auth.middleware.js"; 

const router = Router();

router.post("/register", createUsuarioController);
router.post("/login", login);
router.get("/me", verificarToken, getPerfil);
router.patch("/me", verificarToken, patchPerfil);

export default router;