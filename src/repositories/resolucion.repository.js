import { Op } from "sequelize";
import Resolucion from "../models/resolucion.model.js";
import Centro from "../models/centro.model.js";
import Ordenador from "../models/ordenador.model.js";

/**
 * Repositorio para obtener resoluciones con filtros, orden y paginación.
 */
export const getResolucionesRepository = async ({
  id,
  fecha,
  acta_posesion,
  fecha_posesion,
  fecha_ingreso,
  fecha_retiro,
  es_encargado,
  centro_id,
  ordenadores_id,
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
  if (fecha) {
    whereClause.fecha = { [Op.eq]: fecha };
  }
  if (acta_posesion) {
    whereClause.acta_posesion = { [Op.like]: `%${acta_posesion}%` };
  }
  if (fecha_posesion) {
    whereClause.fecha_posesion = { [Op.eq]: fecha_posesion };
  }
  if (fecha_ingreso) {
    whereClause.fecha_ingreso = { [Op.eq]: fecha_ingreso };
  }
  if (fecha_retiro) {
    whereClause.fecha_retiro = { [Op.eq]: fecha_retiro };
  }
  if (es_encargado !== undefined) {
    whereClause.es_encargado = { [Op.eq]: es_encargado };
  }
  if (centro_id) {
    whereClause.centro_id = { [Op.eq]: centro_id };
  }
  if (ordenadores_id) {
    whereClause.ordenadores_id = { [Op.eq]: ordenadores_id };
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Resolucion.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: Centro,
        as: 'centro',
        attributes: ['id', 'codigo', 'nombre']
      },
      {
        model: Ordenador,
        as: 'ordenador',
        attributes: ['id', 'documento', 'nombres', 'apellidos']
      }
    ],
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
 * Repositorio para la lista de resoluciones.
 */
export const getListResolucionesRepository = async (sortBy = "id", order = "ASC") => {
  const { count, rows } = await Resolucion.findAndCountAll({
    include: [
      {
        model: Centro,
        as: 'centro',
        attributes: ['id', 'codigo', 'nombre']
      },
      {
        model: Ordenador,
        as: 'ordenador',
        attributes: ['id', 'documento', 'nombres', 'apellidos']
      }
    ],
    order: [[sortBy, order]],
  });

  return {
    data: rows,
    count,
  };
};

/**
 * Buscar una resolución por ID.
 */
export const showResolucionByIdRepository = async (id) => {
  return await Resolucion.findOne({
    where: { id },
    include: [
      {
        model: Centro,
        as: 'centro',
        attributes: ['id', 'codigo', 'nombre']
      },
      {
        model: Ordenador,
        as: 'ordenador',
        attributes: ['id', 'documento', 'nombres', 'apellidos']
      }
    ]
  });
};

/**
 * Crear una nueva resolución.
 */
export const storeResolucionRepository = async (data) => {
  return await Resolucion.create(data);
};

/**
 * Actualizar una resolución por ID.
 */
export const updateResolucionByIdRepository = async (id, data) => {
  const resolucion = await Resolucion.findOne({ where: { id } });
  if (!resolucion) return null;

  // Agregar timestamp de actualización
  const updateData = {
    ...data,
    updated_at: new Date()
  };

  await resolucion.update(updateData);
  await resolucion.reload({
    include: [
      {
        model: Centro,
        as: 'centro',
        attributes: ['id', 'codigo', 'nombre']
      },
      {
        model: Ordenador,
        as: 'ordenador',
        attributes: ['id', 'documento', 'nombres', 'apellidos']
      }
    ]
  });
  return resolucion;
};

/**
 * Eliminar una resolución por ID.
 */
export const deleteResolucionByIdRepository = async (id) => {
  const resolucion = await Resolucion.findOne({ where: { id } });
  if (!resolucion) return null;

  await resolucion.destroy();
  return resolucion;
};
