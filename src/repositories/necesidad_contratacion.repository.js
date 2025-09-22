import { Op } from "sequelize";
import necesidad_contratacion from "../models/necesidad_contratacion.model.js";

/**
 * Obtener todos las necesidades de contratacion con filtros, orden y paginación.
 */
export const getnecesidad_contratacionRepository = async ({
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

  const { count, rows } = await necesidad_contratacion.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

/**
 * Obtener lista de necesidades de contratacion (sin paginación).
 */
export const getListnecesidad_contratacionRepository = async (estado, sortBy = "id", order = "ASC") => {
  const whereClause = {};
  if (estado !== undefined) whereClause.estado = estado;

  const { count, rows } = await necesidad_contratacion.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return { data: rows, count };
};

/**
 * Buscar una necesidad de contratacion por ID.
 */
export const shownecesidad_contratacionRepository = async (id) => {
  return await necesidad_contratacion.findOne({ where: { id } });
};

/**
 * Crear una nueva necesidad de contratacion.
 */
export const storenecesidad_contratacionRepository = async (data) => {
  return await necesidad_contratacion.create(data);
};

/**
 * Actualizar una necesidad de contratacion por ID.
 */
export const updatenecesidad_contratacionRepository = async (id, data) => {
  const necesidadContratacion = await necesidad_contratacion.findOne({ where: { id } });
  if (!necesidadContratacion) return null;
  await necesidadContratacion.update(data);
  await necesidadContratacion.reload();
  return necesidadContratacion;
};

/**
 * Eliminar una necesidad de contratacion por ID.
 */
export const deletenecesidad_contratacionRepository = async (id) => {
  const necesidadContratacion = await necesidad_contratacion.findOne({ where: { id } });
  if (!necesidadContratacion) return null;
  await necesidadContratacion.destroy();
  return true;
};

/**
 * Buscar una necesidad de contratacion por nombre, excluyendo un ID específico.
 */
export const findnecesidad_contratacionByNombreExcludingIdRepository = async (nombre, idToExclude) => {
  return await necesidad_contratacion.findOne({
    where: {
      nombre: nombre,
      id: {
        [Op.ne]: idToExclude // [Op.ne] significa "not equal" (no es igual a)
      }
    }
  });
};
