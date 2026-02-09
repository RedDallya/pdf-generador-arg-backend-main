import { ClientModel } from "../models/client.model.js";
import { TagModel } from "../models/tag.model.js";

/*
CREATE CLIENT
*/
export const createClient = async (req, res) => {

  try {

    const clientId = await ClientModel.create(req.body);

    const tags = req.body.tags?.split(",").map(t => t.trim()) || [];

    await TagModel.saveClientTags(clientId, tags);

    const client = await ClientModel.getById(clientId);

    res.status(201).json(client);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Error creando cliente" });

  }
};


/*
GET ALL CLIENTS
*/
export const getClients = async (req, res) => {

  try {
    const clients = await ClientModel.getAll();
    res.json(clients);

  } catch (error) {
    res.status(500).json({ error: "Error obteniendo clientes" });
  }

};


/*
GET CLIENT BY ID
*/
export const getClientById = async (req, res) => {

  try {

    const client = await ClientModel.getById(req.params.id);

    if (!client) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(client);

  } catch (error) {
    res.status(500).json({ error: "Error obteniendo cliente" });
  }

};


/*
UPDATE CLIENT
*/
export const updateClient = async (req, res) => {

  try {

    await ClientModel.update(req.params.id, req.body);

    const tags = req.body.tags?.split(",").map(t => t.trim()) || [];

    await TagModel.saveClientTags(req.params.id, tags);

    const client = await ClientModel.getById(req.params.id);

    res.json(client);

  } catch (error) {

    res.status(500).json({ error: "Error actualizando cliente" });

  }
};


/*
DELETE CLIENT
*/
export const deleteClient = async (req, res) => {

  try {

    await ClientModel.remove(req.params.id);

    res.json({ success: true });

  } catch (error) {

    res.status(500).json({ error: "Error eliminando cliente" });

  }
};
