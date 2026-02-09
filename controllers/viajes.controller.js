import pool from "../config/db.js";

export const getTravels = async (req, res) => {

  const { cliente_id } = req.query;

  try {

    let sql = `
      SELECT *
      FROM viajes
    `;

    const params = [];

    if (cliente_id) {
      sql += " WHERE cliente_id = ?";
      params.push(cliente_id);
    }

    sql += " ORDER BY created_at DESC";

    const [rows] = await pool.query(sql, params);

    res.json(rows);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// POST /api/viajes
export const createTravel = async (req, res) => {
  const {
    cliente_id,
    destino,
    fecha_inicio,
    fecha_fin,
    pasajero,
    tipo_viaje,
    estado,
    notas
  } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO viajes 
      (cliente_id, destino, fecha_inicio, fecha_fin, pasajero, tipo_viaje, estado, notas)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cliente_id,
        destino,
        fecha_inicio,
        fecha_fin,
        pasajero,
        tipo_viaje,
        estado || "borrador",
        notas
      ]
    );

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/viajes/:id
export const updateTravel = async (req, res) => {
  const { id } = req.params;
  const {
    cliente_id,
    destino,
    fecha_inicio,
    fecha_fin,
    pasajero,
    tipo_viaje,
    estado,
    notas
  } = req.body;

  try {
    await pool.query(
      `UPDATE viajes SET
        cliente_id=?,
        destino=?,
        fecha_inicio=?,
        fecha_fin=?,
        pasajero=?,
        tipo_viaje=?,
        estado=?,
        notas=?
      WHERE id=?`,
      [
        cliente_id,
        destino,
        fecha_inicio,
        fecha_fin,
        pasajero,
        tipo_viaje,
        estado,
        notas,
        id
      ]
    );

    res.json({ message: "Viaje actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/viajes/:id
export const deleteTravel = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM viajes WHERE id = ?", [id]);
    res.json({ message: "Viaje eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// GET /api/viajes/cliente/:clienteId
export const getTravelsByClient = async (req, res) => {

  try {

    const { clienteId } = req.params;

    const [rows] = await pool.query(
      `SELECT *
       FROM viajes
       WHERE cliente_id = ?
       ORDER BY created_at DESC`,
      [clienteId]
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
