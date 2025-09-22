
import { Op } from "sequelize";
import Coordinador from "../models/coordinador.model.js";
import Centro from "../models/centro.model.js";

/**
 * Repositorio para obtener coordinadores con filtros, orden y paginación.
 */
export const getCoordinadoresRepository = async ({
  id,
  centros_id,
  search,
  estado,
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  const whereClause = {};

  if (id) whereClause.id = { [Op.eq]: id };
  if (centros_id) whereClause.centros_id = { [Op.eq]: centros_id };
  // Nota: la columna `estado` fue removida de la base de datos.
  // No añadimos condiciones sobre `estado` para evitar consultas a una columna inexistente.

  // Búsqueda global: buscar en múltiples campos
  if (search) {
    whereClause[Op.or] = [
      { nombre: { [Op.like]: `%${search}%` } },
      { descripcion: { [Op.like]: `%${search}%` } }
    ];
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Coordinador.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
    include: [
      {
        model: Centro,
        as: 'centro',
        attributes: ['id', 'codigo', 'nombre']
      }
    ]
  });

  return { data: rows, count };
};

/**
 * Repositorio para la lista de coordinadores.
 */
export const getListCoordinadoresRepository = async (estado, sortBy = "id", order = "ASC", centros_id) => {
  const whereClause = {};
  if (centros_id !== undefined) whereClause.centros_id = { [Op.eq]: centros_id };
  // Nota: no aplicamos filtro por `estado` ya que la columna no existe en la BD.
  const { count, rows } = await Coordinador.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    include: [
      {
        model: Centro,
        as: 'centro',
        attributes: ['id', 'codigo', 'nombre']
      }
    ]
  });
  return { data: rows, count };
};

/**
 * Buscar un coordinador por id.
 */
export const showCoordinadorRepository = async (id) => {
  return await Coordinador.findOne({
    where: { id },
    include: [
      {
        model: Centro,
        as: 'centro',
        attributes: ['id', 'codigo', 'nombre']
      }
    ]
  });
};

/**
 * Crear un nuevo coordinador.
 */
export const storeCoordinadorRepository = async (data) => {
  return await Coordinador.create(data);
};


/**
 * Actualizar un coordinador por id.
 */
export const updateCoordinadorRepository = async (id, data) => {
  const coordinador = await Coordinador.findOne({ where: { id } });
  if (!coordinador) return null;
  const updateData = { ...data, updated_at: new Date() };
  await coordinador.update(updateData);
  await coordinador.reload();
  return coordinador;
};

/**
 * Cambiar el estado de un coordinador por id.
 */
export const changeCoordinadorStatusRepository = async (id, estado) => {
  // Esta operación no está implementada porque la columna `estado` no existe en la tabla coordinadores.
  // Lanzamos un error controlado para que los servicios/controladores manejen adecuadamente.
  const error = new Error('CAMBIAR_ESTADO_NO_IMPLEMENTADO');
  error.code = 'NOT_IMPLEMENTED';
  throw error;
};

/**
 * Verificar si un centro tiene coordinadores asociados.
 */
export const checkCentroHasCoordinadorRepository = async (centroId) => {
  const count = await Coordinador.count({
    where: { centros_id: centroId }
  });
  return count > 0;
};
