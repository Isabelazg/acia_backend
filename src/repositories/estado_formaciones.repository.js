import { Op } from "sequelize";
import estado_formaciones from "../models/estado_formaciones.model.js";

/**
 * Obtener todos los tipos de estados de formaciones con filtros, orden y paginación.
 */
export const getestado_formacionesRepository = async ({
  id,
  nombre,
  estado,
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  const whereClause = {};
  if (id) whereClause.id = id;
  if (nombre) whereClause.nombre = { [Op.like]: `%${nombre}%` };
  if (estado !== undefined) whereClause.estado = estado;

  const offset = (page - 1) * limit;

  const { count, rows } = await estado_formaciones.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

/**
 * Obtener lista de estados de formaciones (sin paginación).
 */
export const getListestado_formacionesRepository = async (estado, sortBy = "id", order = "ASC") => {
  const whereClause = {};
  if (estado !== undefined) whereClause.estado = estado;

  const { count, rows } = await estado_formaciones.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return { data: rows, count };
};

/**
 * Buscar un estado de formacion por ID.
 */
export const showestado_formacionesRepository = async (id) => {
  return await estado_formaciones.findOne({ where: { id } });
};

/**
 * Crear un nuevo estado de formacion.
 */
export const storeestado_formacionesRepository = async (data) => {
  return await estado_formaciones.create(data);
};

/**
 * Actualizar un estado de formacion por ID.
 */
export const updateestado_formacionesRepository = async (id, data) => {
  // 💡 CAMBIO AQUÍ: Usamos un nombre diferente para la variable local (e.g., 'foundEstadoFormacion')
  const foundEstadoFormacion = await estado_formaciones.findOne({ where: { id } });
  if (!foundEstadoFormacion) return null;
  await foundEstadoFormacion.update(data);
  await foundEstadoFormacion.reload();
  return foundEstadoFormacion;
};

/**
 * Eliminar un estado de formacion por ID.
 */
export const deleteestado_formacionesRepository = async (id) => {
  const foundEstadoFormacion = await estado_formaciones.findOne({ where: { id } }); // También aquí, por consistencia
  if (!foundEstadoFormacion) return null;
  await foundEstadoFormacion.destroy();
  return true;
};

/**
 * Buscar un estado de formacion por nombre, excluyendo un ID específico.
 */
export const findestado_formacionesByNombreExcludingIdRepository = async (nombre, idToExclude) => {
  return await estado_formaciones.findOne({
    where: {
      nombre: nombre,
      id: {
        [Op.ne]: idToExclude // [Op.ne] significa "not equal" (no es igual a)
      }
    }
  });
};

export const getListnivel_formacionRepository = async (estado, sortBy = "id", order = "ASC") => {
  const whereClause = {};
  if (estado !== undefined) whereClause.estado = estado;

  const { count, rows } = await nivel_formacion.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return { data: rows, count };
};
