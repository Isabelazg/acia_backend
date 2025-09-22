import { Op } from "sequelize";
import clasificacion_persona_natural from "../models/clasificacion_persona_natural.model.js";

/**
 * Obtener todos las clasificaciones de persona natural con filtros, orden y paginación.
 */
export const getclasificacion_persona_naturalRepository = async ({
  id,
  nombres,
  estado,
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  const whereClause = {};
  if (id) whereClause.id = id;
  if (nombres) whereClause.nombres = { [Op.like]: `%${nombres}%` };
  if (estado !== undefined) whereClause.estado = estado;

  const offset = (page - 1) * limit;

  const { count, rows } = await clasificacion_persona_natural.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

/**
 * Obtener lista de clasificaciones de persona natural (sin paginación).
 */
export const getListclasificacion_persona_naturalRepository = async (estado, sortBy = "id", order = "ASC") => {
  const whereClause = {};
  if (estado !== undefined) whereClause.estado = estado;

  const { count, rows } = await clasificacion_persona_natural.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return { data: rows, count };
};

/**
 * Buscar una clasificacion de persona natural por ID.
 */
export const showclasificacion_persona_naturalRepository = async (id) => {
  return await clasificacion_persona_natural.findOne({ where: { id } });
};

/**
 * Crear una nueva clasificacion de persona natural
 * .
 */
export const storeclasificacion_persona_naturalRepository = async (data) => {
  return await clasificacion_persona_natural.create(data);
};

/**
 * Actualizar una clasificaion de persona natural por ID.
 */
export const updateclasificacion_persona_naturalRepository = async (id, data) => {
  const clasificacion_personas_natural = await clasificacion_persona_natural.findOne({ where: { id } });
  if (!clasificacion_personas_natural) return null;
  await clasificacion_personas_natural.update(data);
  await clasificacion_personas_natural.reload();
  return clasificacion_personas_natural;
};

/**
 * Eliminar una clasificaion de persona natural por ID.
 */
export const deleteclasificacion_persona_naturalRepository = async (id) => {
  const clasificacion_personas_natural = await clasificacion_persona_natural.findOne({ where: { id } });
  if (!clasificacion_personas_natural) return null;
  await clasificacion_personas_natural.destroy();
  return true;
};

/**
 * Buscar una clasificaion de persona natural por nombres, excluyendo un ID específico.
 */
export const findclasificacion_persona_naturalByNombreExcludingIdRepository = async (nombres, idToExclude) => {
  return await clasificacion_persona_natural.findOne({
    where: {
      nombres: nombres,
      id: {
        [Op.ne]: idToExclude // [Op.ne] significa "not equal" (no es igual a)
      }
    }
  });
};
