import express from "express";


import {
  getTravels,
  getTravelsByClient,
  createTravel,
  updateTravel,
  deleteTravel
} from "../controllers/viajes.controller.js";




const router = express.Router();
router.get("/cliente/:clienteId", getTravelsByClient);

router.get("/", getTravels);
router.post("/", createTravel);
router.put("/:id", updateTravel);
router.delete("/:id", deleteTravel);

export default router;
