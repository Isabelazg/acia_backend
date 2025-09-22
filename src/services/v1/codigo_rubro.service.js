import { buildPagination } from '../../utils/buildPagination.util.js';

import {
  getCodigoRubrosRepository,
  getListCodigoRubrosRepository,
  showCodigoRubroRepository,
  storeCodigoRubroRepository,
  updateCodigoRubroRepository,
  deleteCodigoRubroRepository,
} from '../../repositories/codigo_rubro.repository.js';

/**
 * Servicio para obtener códigos de rubros con filtros, orden y paginación.
 */
export const getCodigoRubrosService = async (req) => {
  const { id, codigo, dependencia_id, sortBy = 'id', order = 'ASC', page = 1, limit = 10 } = req.query;
  const centro_filtro = req.centro_filtro;

  const { data, count } = await getCodigoRubrosRepository({
    id, codigo, dependencia_id, sortBy, order, page, limit, centro_filtro
  });

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

  return {
    data,
    count,
    meta,
    links,
    isPaginated: true,
  };
};

/**
 * Servicio para obtener la lista de códigos de rubros sin paginación.
 */
export const getListCodigoRubrosService = async (req) => {
  const { dependencia_id, sortBy = 'id', order = 'ASC' } = req.query;
  const centro_filtro = req.centro_filtro;

  return await getListCodigoRubrosRepository(dependencia_id, sortBy, order, centro_filtro);
};

/**
 * Servicio para obtener un código de rubro por ID.
 */
export const showCodigoRubroService = async (id) => {
  return await showCodigoRubroRepository(id);
};

/**
 * Servicio para crear un nuevo código de rubro.
 */
export const storeCodigoRubroService = async (data) => {
  return await storeCodigoRubroRepository(data);
};

/**
 * Servicio para actualizar un código de rubro.
 */
export const updateCodigoRubroService = async (id, data) => {
  return await updateCodigoRubroRepository(id, data);
};

/**
 * Servicio para eliminar un código de rubro.
 */
export const deleteCodigoRubroService = async (id) => {
  return await deleteCodigoRubroRepository(id);
};