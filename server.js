import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

app.use(cors({
  origin: [
    "https://pdfcostaazul.netlify.app",
    "http://localhost:5173",
    "http://127.0.0.1:5500"
  ],
  credentials: true
}));

/*
=====================================
ENV CONFIG (SIEMPRE ARRIBA)
=====================================
*/
dotenv.config();

/*
=====================================
ROUTES IMPORT
=====================================
*/
import viajesRoutes from "./routes/viajes.routes.js";
import clientsRoutes from "./routes/clients.routes.js";
import clientDocumentsRoutes from "./routes/clientDocuments.routes.js";
import pdfRoutes from "./routes/pdf.routes.js";

import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import cotizacionesRoutes from "./routes/cotizaciones.routes.js";
import serviciosRoutes from "./routes/servicios.routes.js";

/*
=====================================
APP INIT
=====================================
*/
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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/*
=====================================
API ROUTES
=====================================
*/
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

app.use("/api/viajes", viajesRoutes);
app.use("/api/clientes", clientsRoutes);
app.use("/api/client-documents", clientDocumentsRoutes);
app.use("/api/pdfs", pdfRoutes);
app.use("/api/cotizaciones", cotizacionesRoutes);
app.use("/api/servicios", serviciosRoutes);

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
    error: "Error interno del servidor",
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
