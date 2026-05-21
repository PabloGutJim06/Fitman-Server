// routes/rutina.routes.js
import { Router } from "express";
import {
    createRutina,
    getRutinas,
    getRutinaPorId,
    patchRutina,
    deleteRutina,
    addColaborador,
    removeColaborador,
} from "../controllers/rutina.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verificarToken, createRutina);
router.get("/", verificarToken, getRutinas);
router.get("/:id", verificarToken, getRutinaPorId);
router.patch("/:id", verificarToken, patchRutina);
router.delete("/:id", verificarToken, deleteRutina);

router.post("/:id/colaboradores", verificarToken, addColaborador);
router.delete("/:id/colaboradores/:colaboradorId", verificarToken, removeColaborador);

export default router;