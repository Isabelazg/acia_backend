import { Op } from "sequelize";
import RegimenIva from "../models/regimenes_ivas.model.js";

/**
 * Obtener todos los regimenes de IVA con filtros, orden y paginación.
 */
export const getRegimenesIvasRepository = async ({
  id,
  nombres, // <-- CORREGIDO a 'nombres' (plural)
  estado,
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  const whereClause = {};
  if (id) whereClause.id = id;
  if (nombres) whereClause.nombres = { [Op.like]: `%${nombres}%` }; // <-- CORREGIDO a 'nombres'
  if (estado !== undefined) whereClause.estado = estado;

  const offset = (page - 1) * limit;

  const { count, rows } = await RegimenIva.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

/**
 * Obtener lista de regimenes de IVA (sin paginación).
 */
export const getListRegimenesIvasRepository = async (estado, sortBy = "id", order = "ASC") => {
  const whereClause = {};
  if (estado !== undefined) whereClause.estado = estado;

  const { count, rows } = await RegimenIva.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return { data: rows, count };
};

/**
 * Buscar un regimen de IVA por ID.
 */
export const showRegimenIvaRepository = async (id) => {
  return await RegimenIva.findOne({ where: { id } });
};

/**
 * Crear un nuevo regimen de IVA.
 */
export const storeRegimenIvaRepository = async (data) => {
  return await RegimenIva.create(data);
};

/**
 * Actualizar un regimen de IVA por ID.
 */
export const updateRegimenIvaRepository = async (id, data) => {
  const regimenIva = await RegimenIva.findOne({ where: { id } });
  if (!regimenIva) return null;
  await regimenIva.update(data);
  await regimenIva.reload();
  return regimenIva;
};

/**
 * Eliminar un regimen de IVA por ID.
 */
export const deleteRegimenIvaRepository = async (id) => {
  const regimenIva = await RegimenIva.findOne({ where: { id } });
  if (!regimenIva) return null;
  await regimenIva.destroy();
  return true;
};

/**
 * Buscar un regimen de IVA por nombre, excluyendo un ID específico.
 */
export const findRegimenIvaByNombreExcludingIdRepository = async (nombres, idToExclude) => {
  return await RegimenIva.findOne({
    where: {
      nombres: nombres, // <-- CORREGIDO a 'nombres'
      id: {
        [Op.ne]: idToExclude // [Op.ne] significa "not equal" (no es igual a)
      }
    }
  });
};

export const checkRegimenIvaHasAutorizacionesRepository = async (regimenIvaId) => {
  const count = await ProyectoAutorizacion.count({
    where: {
      regimen_iva_id: regimenIvaId
    }
  });

  return count > 0;
};