import { Op } from "sequelize";
import educacion_informal from '../models/educacion_informales.model.js';

/**
 * Obtener todas las educaciones informales con filtros, orden y paginación.
 */
export const geteducacion_informalRepository = async ({
  id,
  titulo,
  tipo_formacion,
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
  if (tipo_formacion) whereClause.tipo_formacion = { [Op.like]: `%${tipo_formacion}%` };
  if (institucion) whereClause.institucion = { [Op.like]: `%${institucion}%` };
  if (estado_id !== undefined) whereClause.estado_id = estado_id;

  const offset = (page - 1) * limit;

  const { count, rows } = await educacion_informal.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

/**
 * Obtener lista de educacion informal (sin paginación).
 */
export const getListeducacion_informalRepository = async (estado_id, sortBy = "id", order = "ASC") => {
  const whereClause = {};
  if (estado_id !== undefined) whereClause.estado_id = estado_id;

  const { count, rows } = await educacion_informal.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return { data: rows, count };
};

/**
 * Buscar una educacion informal por ID.
 */
export const showeducacion_informalRepository = async (id) => {
  return await educacion_informal.findOne({ where: { id } });
};

/**
 * Crear una nueva educacion informal.
 */
export const storeeducacion_informalRepository = async (data) => {
  return await educacion_informal.create(data);
};

/**
 * Crear múltiples educaciones informales a la vez.
 */
export const storeMultipleEducacionesInformalesRepository = async (educaciones) => {
  return await educacion_informal.bulkCreate(educaciones);
};

/**
 * Actualizar una educacion informal por ID.
 */
export const updateeducacion_informalRepository = async (id, data) => {
  const educacioninformal = await educacion_informal.findOne({ where: { id } });
  if (!educacioninformal) return null;
  await educacioninformal.update(data);
  await educacioninformal.reload();
  return educacioninformal;
};

/**
 * Eliminar una educacion informal por ID.
 */
export const deleteeducacion_informalRepository = async (id) => {
  const educacioninformal = await educacion_informal.findOne({ where: { id } });
  if (!educacioninformal) return null;
  await educacioninformal.destroy();
  return true;
};

/**
 * Buscar una educacion informal por titulo, excluyendo un ID específico.
 */
export const findeducacion_informalByTituloExcludingIdRepository = async (tipo_formacion, idToExclude) => {
  return await educacion_informal.findOne({
    where: {
      tipo_formacion: tipo_formacion,
      id: {
        [Op.ne]: idToExclude
      }
    }
  });
};

/**
 * Buscar una educacion informal por titulo para un usuario específico.
 */
export const findEducacionByTituloYPersonaRepository = async (tipo_formacion, id) => {
  return await educacion_informal.findOne({
    where: {
      tipo_formacion,
      id
    }
  });
};

/**
 * Buscar múltiples educaciones repetidas por titulo para un usuario.
 * Esto sirve para validar duplicados antes de guardar múltiples.
 */
export const findDuplicatedEducacionesInformalesRepository = async (educaciones) => {
  const orConditions = educaciones.map(e => ({
    tipo_formacion: e.tipo_formacion,
    informacion_personal_id: e.informacion_personal_id
  }));

  return await educacion_informal.findAll({
    where: {
      [Op.or]: orConditions
    }
  });
};