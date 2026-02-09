import { ClientModel } from "../models/client.model.js";

export const createClient = async (req, res) => {
  try {
    const { nombre, email, telefono, notas } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: "Nombre obligatorio" });
    }

    const id = await ClientModel.create({
      nombre,
      email,
      telefono,
      notas
    });

    res.status(201).json({ id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando cliente" });
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await ClientModel.getAll();
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo clientes" });
  }
};

export const getClientById = async (req, res) => {
  try {
    const client = await ClientModel.getById(req.params.id);

    if (!client) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo cliente" });
  }
};

export const updateClient = async (req, res) => {
  try {
    await ClientModel.update(req.params.id, req.body);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error actualizando cliente" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    await ClientModel.remove(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando cliente" });
  }
};

export async function getClientById(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM clientes WHERE id = ?",
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
