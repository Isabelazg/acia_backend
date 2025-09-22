import { Op } from "sequelize";
import experiencia_laboral from "../models/experiencia_laboral.model.js";

/**
 * Obtener todas las experiencias laborales con filtros, orden y paginación.
 */
export const getexperiencia_laboralRepository = async ({
  id,
  empresa,
  cargo,
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  const whereClause = {};
  if (id) whereClause.id = id;
  if (empresa) whereClause.empresa = { [Op.like]: `%${empresa}%` };
  if (cargo) whereClause.cargo = { [Op.like]: `%${cargo}%` };

  const offset = (page - 1) * limit;

  const { count, rows } = await experiencia_laboral.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

/**
 * Obtener lista de experiencia laboral (sin paginación).
 */
export const getListexperiencia_laboralRepository = async (sortBy = "id", order = "ASC") => {
  const { count, rows } = await experiencia_laboral.findAndCountAll({
    order: [[sortBy, order]],
  });

  return { data: rows, count };
};

/**
 * Buscar una experiencia laboral por ID.
 */
export const showexperiencia_laboralRepository = async (id) => {
  return await experiencia_laboral.findOne({ where: { id } });
};

/**
 * Crear una nueva experiencia laboral.
 */
export const storeexperiencia_laboralRepository = async (data) => {
  return await experiencia_laboral.create(data);
};

/**
 * Crear múltiples experiencias laborales a la vez.
 */
export const storeMultipleExperienciasRepository = async (experiencias) => {
  return await experiencia_laboral.bulkCreate(experiencias);
};

/**
 * Actualizar una experiencia laboral por ID.
 */
export const updateexperiencia_laboralRepository = async (id, data) => {
  const experienciaLaboral = await experiencia_laboral.findOne({ where: { id } });
  if (!experienciaLaboral) return null;
  await experienciaLaboral.update(data);
  await experienciaLaboral.reload();
  return experienciaLaboral;
};

/**
 * Eliminar una experiencia laboral por ID.
 */
export const deleteexperiencia_laboralRepository = async (id) => {
  const experienciaLaboral = await experiencia_laboral.findOne({ where: { id } });
  if (!experienciaLaboral) return null;
  await experienciaLaboral.destroy();
  return true;
};