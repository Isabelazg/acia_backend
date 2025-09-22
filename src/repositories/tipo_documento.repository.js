import { Op } from "sequelize";
import tipo_documento from "../models/tipo_documento.model.js";

/**
 * Obtener todos los tipos de documentos con filtros, orden y paginación.
 */
export const gettipo_documentoRepository = async ({
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

  const { count, rows } = await tipo_documento.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

/**
 * Obtener lista de tipos de documentos (sin paginación).
 */
export const getListtipo_documentoRepository = async (estado, sortBy = "id", order = "ASC") => {
  const whereClause = {};
  if (estado !== undefined) whereClause.estado = estado;

  const { count, rows } = await tipo_documento.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });
  return { data: rows, count };
};

/**
 * Buscar un tipo de documento por ID.
 */
export const showtipo_documentoRepository = async (id) => {
  return await tipo_documento.findOne({ where: { id } });
};

/**
 * Crear una nueva tipo de documento.
 */
export const storetipo_documentoRepository = async (data) => {
  return await tipo_documento.create(data);
};

/**
 * Actualizar una tipo de documento por ID.
 */
export const updatetipo_documentoRepository = async (id, data) => {
  const tipoDocumento = await tipo_documento.findOne({ where: { id } });
  if (!tipoDocumento) return null;
  await tipoDocumento.update(data);
  await tipoDocumento.reload();
  return tipoDocumento;
};

/**
 * Eliminar una tipo de documento por ID.
 */
export const deletetipo_documentoRepository = async (id) => {
  const tipoDocumento = await tipo_documento.findOne({ where: { id } });
  if (!tipoDocumento) return null;
  await tipoDocumento.destroy();
  return true;
};

/**
 * Buscar una tipo de documento por nombre, excluyendo un ID específico.
 */
export const findtipo_documentoByNombreExcludingIdRepository = async (nombre, idToExclude) => {
  return await tipo_documento.findOne({
    where: {
      nombre: nombre,
      id: {
        [Op.ne]: idToExclude // [Op.ne] significa "not equal" (no es igual a)
      }
    }
  });
};
