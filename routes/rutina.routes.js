import { Router } from "express";
import {
     createRutina, 
     getRutinas, 
     getRutinaPorId,
     patchRutina,
     deleteRutina
} from "../controllers/rutina.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();
 
// Le decimos que las petiuciones POST (Para creer una rutina) se manejen con la función createRutina del controlador
router.post("/", verificarToken, createRutina);

// Peticiones GET para obtener todas las rutinas o una rutina por ID
router.get("/", verificarToken, getRutinas);
router.get("/:id", verificarToken, getRutinaPorId);

// Petición Patch para actualizar una rutina con su ID
router.patch("/:id", verificarToken, patchRutina);

// Petición DELETE para eliminar una rutina por ID
router.delete("/:id", verificarToken, deleteRutina);

export default router;
