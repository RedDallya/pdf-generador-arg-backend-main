import {
  getServicesByCotizacion,
  createService,
  updateService,
  deleteService,
  getTotalsByCotizacion
} from "../models/services.model.js";

export const getServices = async (req, res) => {
  try {
    const data = await getServicesByCotizacion(req.params.cotizacion_id);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo servicios" });
  }
};

export const createNewService = async (req, res) => {
  try {
    const id = await createService(req.body);
    res.status(201).json({ id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando servicio" });
  }
};

export const updateExistingService = async (req, res) => {
  try {
    await updateService(req.params.id, req.body);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error actualizando servicio" });
  }
};

export const removeService = async (req, res) => {
  try {
    await deleteService(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando servicio" });
  }
};

export const getTotals = async (req, res) => {
  try {
    const totals = await getTotalsByCotizacion(req.params.cotizacion_id);
    res.json(totals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error calculando totales" });
  }
};
