import { Op } from 'sequelize';
import TipoContratacion from '../models/tipo_contratacion.model.js';
import Autorizacion from '../models/autorizacion.model.js';

/**
 * Repositorio para obtener tipos de contratación con filtros, orden y paginación.
 */
export const getTipoContratacionRepository = async ({ id, nombre, estado, sortBy = 'id', order = 'ASC', page = 1, limit = 10 }) => {
  const whereClause = {};

  if (id) whereClause.id = { [Op.eq]: id };
  if (nombre) whereClause.nombre = { [Op.like]: `%${nombre}%` };
  if (estado !== undefined) whereClause.estado = { [Op.eq]: estado };

  const offset = (page - 1) * limit;

  const { count, rows } = await TipoContratacion.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

/**
 * Repositorio para obtener la lista de tipos de contratación sin paginación.
 */
export const getListTipoContratacionRepository = async (estado, sortBy = 'id', order = 'ASC') => {
  const whereClause = {};

  if (estado !== undefined) whereClause.estado = { [Op.eq]: estado };

  const { count, rows } = await TipoContratacion.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return { data: rows, count };
};

/**
 * Repositorio para crear un nuevo tipo de contratación.
 */
export const storeTipoContratacionRepository = async (data) => {
  return await TipoContratacion.create(data);
};

/**
 * Repositorio para buscar un tipo de contratación por ID.
 */
export const showTipoContratacionRepository = async (id) => {
  return await TipoContratacion.findByPk(id);
};

/**
 * Repositorio para actualizar un tipo de contratación por ID.
 */
export const updateTipoContratacionRepository = async (id, data) => {
  const tipoContratacion = await TipoContratacion.findByPk(id);
  if (!tipoContratacion) return null;

  await tipoContratacion.update(data);
  await tipoContratacion.reload();
  return tipoContratacion;
};

/**
 * Repositorio para verificar si un tipo de contratación está asociado a una autorización.
 */
export const checkTipoContratacionHasAutorizacionesRepository = async (id) => {
  const count = await Autorizacion.count({
    where: { tipo_contratacion_id: id },
  });
  return count > 0;
};

/**
 * Repositorio para eliminar un tipo de contratación por ID.
 */
export const deleteTipoContratacionRepository = async (id) => {
  const tipoContratacion = await TipoContratacion.findByPk(id);
  if (!tipoContratacion) return null;

  await tipoContratacion.destroy();
  return tipoContratacion;
};