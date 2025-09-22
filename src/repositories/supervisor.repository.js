import { Op } from 'sequelize';
import sequelize from '../config/db.config.js';
import Supervisor from '../models/supervisor.model.js';

/**
 * Repositorio para obtener supervisores con filtros, orden y paginación.
 */
const SUPERVISOR_FIELDS = [
  'id', 'documento', 'nombres', 'apellidos', 'sexo', 'correo', 'cargo', 'estado', 'created_at', 'updated_at'
];

export const getSupervisoresRepository = async ({
  id,
  documento,
  nombres,
  apellidos,
  sexo,
  correo,
  search,
  cargo,
  estado,
  centro_filtro,
  sortBy = 'id',
  order = 'ASC',
  page = 1,
  limit = 10,
}) => {
  const whereClause = {};

  if (id) whereClause.id = { [Op.eq]: id };
  if (documento) whereClause.documento = { [Op.like]: `%${documento}%` };
  if (nombres) whereClause.nombres = { [Op.like]: `%${nombres}%` };
  if (apellidos) whereClause.apellidos = { [Op.like]: `%${apellidos}%` };
  if (sexo !== undefined) whereClause.sexo = { [Op.eq]: sexo };
  if (correo) whereClause.correo = { [Op.like]: `%${correo}%` };
  if (cargo) whereClause.cargo = { [Op.like]: `%${cargo}%` };
  // Búsqueda global: si viene `search`, buscar en documento, nombres y correo
  if (search) {
    whereClause[Op.or] = [
      { documento: { [Op.like]: `%${search}%` } },
      { nombres: { [Op.like]: `%${search}%` } },
      { correo: { [Op.like]: `%${search}%` } },
    ];
  }
  if (estado !== undefined) {
    // Permite "1", "0", true, false, "true", "false"
    if (estado === "1" || estado === 1 || estado === true || estado === "true") {
      whereClause.estado = true
    } else if (estado === "0" || estado === 0 || estado === false || estado === "false") {
      whereClause.estado = false
    }
  }

  // Aplicar filtro por centro si se proporciona
  if (centro_filtro) {
    whereClause.id = {
      [Op.in]: sequelize.literal(`
        (SELECT supervisores_id FROM centros WHERE id = ${parseInt(centro_filtro)} AND supervisores_id IS NOT NULL)
      `)
    };
  }

  // Validar sortBy
  const sortField = SUPERVISOR_FIELDS.includes(sortBy) ? sortBy : 'id';
  const sortOrder = ['ASC', 'DESC'].includes(order.toUpperCase()) ? order.toUpperCase() : 'ASC';

  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Supervisor.findAndCountAll({
      where: whereClause,
      order: [[sortField, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    return {
      data: rows,
      count,
    };
  } catch (error) {
    console.error('Error en findAndCountAll:', error);
    throw error;
  }
};

/**
 * Repositorio para la lista de supervisores.
 */
export const getListSupervisoresRepository = async (sortBy = 'id', order = 'ASC', centro_filtro = null) => {
  const whereClause = {};

  // Aplicar filtro por centro si se proporciona
  if (centro_filtro) {
    whereClause.id = {
      [Op.in]: sequelize.literal(`
        (SELECT supervisores_id FROM centros WHERE id = ${parseInt(centro_filtro)} AND supervisores_id IS NOT NULL)
      `)
    };
  }

  const { count, rows } = await Supervisor.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return {
    data: rows,
    count,
  };
};

/**
 * Buscar un supervisor por ID.
 */
export const showSupervisorRepository = async (id) => {
  return await Supervisor.findByPk(id);
};

/**
 * Crear un nuevo supervisor.
 */
export const storeSupervisorRepository = async (data) => {
  return await Supervisor.create(data);
};

/**
 * Actualizar un supervisor por ID.
 */
export const updateSupervisorRepository = async (id, data) => {
  const supervisor = await Supervisor.findByPk(id);
  if (!supervisor) return null;

  const updateData = {
    ...data,
    updated_at: new Date(),
  };

  await supervisor.update(updateData);
  await supervisor.reload();
  return supervisor;
};