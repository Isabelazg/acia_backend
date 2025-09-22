import { Op } from "sequelize";
import CoordinadorGrupoMixto from "../models/coordinadoresGrupoMixto.model.js";

export const getCoordinadoresGrupoMixtoRepository = async ({
  id,
  nombre,
  estado,
  documento,
  nombres,
  apellidos,
  correo,
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  const whereClause = {};
  if (id) whereClause.id = { [Op.eq]: id };
  if (estado !== undefined) whereClause.estado = { [Op.eq]: estado };

  // Búsqueda flexible por cualquiera de los campos
  const orFilters = [];
  if (documento) orFilters.push({ documento: { [Op.like]: `%${documento}%` } });
  if (nombres) orFilters.push({ nombres: { [Op.like]: `%${nombres}%` } });
  if (apellidos) orFilters.push({ apellidos: { [Op.like]: `%${apellidos}%` } });
  if (correo) orFilters.push({ correo: { [Op.like]: `%${correo}%` } });

  if (orFilters.length > 0) {
    whereClause[Op.or] = orFilters;
  }

  const offset = (page - 1) * limit;
  const { count, rows } = await CoordinadorGrupoMixto.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

export const getListCoordinadoresGrupoMixtoRepository = async (estado, sortBy = "id", order = "ASC") => {
  const whereClause = {};
  if (estado !== undefined) whereClause.estado = { [Op.eq]: estado };
  const { count, rows } = await CoordinadorGrupoMixto.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });
  return { data: rows, count };
};

export const showCoordinadorGrupoMixtoRepository = async (documento) => {
  return await CoordinadorGrupoMixto.findOne({ where: { documento } });
};

export const storeCoordinadorGrupoMixtoRepository = async (data) => {
  return await CoordinadorGrupoMixto.create(data);
};

export const updateCoordinadorGrupoMixtoRepository = async (documento, data) => {
  const coordinador = await CoordinadorGrupoMixto.findOne({ where: { documento } });
  if (!coordinador) return null;
  await coordinador.update({ ...data, updated_at: new Date() });
  await coordinador.reload();
  return coordinador;
};