import express from "express";

import {
  createClientDocument,
  getClientDocuments,
  deleteClientDocument
} from "../controllers/clientDocument.controller.js";

const router = express.Router();

router.post("/", createClientDocument);
router.get("/:clientId", getClientDocuments);
router.delete("/:id", deleteClientDocument);

export default router;
