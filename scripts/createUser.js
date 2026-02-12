import bcrypt from "bcrypt";
import pool from "../config/db.js";

const username = process.argv[2];
const password = process.argv[3];
const rol = process.argv[4] || "admin";

if (!username || !password) {
  console.log("Uso: node scripts/createUser.js usuario password [rol]");
  process.exit(1);
}

const run = async () => {
  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO usuarios (username, password_hash, rol)
     VALUES (?, ?, ?)`,
    [username, hash, rol]
  );

  console.log("✅ Usuario creado:", username);
  process.exit();
};

run();
