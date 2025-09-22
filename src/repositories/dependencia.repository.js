import { Op } from "sequelize";
import sequelize from "../config/db.config.js";
import Dependencia from "../models/dependencia.model.js";
import CentroDependencia from "../models/centroDependencia.model.js"; // Debes tener este modelo

/**
 * Obtener dependencias con filtros, orden y paginación.
 */
export const getDependenciasRepository = async ({
  id,
  codigo,
  nombre,
  centro_filtro,
  estado,
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  let whereClause = {};

  if (id) whereClause.id = { [Op.eq]: id };

  // Búsqueda por nombre o código (OR)
  if (codigo || nombre) {
    whereClause[Op.or] = [];
    if (codigo) {
      whereClause[Op.or].push({ codigo: { [Op.like]: `%${codigo}%` } });
    }
    if (nombre) {
      whereClause[Op.or].push({ nombre: { [Op.like]: `%${nombre}%` } });
    }
  }

  if (typeof estado !== 'undefined' && estado !== null && estado !== '') {
    whereClause.estado = estado === '1' ? true : false;
  }

  // Aplicar filtro por centro si se proporciona (a través de centro_dependencia)
  if (centro_filtro) {
    whereClause.id = {
      [Op.in]: sequelize.literal(`
        (SELECT dependencia_id FROM centro_dependencia WHERE centro_id = ${parseInt(centro_filtro)})
      `)
    };
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Dependencia.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

/**
 * Obtener lista de dependencias.
 */
export const getListDependenciasRepository = async (sortBy = "id", order = "ASC", centro_filtro = null) => {
  const whereClause = {};

  // Aplicar filtro por centro si se proporciona (a través de centro_dependencia)
  if (centro_filtro) {
    whereClause.id = {
      [Op.in]: sequelize.literal(`
        (SELECT dependencia_id FROM centro_dependencia WHERE centro_id = ${parseInt(centro_filtro)})
      `)
    };
  }

  const { count, rows } = await Dependencia.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });
  return { data: rows, count };
};

/**
 * Buscar una dependencia por código.
 */
export const showDependenciaRepository = async (codigo) => {
  return await Dependencia.findOne({ where: { codigo } });
};

/**
 * Crear una nueva dependencia.
 */
export const storeDependenciaRepository = async (data) => {
  return await Dependencia.create(data);
};

/**
 * Actualizar una dependencia por código.
 */
export const updateDependenciaRepository = async (codigo, data) => {
  const dependencia = await Dependencia.findOne({ where: { codigo } });
  if (!dependencia) return null;

  const updateData = {
    ...data,
    updated_at: new Date()
  };

  await dependencia.update(updateData);
  await dependencia.reload();
  return dependencia;
};

export const getDependenciasByCentroRepository = async (centroId) => {
  return await Dependencia.findAll({
    include: [{
      model: CentroDependencia,
      as: 'centroDependencias',
      where: { centro_id: centroId },
      attributes: []
    }]
  });
};