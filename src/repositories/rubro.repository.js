import { Op } from 'sequelize';
import sequelize from '../config/db.config.js';
import Rubro from '../models/rubro.model.js';

/**
 * Repositorio para obtener rubros con filtros, orden y paginación.
 */
export const getRubrosRepository = async ({
  id, codigo_rubro_id, descripcion, sortBy = 'id', order = 'ASC', page = 1, limit = 10, centro_filtro = null
}) => {
  const whereClause = {};

  if (id) whereClause.id = { [Op.eq]: id };
  if (codigo_rubro_id) whereClause.codigo_rubro_id = { [Op.eq]: codigo_rubro_id };
  if (descripcion) whereClause.descripcion = { [Op.like]: `%${descripcion}%` };

  // Filtrar por centro a través de codigo_rubros -> dependencias -> centro_dependencia
  if (centro_filtro) {
    whereClause.codigo_rubro_id = {
      [Op.in]: sequelize.literal(`(
        SELECT DISTINCT cr.id 
        FROM codigo_rubros cr 
        INNER JOIN dependencias d ON cr.dependencia_id = d.id 
        INNER JOIN centro_dependencia cd ON d.id = cd.dependencia_id 
        WHERE cd.centro_id = ${centro_filtro}
      )`)
    };
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Rubro.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

/**
 * Repositorio para obtener la lista de rubros.
 */
export const getListRubrosRepository = async (sortBy = 'id', order = 'ASC', centro_filtro = null) => {
  const whereClause = {};

  // Filtrar por centro a través de codigo_rubros -> dependencias -> centro_dependencia
  if (centro_filtro) {
    whereClause.codigo_rubro_id = {
      [Op.in]: sequelize.literal(`(
        SELECT DISTINCT cr.id 
        FROM codigo_rubros cr 
        INNER JOIN dependencias d ON cr.dependencia_id = d.id 
        INNER JOIN centro_dependencia cd ON d.id = cd.dependencia_id 
        WHERE cd.centro_id = ${centro_filtro}
      )`)
    };
  }

  const { count, rows } = await Rubro.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return { data: rows, count };
};

/**
 * Repositorio para buscar un rubro por ID.
 */
export const showRubroRepository = async (id) => {
  return await Rubro.findByPk(id);
};

/**
 * Repositorio para crear un nuevo rubro.
 */
export const storeRubroRepository = async (data) => {
  return await Rubro.create(data);
};

/**
 * Repositorio para actualizar un rubro por ID.
 */
export const updateRubroRepository = async (id, data) => {
  const rubro = await Rubro.findByPk(id);
  if (!rubro) return null;

  await rubro.update(data);
  await rubro.reload();
  return rubro;
};