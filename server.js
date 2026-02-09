import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import clientsRoutes from "./routes/clients.routes.js";


import pdfRoutes from "./routes/pdf.routes.js";

dotenv.config();

const app = express();

/*
=====================================
FIX __dirname PARA ES MODULES
=====================================
*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
=====================================
CONFIG SERVER
=====================================
*/
const PORT = process.env.PORT || 3000;

/*
=====================================
MIDDLEWARES
=====================================
*/
app.use(cors());
app.use(express.json());

/*
=====================================
STATIC FILES
=====================================
*/
app.use("/assets", express.static(path.join(__dirname, "assets")));

/*
=====================================
ROUTES
=====================================
*/
app.use("/api/pdfs", pdfRoutes);
app.use("/api/clientes", clientsRoutes);

/*
=====================================
HEALTH CHECK
=====================================
*/
app.get("/", (req, res) => {
  res.status(200).send("Backend funcionando 🚀");
});

/*
=====================================
GLOBAL ERROR HANDLER
=====================================
*/
app.use((err, req, res, next) => {
  console.error("Error global:", err);
  res.status(500).json({
    error: "Error interno del servidor"
  });
});

/*
=====================================
START SERVER
=====================================
*/
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
