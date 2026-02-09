
import { ClientDocumentsModel } from "../models/clientDocuments.model.js";

export const createClientDocument = async (req, res) => {

  try {

    const file = req.file;

    const id = await ClientDocumentsModel.create({
      ...req.body,
      file_name: file?.originalname,
      file_path: file ? `/uploads/${file.filename}` : null
    });

    res.status(201).json({ id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando documento" });
  }
};


/*
=======================
GET DOCUMENTS BY CLIENT
=======================
*/
export const getClientDocuments = async (req, res) => {

  try {

    const docs = await ClientDocumentModel.getByClient(req.params.clientId);

    res.json(docs);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo documentos" });
  }
};

/*
=======================
DELETE DOCUMENT
=======================
*/
export const deleteClientDocument = async (req, res) => {

  try {

    await ClientDocumentModel.remove(req.params.id);

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando documento" });
  }
};
