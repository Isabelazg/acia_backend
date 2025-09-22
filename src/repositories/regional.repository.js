import { Op } from "sequelize";
import Regional from "../models/regional.model.js";
import Centro from "../models/centro.model.js";

/**
 * Repositorio para obtener regionales con filtros, orden y paginación.
 */
export const getRegionalsRepository = async ({
  id,
  codigo,
  nombre,
  estado,
  search, // Nuevo parámetro para búsqueda global
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  const whereClause = {};

  if (id) {
    whereClause.id = { [Op.eq]: id };
  }

  if (estado !== undefined) {
    whereClause.estado = { [Op.eq]: estado };
  }

  // Búsqueda global: buscar en múltiples campos y formatos
  if (search) {
    // Convertir el término de búsqueda a snake_case para coincidir con códigos
    const searchSnakeCase = search
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');

    whereClause[Op.or] = [
      { codigo: { [Op.like]: `%${search}%` } },
      { codigo: { [Op.like]: `%${searchSnakeCase}%` } },
      { nombre: { [Op.like]: `%${search}%` } }
    ];
  } else {
    // Solo aplicar filtros específicos si no hay búsqueda global
    if (codigo) {
      whereClause.codigo = { [Op.eq]: codigo };
    }
    if (nombre) {
      whereClause.nombre = { [Op.like]: `%${nombre}%` };
    }
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Regional.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return {
    data: rows,
    count,
  };
};

/**
 * Repositorio para la lista de regionales.
 */
export const getListRegionalsRepository = async (estado, sortBy = "id", order = "ASC") => {
  const whereClause = {};

  if (estado !== undefined) {
    whereClause.estado = { [Op.eq]: estado };
  }

  const { count, rows } = await Regional.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return {
    data: rows,
    count,
  };
};

/**
 * Buscar un regional por código.
 */
export const showRegionalRepository = async (code) => {
  return await Regional.findOne({
    where: { codigo: code }, // Correcto: Se utiliza la cláusula where
  });
};

/**
 * Crear un nuevo regional.
 */
export const storeRegionalRepository = async (data) => {
  return await Regional.create(data);
};

/**
 * Actualizar un regional por código.
 */
export const updateRegionalRepository = async (code, data) => {
  const regional = await Regional.findOne({ where: { codigo: code } });
  if (!regional) return null;

  // Agregar timestamp de actualización
  const updateData = {
    ...data,
    updated_at: new Date()
  };

  await regional.update(updateData);
  await regional.reload();
  return regional;
};

/**
 * Verificar si una regional tiene centros asociados.
 */
export const checkReginalHasCenterRepository = async (id) => {
  const count = await Centro.count({
    where: { regional_id: id }
  });
  return count > 0;
};


