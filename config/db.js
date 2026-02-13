import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Carga variables de entorno SOLO en desarrollo, para no interferir en Railway
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,      // debe estar en Railway Config Vars
  user: process.env.DB_USER,      // idem
  password: process.env.DB_PASS,  // idem
  database: process.env.DB_NAME,  // idem
  waitForConnections: true,
  connectionLimit: 10,
});

// Testeamos conexión al arrancar backend
pool.getConnection()
  .then(conn => {
    console.log("✅ DB conectado correctamente");
    conn.release();
  })
  .catch(err => {
    console.error("❌ Error conectando a DB:", err.code, err.message);
  });

export default pool;