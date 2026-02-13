import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Carga .env sólo en desarrollo
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,      // Ej: mysql.railway.internal
  user: process.env.DB_USER,      // Ej: root
  password: process.env.DB_PASS,  // Ej: contraseña secreta
  database: process.env.DB_NAME,  // Ej: railway
  waitForConnections: true,
  connectionLimit: 10,
});

pool.getConnection()
  .then(conn => {
    console.log("✅ DB conectado correctamente");
    conn.release();
  })
  .catch(err => {
    console.error("❌ Error conectando a DB:", err.code, err.message);
  });

export default pool;