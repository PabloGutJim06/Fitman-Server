// routes/ejercicio.routes.js
import { Router } from "express";
import { getEjercicios } from "../controllers/ejercicio.controller.js";

const router = Router();

router.get("/", getEjercicios);

export default router;