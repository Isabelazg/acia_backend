import { buildPagination } from '../../utils/buildPagination.util.js';
import {
  getTipoContratacionRepository,
  getListTipoContratacionRepository,
  storeTipoContratacionRepository,
  showTipoContratacionRepository,
  updateTipoContratacionRepository,
  checkTipoContratacionHasAutorizacionesRepository,
  deleteTipoContratacionRepository,
} from '../../repositories/tipo_contratacion.repository.js';

/**
 * Servicio para obtener tipos de contratación con filtros, orden y paginación.
 */
export const getTipoContratacionService = async (req) => {
  const { id, nombre, estado, sortBy = 'id', order = 'ASC', page = 1, limit = 10 } = req.query;

  const { data, count } = await getTipoContratacionRepository({ id, nombre, estado, sortBy, order, page, limit });

  const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
  const queryWithoutPage = Object.entries({ ...req.query, page: undefined })
    .filter(([_, v]) => v !== undefined)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  const { meta, links } = buildPagination({
    total: count,
    page: parseInt(page),
    limit: parseInt(limit),
    baseUrl,
    queryWithoutPage,
  });

  return { data, count, meta, links, isPaginated: true };
};

/**
 * Servicio para obtener la lista de tipos de contratación sin paginación.
 */
export const getListTipoContratacionService = async (estado, sortBy = 'id', order = 'ASC') => {
  return await getListTipoContratacionRepository(estado, sortBy, order);
};

/**
 * Servicio para crear un nuevo tipo de contratación.
 */
export const storeTipoContratacionService = async (data) => {
  return await storeTipoContratacionRepository(data);
};

/**
 * Servicio para buscar un tipo de contratación por ID.
 */
export const showTipoContratacionService = async (id) => {
  return await showTipoContratacionRepository(id);
};

/**
 * Servicio para actualizar un tipo de contratación por ID.
 */
export const updateTipoContratacionService = async (id, data) => {
  const tipoContratacion = await showTipoContratacionRepository(id);
  if (!tipoContratacion) {
    const error = new Error('Tipo de contratación no encontrado');
    error.code = 'NOT_FOUND';
    throw error;
  }

  const hasAutorizaciones = await checkTipoContratacionHasAutorizacionesRepository(id);
  if (hasAutorizaciones) {
    const error = new Error('No se puede editar el tipo de contratación porque está asociado a autorizaciones.');
    error.code = 'DEPENDENT_AUTORIZACIONES_EXIST';
    throw error;
  }

  return await updateTipoContratacionRepository(id, data);
};

/**
 * Servicio para eliminar un tipo de contratación por ID.
 */
export const deleteTipoContratacionService = async (id) => {
  const hasAutorizaciones = await checkTipoContratacionHasAutorizacionesRepository(id);
  if (hasAutorizaciones) {
    const error = new Error('No se puede eliminar el tipo de contratación porque está asociado a autorizaciones.');
    error.code = 'DEPENDENT_AUTORIZACIONES_EXIST';
    throw error;
  }

  return await deleteTipoContratacionRepository(id);
};