import { Op } from "sequelize";
import sequelize from '../config/db.config.js';
import Area from "../models/area.model.js";
import Centro from "../models/centro.model.js";

/**
 * Repositorio para obtener áreas con filtros, orden y paginación.
 */
const AREA_FIELDS = [
  'id', 'nombre', 'estado', 'created_at', 'updated_at'
];

export const getAreasRepository = async ({
  id,
  nombre,
  estado,
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  const whereClause = {};

  if (id) {
    whereClause.id = { [Op.eq]: id };
  }
  if (nombre) {
    whereClause.nombre = { [Op.like]: `%${nombre}%` };
  }
  if (estado !== undefined) {
    whereClause.estado = { [Op.eq]: estado };
  } {
    // Permite "1", "0", true, false, "true", "false"
    if (estado === "1" || estado === 1 || estado === true || estado === "true") {
      whereClause.estado = true
    } else if (estado === "0" || estado === 0 || estado === false || estado === "false") {
      whereClause.estado = false
    }
  }


  // Validar sortBy
  const sortField = AREA_FIELDS.includes(sortBy) ? sortBy : 'id';
  const sortOrder = ['ASC', 'DESC'].includes(order.toUpperCase()) ? order.toUpperCase() : 'ASC';

  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Area.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Centro,
          as: 'centros',
          attributes: ['id'],
          through: { attributes: [] },
          required: false
        }
      ],
      order: [[sortField, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    const formattedAreas = rows.map(area => {
      const areaData = area.toJSON();
      return {
        ...areaData,
        centros_count: areaData.centros ? areaData.centros.length : 0
      };
    });
    return {
      data: formattedAreas,
      count,
    };
  } catch (error) {
    console.error('Error en findAndCountAll:', error);
    throw error;
  }
};



/**
 * Repositorio para obtener la lista de áreas sin paginación.
 */
export const getListAreasRepository = async (sortBy = "id", order = "ASC", centro_filtro, page = 1, limit = 10) => {
  const whereClause = {};

  // Aplicar filtro por centro si se proporciona
  if (centro_filtro) {
    whereClause.id = {
      [Op.in]: sequelize.literal(`
        (SELECT areas_id FROM centros WHERE id = ${parseInt(centro_filtro)} AND area_id IS NOT NULL)
      `)
    };
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Area.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return {
    data: rows,
    count,
  };
};

/**
 * Repositorio para buscar un área por ID.
 */
export const showAreaRepository = async (id) => {
  return await Area.findByPk(id);
};

/**
 * Repositorio para crear un área.
 */
export const storeAreaRepository = async (data) => {
  return await Area.create(data);
};

/**
 * Repositorio para actualizar un área por ID.
 */
export const updateAreaRepository = async (id, data) => {
  const area = await Area.findByPk(id);
  if (!area) return null;

  const updateData = {
    ...data,
    updated_at: new Date(),
  };

  await area.update(updateData);
  await area.reload();
  return area;
};

/**
 * Repositorio para cambiar el estado de un área por ID.
 */
export const changeAreaStatusRepository = async (id, estado) => {
  const area = await Area.findByPk(id);
  if (!area) return null;

  const updateData = {
    estado,
    updated_at: new Date(),
  };

  await area.update(updateData);
  await area.reload();
  return area;
};

/**
 * Consultar los centros asociados a un área
 */
export const getCentrosByAreaRepository = async (areaId) => {
  const area = await Area.findByPk(areaId, {
    include: [
      {
        association: 'centros',
        attributes: ['id', 'codigo', 'nombre', 'estado', 'created_at', 'updated_at'],
        where: { estado: 1 },
      },
    ],
  });
  if (!area) return null;
  return area.centros;
};