import express from "express";
import {
  createCotizacion,
  getCotizacionesByViaje,
  getCotizacionFull,
  updateCotizacion,
  deleteCotizacion
} from "../controllers/cotizaciones.controller.js";

const router = express.Router();

router.get("/viaje/:viajeId", getCotizacionesByViaje);
router.get("/:id", getCotizacionFull);
router.post("/", createCotizacion);
router.put("/:id", updateCotizacion);
router.delete("/:id", deleteCotizacion);

export default router;
