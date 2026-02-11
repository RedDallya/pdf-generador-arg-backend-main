import express from "express";
import {
  generatePartialPdf,
  generateFullPdf,
  getPdfsByCotizacion
} from "../controllers/pdf.controller.js";

const router = express.Router();

router.get("/partial", generatePartialPdf);
router.get("/full", generateFullPdf);
router.get("/:cotizacionId", getPdfsByCotizacion);
router.get("/latest/:cotizacionId", validateTokenFromQuery, getLatestPdf);

export default router;
