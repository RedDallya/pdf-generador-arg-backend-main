import db from "../config/db.js";

/* GET POR COTIZACION + OWNERSHIP */
export const getServiciosByCotizacion = async (cotizacionId, userId) => {
  const [rows] = await db.query(
    `SELECT s.* FROM servicios s
     JOIN cotizaciones c ON s.cotizacion_id = c.id
     WHERE s.cotizacion_id = ? AND c.created_by = ?`,
    [cotizacionId, userId]
  );
  return rows;
};

export const getServicioById = async (id, userId) => {
  const [rows] = await db.query(
    `SELECT s.* FROM servicios s
     JOIN cotizaciones c ON s.cotizacion_id = c.id
     WHERE s.id = ? AND c.created_by = ?`,
    [id, userId]
  );
  return rows[0];
};

export const createServicio = async (conn, data) => {
  const [res] = await conn.query(
    `INSERT INTO servicios SET ?`,
    [data]
  );
  return res.insertId;
};

export const updateServicio = async (conn, id, data) => {
  await conn.query(`UPDATE servicios SET ? WHERE id=?`, [data, id]);
};

export const deleteServicio = async (conn, id) => {
  await conn.query(`DELETE FROM servicios WHERE id=?`, [id]);
};
