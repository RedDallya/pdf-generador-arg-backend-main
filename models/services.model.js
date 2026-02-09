import db from "../config/db.js";

/*
=====================================
OBTENER SERVICIOS POR COTIZACION
=====================================
*/
export async function getServicesByCotizacion(cotizacionId) {
    const [rows] = await db.query(
        `SELECT * 
         FROM servicios 
         WHERE cotizacion_id = ?
         ORDER BY id ASC`,
        [cotizacionId]
    );

    return rows;
}

/*
=====================================
CREAR SERVICIO
=====================================
*/
export async function createService(service) {
    const {
        cotizacion_id,
        categoria,
        descripcion,
        observaciones,
        moneda,
        precio,
        adultos,
        menores,
        subtotal
    } = service;

    const [result] = await db.query(
        `INSERT INTO servicios
        (cotizacion_id, categoria, descripcion, observaciones, moneda, precio, adultos, menores, subtotal)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            cotizacion_id,
            categoria,
            descripcion,
            observaciones,
            moneda,
            precio,
            adultos,
            menores,
            subtotal
        ]
    );

    return result.insertId;
}

/*
=====================================
ACTUALIZAR SERVICIO
=====================================
*/
export async function updateService(id, service) {
    const {
        categoria,
        descripcion,
        observaciones,
        moneda,
        precio,
        adultos,
        menores,
        subtotal
    } = service;

    await db.query(
        `UPDATE servicios SET
            categoria = ?,
            descripcion = ?,
            observaciones = ?,
            moneda = ?,
            precio = ?,
            adultos = ?,
            menores = ?,
            subtotal = ?
         WHERE id = ?`,
        [
            categoria,
            descripcion,
            observaciones,
            moneda,
            precio,
            adultos,
            menores,
            subtotal,
            id
        ]
    );

    return true;
}

/*
=====================================
ELIMINAR SERVICIO
=====================================
*/
export async function deleteService(id) {
    await db.query(
        `DELETE FROM servicios WHERE id = ?`,
        [id]
    );

    return true;
}

/*
=====================================
CALCULAR TOTALES POR COTIZACION
=====================================
*/
export async function getTotalsByCotizacion(cotizacionId) {

    const [rows] = await db.query(
        `SELECT 
            moneda,
            SUM(subtotal) AS total
         FROM servicios
         WHERE cotizacion_id = ?
         GROUP BY moneda`,
        [cotizacionId]
    );

    return rows;
}
