import { Op } from 'sequelize';
// ⭐ Importar el modelo en singular desde el archivo con nombre singular ⭐
import Obligacion from '../../src/models/Obligaciones.model.js'; // Asegúrate de que la ruta sea correcta

/**
 * Campos permitidos para ordenar y filtrar en el modelo Obligacion.
 */
const OBLIGACION_FIELDS = [
  'id',
  'numero_orden',
  'nombre',
  'created_at',
  'updated_at'
];

/**
 * Obtener todas las obligaciones con filtros, orden y paginación.
 */
export const getObligacionesRepository = async ({
  id,
  numero_orden,
  nombre,
  sortBy = 'id',
  order = 'ASC',
  page = 1,
  limit = 10,
}) => {
  const whereClause = {};

  if (id) whereClause.id = { [Op.eq]: id };
  if (numero_orden) whereClause.numero_orden = { [Op.like]: `%${numero_orden}%` };
  if (nombre) whereClause.nombre = { [Op.like]: `%${nombre}%` };

  const sortField = OBLIGACION_FIELDS.includes(sortBy) ? sortBy : 'id';
  const sortOrder = ['ASC', 'DESC'].includes(order.toUpperCase()) ? order.toUpperCase() : 'ASC';

  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Obligacion.findAndCountAll({ // Usar 'Obligacion' singular
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
    console.error('Error en getObligacionesRepository:', error);
    throw error;
  }
};

/**
 * Obtener lista de obligaciones (sin paginación).
 */
export const getListObligacionesRepository = async (sortBy = 'id', order = 'ASC') => {
  const sortField = OBLIGACION_FIELDS.includes(sortBy) ? sortBy : 'id';
  const sortOrder = ['ASC', 'DESC'].includes(order.toUpperCase()) ? order.toUpperCase() : 'ASC';

  try {
    const { count, rows } = await Obligacion.findAndCountAll({ // Usar 'Obligacion' singular
      order: [[sortField, sortOrder]],
    });

    return {
      data: rows,
      count,
    };
  } catch (error) {
    console.error('Error en getListObligacionesRepository:', error);
    throw error;
  }
};

/**
 * Buscar una obligación por ID.
 */
export const showObligacionRepository = async (id) => {
  try {
    return await Obligacion.findByPk(id); // Usar 'Obligacion' singular
  } catch (error) {
    console.error('Error en showObligacionRepository:', error);
    throw error;
  }
};

/**
 * Crear una nueva obligación.
 */
export const storeObligacionRepository = async (data) => {
  try {
    // Validación para 'numero_orden' al crear
    if (data.numero_orden) {
      const existingObligacionByNumeroOrden = await findObligacionByNumeroOrdenExcludingIdRepository(data.numero_orden, null);
      if (existingObligacionByNumeroOrden) {
        const error = new Error(`El número de orden "${data.numero_orden}" ya está registrado. No se puede repetir el número de orden.`);
        error.code = "DUPLICATE_OBLIGACION_NUMERO_ORDEN";
        throw error;
      }
    }

    // Validación para 'nombre' al crear
    if (data.nombre) {
      const existingObligacionByNombre = await findObligacionByNombreExcludingIdRepository(data.nombre, null);
      if (existingObligacionByNombre) {
        const error = new Error(`El nombre "${data.nombre}" ya está registrado. No se puede repetir el nombre.`);
        error.code = "DUPLICATE_OBLIGACION_NAME";
        throw error;
      }
    }

    return await Obligacion.create(data); // Usar 'Obligacion' singular
  } catch (error) {
    console.error('Error en storeObligacionRepository:', error);
    throw error;
  }
};

/**
 * Actualizar una obligación por ID.
 */
export const updateObligacionRepository = async (id, data) => {
  try {
    const obligacion = await Obligacion.findByPk(id); // Usar 'Obligacion' singular
    if (!obligacion) return null;

    // Validación para numero_orden (ya existente, si es único)
    if (data.numero_orden && data.numero_orden !== obligacion.numero_orden) {
      const existingObligacionByNumeroOrden = await findObligacionByNumeroOrdenExcludingIdRepository(data.numero_orden, id);
      if (existingObligacionByNumeroOrden) {
        const error = new Error(`El número de orden "${data.numero_orden}" ya está registrado. No se puede repetir el número de orden.`);
        error.code = "DUPLICATE_OBLIGACION_NUMERO_ORDEN";
        throw error;
      }
    }

    // Validación para 'nombre'
    if (data.nombre && data.nombre !== obligacion.nombre) {
      const existingObligacionByNombre = await findObligacionByNombreExcludingIdRepository(data.nombre, id);
      if (existingObligacionByNombre) {
        const error = new Error(`El nombre "${data.nombre}" ya está registrado. No se puede repetir el nombre.`);
        error.code = "DUPLICATE_OBLIGACION_NAME";
        throw error;
      }
    }

    const updateData = {
      ...data,
      updated_at: new Date(),
    };

    await obligacion.update(updateData);
    await obligacion.reload();
    return obligacion;
  } catch (error) {
    console.error('Error en updateObligacionRepository:', error);
    throw error;
  }
};

/**
 * Eliminar una obligación por ID.
 */
export const deleteObligacionRepository = async (id) => {
  try {
    const obligacion = await Obligacion.findByPk(id); // Usar 'Obligacion' singular
    if (!obligacion) return null;
    await obligacion.destroy();
    return true;
  } catch (error) {
    console.error('Error en deleteObligacionRepository:', error);
    throw error;
  }
};

/**
 * Buscar una obligación por numero_orden, excluyendo un ID específico.
 */
export const findObligacionByNumeroOrdenExcludingIdRepository = async (numero_orden, idToExclude) => {
  try {
    return await Obligacion.findOne({ // Usar 'Obligacion' singular
      where: {
        numero_orden: numero_orden,
        id: {
          [Op.ne]: idToExclude
        }
      }
    });
  } catch (error) {
    console.error('Error en findObligacionByNumeroOrdenExcludingIdRepository:', error);
    throw error;
  }
};

/**
 * Buscar una obligación por nombre, excluyendo un ID específico.
 */
export const findObligacionByNombreExcludingIdRepository = async (nombre, idToExclude) => {
  try {
    return await Obligacion.findOne({ // Usar 'Obligacion' singular
      where: {
        nombre: nombre,
        id: {
          [Op.ne]: idToExclude
        }
      }
    });
  } catch (error) {
    console.error('Error en findObligacionByNombreExcludingIdRepository:', error);
    throw error;
  }
};
