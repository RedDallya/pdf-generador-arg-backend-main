import pool from "../config/db.js";

export const ClientDocumentModel = {

  create: async ({ client_id, type, number, expiry, notes }) => {

    const [result] = await pool.query(
      `INSERT INTO client_documents
       (client_id, type, number, expiry, notes)
       VALUES (?, ?, ?, ?, ?)`,
      [client_id, type, number, expiry, notes]
    );

    return result.insertId;
  },

  getByClient: async (clientId) => {

    const [rows] = await pool.query(
      `SELECT * FROM client_documents
       WHERE client_id = ?
       ORDER BY created_at DESC`,
      [clientId]
    );

    return rows;
  },

  remove: async (id) => {

    await pool.query(
      `DELETE FROM client_documents WHERE id = ?`,
      [id]
    );

    return true;
  }

};
