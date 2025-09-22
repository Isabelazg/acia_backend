import { Op } from "sequelize";
import Ciudad from "../models/ciudad.model.js";
import Provincia from "../models/provincia.model.js";

/**
 * Repositorio para obtener ciudades con filtros, orden y paginación.
 */
export const getCitiesRepository = async ({
  id,
  nombre,
  search, // Nuevo parámetro para búsqueda global
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10,
  pagination = "true",
}) => {
  const where = {};
  if (id) where.id = id;

  // Búsqueda global: buscar en el nombre
  if (search) {
    where[Op.or] = [
      { nombre: { [Op.like]: `%${search}%` } }
    ];
  } else {
    // Solo aplicar filtros específicos si no hay búsqueda global
    if (nombre) where.nombre = { [Op.like]: `%${nombre}%` };
  }


  const allowedSort = ["id", "nombre"];
  const orderBy = allowedSort.includes(sortBy) ? sortBy : "id";
  const orderDirection = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

  if (pagination === "false") {
    const ciudades = await Ciudad.findAll({
      where,
      order: [[orderBy, orderDirection]],
      include: [{ model: Provincia, as: "provincia", attributes: ["id", "nombre"] }],
    });
    return { data: ciudades, count: ciudades.length };
  } else {
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const { rows, count } = await Ciudad.findAndCountAll({
      where,
      order: [[orderBy, orderDirection]],
      limit: parseInt(limit),
      offset,
      include: [{ model: Provincia, as: "provincia", attributes: ["id", "nombre"] }],
    });
    return { data: rows, count };
  }
};

/**
 * Buscar una ciudad por id.
 */
export const showCityRepository = async (id) => {
  return await Ciudad.findByPk(id, {
    include: [{ model: Provincia, as: "provincia", attributes: ["id", "provincia"] }],
  });
};

/**
 * Repositorio para obtener las ciudades de una provincia por su ID.
 */
export const getCitiesByProvinceRepository = async (provinceId, sortBy = "id", order = "ASC") => {
  const whereClause = { provincia_id: provinceId };

  const { count, rows } = await Ciudad.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    include: [{ model: Provincia, as: "provincia", attributes: ["id", "nombre"] }], // Cambiado "provincia" a "nombre"
  });

  return {
    data: rows,
    count,
  };
};
