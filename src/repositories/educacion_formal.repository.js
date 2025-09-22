import { Op } from "sequelize";
import educacion_formal from "../models/educacion_formal.model.js";

/**
 * Obtener todas las educaciones formales con filtros, orden y paginación.
 */
export const geteducacion_formalRepository = async ({
  id,
  titulo,
  institucion,
  estado_id,
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  const whereClause = {};
  if (id) whereClause.id = id;
  if (titulo) whereClause.titulo = { [Op.like]: `%${titulo}%` };
  if (institucion) whereClause.institucion = { [Op.like]: `%${institucion}%` };
  if (estado_id !== undefined) whereClause.estado_id = estado_id;

  const offset = (page - 1) * limit;

  const { count, rows } = await educacion_formal.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

/**
 * Obtener lista de educacion formal (sin paginación).
 */
export const getListeducacion_formalRepository = async (estado_id, sortBy = "id", order = "ASC") => {
  const whereClause = {};
  if (estado_id !== undefined) whereClause.estado_id = estado_id;

  const { count, rows } = await educacion_formal.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return { data: rows, count };
};

/**
 * Buscar una educacion formal por ID.
 */
export const showeducacion_formalRepository = async (id) => {
  return await educacion_formal.findOne({ where: { id } });
};

/**
 * Crear una nueva educacion formal.
 */
export const storeeducacion_formalRepository = async (data) => {
  return await educacion_formal.create(data);
};

/**
 * Crear múltiples educaciones formales a la vez
 */
export const storeMultipleEducacionesRepository = async (educaciones) => {
  return await educacion_formal.bulkCreate(educaciones);
};

/**
 * Actualizar una educacion formal por ID.
 */
export const updateeducacion_formalRepository = async (id, data) => {
  const educacionformal = await educacion_formal.findOne({ where: { id } });
  if (!educacionformal) return null;
  await educacionformal.update(data);
  await educacionformal.reload();
  return educacionformal;
};

/**
 * Eliminar una educacion formal por ID.
 */
export const deleteeducacion_formalRepository = async (id) => {
  const educacionformal = await educacion_formal.findOne({ where: { id } });
  if (!educacionformal) return null;
  await educacionformal.destroy();
  return true;
};

/**
 * Buscar una educacion formal por titulo, excluyendo un ID específico.
 */
export const findeducacion_formalByNombreExcludingIdRepository = async (titulo, idToExclude) => {
  return await educacion_formal.findOne({
    where: {
      titulo: titulo,
      id: {
        [Op.ne]: idToExclude // [Op.ne] significa "not equal" (no es igual a)
      }
    }
  });
};

/**
 * Buscar una educacion formal por titulo para un usuario específico
 */
export const findEducacionByNombreYPersonaRepository = async (titulo, id) => {
  return await educacion_formal.findOne({
    where: {
      titulo,
      id
    }
  });
};

/**
 * Buscar múltiples educaciones repetidas por nombre para un usuario
 * Esto sirve para validar duplicados antes de guardar múltiples
 */
export const findDuplicatedEducacionesRepository = async (educaciones) => {
  const orConditions = educaciones.map(e => ({
    titulo: e.titulo,
    id: e.id
  }));

  return await educacion_formal.findAll({
    where: {
      [Op.or]: orConditions
    }
  });
};
