import { Op } from "sequelize";
import sequelize from "../config/db.config.js";
import CodigoRubro from "../models/codigo_rubro.model.js";

/**
 * Repositorio para obtener códigos de rubros con filtros, orden y paginación.
 */
export const getCodigoRubrosRepository = async ({
  id,
  codigo,
  dependencia_id,
  sortBy = 'id',
  order = 'ASC',
  page = 1,
  limit = 10,
  centro_filtro = null
}) => {
  const whereClause = {};
  if (id) whereClause.id = { [Op.eq]: id };
  if (codigo) whereClause.codigo = { [Op.like]: `%${codigo}%` };
  if (dependencia_id) whereClause.dependencia_id = { [Op.eq]: dependencia_id };

  // Filtrar por centro a través de dependencias y centro_dependencia
  if (centro_filtro) {
    whereClause.dependencia_id = {
      [Op.in]: sequelize.literal(`(
        SELECT DISTINCT d.id 
        FROM dependencias d 
        INNER JOIN centro_dependencia cd ON d.id = cd.dependencia_id 
        WHERE cd.centro_id = ${centro_filtro}
      )`)
    };
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await CodigoRubro.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};


/**
 * Repositorio para obtener un código de rubro por ID.
 */
export const showCodigoRubroRepository = async (id) => {
  return await CodigoRubro.findByPk(id);
};

/**
 * Repositorio para crear un nuevo código de rubro.
 */
export const storeCodigoRubroRepository = async (data) => {
  return await CodigoRubro.create(data);
};

/**
 * Repositorio para actualizar un código de rubro por ID.
 */
export const updateCodigoRubroRepository = async (id, data) => {
  const codigoRubro = await CodigoRubro.findByPk(id);
  if (!codigoRubro) return null;

  await codigoRubro.update(data);
  await codigoRubro.reload();
  return codigoRubro;
};

/**
 * Repositorio para eliminar un código de rubro por ID.
 */
export const deleteCodigoRubroRepository = async (id) => {
  const codigoRubro = await CodigoRubro.findByPk(id);
  if (!codigoRubro) return null;

  await codigoRubro.destroy();
  return codigoRubro;
};

/**
 * Repositorio para verificar si un código de rubro tiene rubros asociados.
 */
export const checkCodigoRubroHasRubrosRepository = async (id) => {
  const count = await Rubro.count({
    where: { codigo_rubro_id: id },
  });
  return count > 0;
};

/**
 * Repositorio para obtener la lista de códigos de rubros sin paginación.
 */
export const getListCodigoRubrosRepository = async (dependencia_id, sortBy = 'id', order = 'ASC', centro_filtro = null) => {
  const whereClause = {};
  if (dependencia_id) whereClause.dependencia_id = { [Op.eq]: dependencia_id };

  // Filtrar por centro a través de dependencias y centro_dependencia
  if (centro_filtro) {
    whereClause.dependencia_id = {
      [Op.in]: sequelize.literal(`(
        SELECT DISTINCT d.id 
        FROM dependencias d 
        INNER JOIN centro_dependencia cd ON d.id = cd.dependencia_id 
        WHERE cd.centro_id = ${centro_filtro}
      )`)
    };
  }

  const { count, rows } = await CodigoRubro.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return { data: rows, count };
};