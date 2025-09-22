import FuenteRecurso from '../models/fuenteRecurso.model.js';
import { Op } from 'sequelize';

export const getFuentesRecursosRepository = async ({ nombre, sortBy = "id", order = "ASC", page = 1, limit = 10 }) => {
  const whereClause = {};
  if (nombre) whereClause.nombre = { [Op.like]: `%${nombre}%` };
  const offset = (page - 1) * limit;
  const { count, rows } = await FuenteRecurso.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });
  return { data: rows, count };
};

export const getListFuentesRecursosRepository = async (sortBy = "id", order = "ASC") => {
  const { count, rows } = await FuenteRecurso.findAndCountAll({
    order: [[sortBy, order]],
  });
  return { data: rows, count };
};

export const showFuenteRecursoRepository = async (id) => {
  return await FuenteRecurso.findByPk(id);
};

export const storeFuenteRecursoRepository = async (data) => {
  return await FuenteRecurso.create(data);
};

export const updateFuenteRecursoRepository = async (id, data) => {
  const fuente = await FuenteRecurso.findByPk(id);
  if (!fuente) return null;
  await fuente.update({ ...data, updated_at: new Date() });
  await fuente.reload();
  return fuente;
};

export const deleteFuenteRecursoRepository = async (id) => {
  const fuente = await FuenteRecurso.findByPk(id);
  if (!fuente) return null;
  await fuente.destroy();
  return true;
};