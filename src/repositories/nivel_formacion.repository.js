import { Op } from "sequelize";
import nivel_formacion from "../models/nivel_formacion.model.js";

/**
 * Obtener todos los niveles de formacion con filtros, orden y paginación.
 */
export const getnivel_formacionRepository = async ({
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

  const { count, rows } = await nivel_formacion.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

/**
 * Obtener lista de nivel de formacion (sin paginación).
 */
export const getListnivel_formacionRepository = async (estado, sortBy = "id", order = "ASC") => {
  const whereClause = {};
  if (estado !== undefined) whereClause.estado = estado;

  const { count, rows } = await nivel_formacion.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return { data: rows, count };
};

/**
 * Buscar un nivel de formacion por ID.
 */
export const shownivel_formacionRepository = async (id) => {
  return await nivel_formacion.findOne({ where: { id } });
};

/**
 * Crear un nuevo nivel de formacion.
 */
export const storenivel_formacionRepository = async (data) => {
  return await nivel_formacion.create(data);
};

/**
 * Actualizar un nivel de formacion por ID.
 */
export const updatenivel_formacionRepository = async (id, data) => {
  const nivel_Formacion = await nivel_formacion.findOne({ where: { id } });
  if (!nivel_Formacion) return null;
  await nivel_Formacion.update(data);
  await nivel_Formacion.reload();
  return nivel_Formacion;
};

/**
 * Eliminar un nivel de formacion por ID.
 */
export const deletenivel_formacionRepository = async (id) => {
  const nivel_Formacion = await nivel_formacion.findOne({ where: { id } });
  if (!nivel_Formacion) return null;
  await nivel_Formacion.destroy();
  return true;
};

/**
 * Buscar un nivel de formacion por nombre, excluyendo un ID específico.
 */
export const findnivel_formacionByNombreExcludingIdRepository = async (nombre, idToExclude) => {
  return await nivel_formacion.findOne({
    where: {
      nombre: nombre,
      id: {
        [Op.ne]: idToExclude // [Op.ne] significa "not equal" (no es igual a)
      }
    }
  });
};
