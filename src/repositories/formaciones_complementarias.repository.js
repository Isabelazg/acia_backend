import { Op } from "sequelize";
import FormacionComplementaria from "../models/formaciones_complementarias.model.js";

/**
 * Obtener todas las formaciones complementarias con filtros, orden y paginación.
 */
export const getformaciones_complementariasRepository = async ({
  id,
  nombre,
  estado,
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10,
}) => {
  const whereClause = {};
  if (id) whereClause.id = id;
  if (nombre) whereClause.nombre = { [Op.like]: `%${nombre}%` };
  if (estado !== undefined) whereClause.estado = estado;

  const offset = (page - 1) * limit;

  const { count, rows } = await FormacionComplementaria.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

/**
 * Obtener lista de formaciones complementarias (sin paginación).
 */
export const getListformaciones_complementariasRepository = async (
  estado,
  sortBy = "id",
  order = "ASC"
) => {
  const whereClause = {};
  if (estado !== undefined) whereClause.estado = estado;

  const { count, rows } = await FormacionComplementaria.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return { data: rows, count };
};

/**
 * Buscar una formación complementaria por ID.
 */
export const showformaciones_complementariasRepository = async (id) => {
  return await FormacionComplementaria.findOne({ where: { id } });
};

/**
 * Crear una nueva formación complementaria.
 */
export const storeformaciones_complementariasRepository = async (data) => {
  return await FormacionComplementaria.create(data);
};

/**
 * Actualizar una formación complementaria por ID.
 */
export const updateformaciones_complementariasRepository = async (id, data) => {
  const formacion = await FormacionComplementaria.findOne({ where: { id } });
  if (!formacion) return null;
  await formacion.update(data);
  await formacion.reload();
  return formacion;
};

/**
 * Eliminar una formación complementaria por ID.
 */
export const deleteformacionescomplementariasRepository = async (id) => {
  const formacion = await FormacionComplementaria.findOne({ where: { id } });
  if (!formacion) return null;
  await formacion.destroy();
  return true;
};

/**
 * Buscar una formación complementaria por nombre, excluyendo un ID específico.
 */
export const findformaciones_complementariasByNombreExcludingIdRepository = async (
  nombre,
  idToExclude
) => {
  return await FormacionComplementaria.findOne({
    where: {
      nombre: nombre,
      id: {
        [Op.ne]: idToExclude, // [Op.ne] significa "not equal" (no es igual a)
      },
    },
  });
};

/**
 * Verificar si una formación complementaria tiene relaciones asociadas.
 * (ejemplo: si está vinculada a estudiantes, instructores, etc.)
 */
export const checkformaciones_complementariasHasRelacionRepository = async (id) => {
  // Ejemplo: verificar si alguna persona tiene vinculada esta formación
  const relacion = await InformacionPersonal.findOne({
    where: { formaciones_complementarias_id: id }, // Ajusta este campo al real FK en tu DB
  });

  return !!relacion; // Devuelve true si encontró relación
};
