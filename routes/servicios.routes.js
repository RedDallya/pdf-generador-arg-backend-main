import express from "express";
import {
  createServicio,
  updateServicio,
  deleteServicio,
  getServicioById,
  getServiciosByCotizacion
} from "../controllers/services.controller.js";

const router = express.Router();

router.get("/cotizacion/:cotizacionId", getServiciosByCotizacion);
router.get("/:id", getServicioById);
router.post("/", createServicio);
router.put("/:id", updateServicio);
router.delete("/:id", deleteServicio);

export default router;
