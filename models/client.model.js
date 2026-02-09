import pool from "../config/db.js";

export const ClientModel = {

  create: async ({ nombre, email, telefono, notas, status, location, tags, created_at }) => {

    const [result] = await pool.query(
      `INSERT INTO clientes
      (nombre, email, telefono, notas, status, location, tags, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre,
        email,
        telefono,
        notas || null,
        status || null,
        location || null,
        tags || null,
        created_at || null
      ]
    );

    return result.insertId;
  },

  getAll: async () => {
    const [rows] = await pool.query(`SELECT * FROM clientes ORDER BY id DESC`);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query(`SELECT * FROM clientes WHERE id = ?`, [id]);
    return rows[0];
  },

  update: async (id, data) => {

    const {
      nombre,
      email,
      telefono,
      notas,
      status,
      location,
      tags,
      created_at
    } = data;

    await pool.query(
      `UPDATE clientes SET
        nombre = ?,
        email = ?,
        telefono = ?,
        notas = ?,
        status = ?,
        location = ?,
        tags = ?,
        created_at = ?
      WHERE id = ?`,
      [
        nombre,
        email,
        telefono,
        notas || null,
        status || null,
        location || null,
        tags || null,
        created_at || null,
        id
      ]
    );

    return true;
  },

  remove: async (id) => {
    await pool.query(`DELETE FROM clientes WHERE id = ?`, [id]);
    return true;
  }
};
