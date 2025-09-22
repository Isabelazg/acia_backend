import { Op } from "sequelize";
import informacion_personal from "../models/informacion_personal.model.js";

/**
 * Obtener toda la informacion personal con filtros, orden y paginación.
 */
export const getinformacion_personalRepository = async ({
  documento,
  nombres,
  apellidos,
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  const whereClause = {};
  if (documento) whereClause.documento = { [Op.like]: `%${documento}%` };
  if (nombres) whereClause.nombres = { [Op.like]: `%${nombres}%` };
  if (apellidos) whereClause.apellidos = { [Op.like]: `%${apellidos}%` };

  const offset = (page - 1) * limit;

  const { count, rows } = await informacion_personal.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

/**
 * Obtener lista de informacion personal (sin paginación).
 */
export const getListinformacion_personalRepository = async (sortBy = "id", order = "ASC") => {
  const { count, rows } = await informacion_personal.findAndCountAll({
    order: [[sortBy, order]],
  });
  return { data: rows, count };
};

/**
 * Buscar una informacion personal por ID.
 */
export const showinformacion_personalRepository = async (id) => {
  return await informacion_personal.findOne({ where: { id } });
};

/**
 * Crear nueva informacion personal.
 */
export const storeinformacion_personalRepository = async (data) => {
  return await informacion_personal.create(data);
};

/**
 * Actualizar informacion personal por ID.
 */
export const updateinformacion_personalRepository = async (id, data) => {
  const persona = await informacion_personal.findOne({ where: { id } });
  if (!persona) return null;
  await persona.update(data);
  await persona.reload();
  return persona;
};

/**
 * Eliminar una informacion personal por ID.
 */
export const deleteinformacion_personalRepository = async (id) => {
  const persona = await informacion_personal.findOne({ where: { id } });
  if (!persona) return null;
  await persona.destroy();
  return true;
};

/**
 * Buscar informacion personal por documento, excluyendo un ID específico.
 */
export const findinformacion_personalByDocumentoExcludingIdRepository = async (documento, idToExclude) => {
  return await informacion_personal.findOne({
    where: {
      documento: documento,
      id: {
        [Op.ne]: idToExclude
      }
    }
  });
};