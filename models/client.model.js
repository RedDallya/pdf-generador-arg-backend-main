import pool from "../config/db.js";

export const ClientModel = {

  /*
  =====================================
  CREAR CLIENTE
  =====================================
  */
  create: async ({ nombre, email, telefono, notas }) => {

    const [result] = await pool.query(
      `INSERT INTO clientes 
       (nombre, email, telefono, notas)
       VALUES (?, ?, ?, ?)`,
      [nombre, email, telefono, notas || null]
    );

    return result.insertId;
  },

  /*
  =====================================
  OBTENER TODOS LOS CLIENTES
  =====================================
  */
  getAll: async () => {

    const [rows] = await pool.query(
      `SELECT * FROM clientes 
       ORDER BY created_at DESC`
    );

    return rows;
  },

  /*
  =====================================
  OBTENER CLIENTE POR ID
  =====================================
  */
  getById: async (id) => {

    const [rows] = await pool.query(
      `SELECT * FROM clientes WHERE id = ?`,
      [id]
    );

    return rows[0] || null;
  },

  /*
  =====================================
  ACTUALIZAR CLIENTE
  =====================================
  */
  update: async (id, { nombre, email, telefono, notas }) => {

    const [result] = await pool.query(
      `UPDATE clientes
       SET nombre = ?, email = ?, telefono = ?, notas = ?
       WHERE id = ?`,
      [nombre, email, telefono, notas || null, id]
    );

    return result.affectedRows > 0;
  },

  /*
  =====================================
  ELIMINAR CLIENTE
  =====================================
  */
  remove: async (id) => {

    const [result] = await pool.query(
      `DELETE FROM clientes WHERE id = ?`,
      [id]
    );

    return result.affectedRows > 0;
  }

};
