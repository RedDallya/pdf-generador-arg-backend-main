import { ClientModel } from "../models/client.model.js";

/*
===========================
CREATE CLIENT
===========================
*/
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

    // 🔥 obtener cliente creado
    const client = await ClientModel.getById(id);

    res.status(201).json(client);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando cliente" });
  }
};


/*
===========================
GET ALL CLIENTS
===========================
*/
export const getClients = async (req, res) => {
  try {
    const clients = await ClientModel.getAll();
    res.json(clients);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo clientes" });
  }
};

/*
===========================
GET CLIENT BY ID
===========================
*/
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

/*
===========================
UPDATE CLIENT
===========================
*/
export const updateClient = async (req, res) => {
  try {

    const updated = await ClientModel.update(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error actualizando cliente" });
  }
};


/*
===========================
DELETE CLIENT
===========================
*/
export const deleteClient = async (req, res) => {
  try {

    const removed = await ClientModel.remove(req.params.id);

    if (!removed) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando cliente" });
  }
};
