import mysql from "mysql2/promise";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

console.log("Conectando a DB con:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
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