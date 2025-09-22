import { buildPagination } from '../../utils/buildPagination.util.js';
import {
  getRubrosRepository,
  getListRubrosRepository,
  showRubroRepository,
  storeRubroRepository,
  updateRubroRepository,
} from '../../repositories/rubro.repository.js';
import CdpsRubros from '../../models/cdps_rubros.model.js';

/**
 * Servicio para obtener rubros con filtros, orden y paginación.
 */
export const getRubrosService = async (req) => {
  const { id, codigo_rubro_id, descripcion, sortBy = 'id', order = 'ASC', page = 1, limit = 10 } = req.query;
  const centro_filtro = req.centro_filtro;

  const { data, count } = await getRubrosRepository({
    id, codigo_rubro_id, descripcion, sortBy, order, page, limit, centro_filtro
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
 * Servicio para obtener la lista de rubros sin paginación.
 */
export const getListRubrosService = async (req) => {
  const { sortBy = 'id', order = 'ASC' } = req.query;
  const centro_filtro = req.centro_filtro;

  return await getListRubrosRepository(sortBy, order, centro_filtro);
};

/**
 * Servicio para buscar un rubro por ID.
 */
export const showRubroService = async (id) => {
  return await showRubroRepository(id);
};

/**
 * Servicio para crear un nuevo rubro.
 */
export const storeRubroService = async (data) => {
  return await storeRubroRepository(data);
};

/**
 * Servicio para actualizar un rubro por ID.
 */
export const updateRubroService = async (id, data) => {
  // Validar si el rubro está asociado a un CDP
  const asociado = await CdpsRubros.findOne({ where: { rubros_id: id } });
  if (asociado) {
    const error = new Error('Este rubro no se puede editar, ya esta asociado a un cdp');
    error.code = 'RUBRO_ASOCIADO_CDP';
    throw error;
  }

  const rubro = await showRubroRepository(id);
  if (!rubro) {
    const error = new Error('Rubro no encontrado');
    error.code = 'NOT_FOUND';
    throw error;
  }

  return await updateRubroRepository(id, data);
};

/**
 * Servicio para eliminar un rubro por ID.
 */
export const deleteRubroService = async (id) => {
  const asociado = await CdpsRubros.findOne({ where: { rubros_id: id } });
  if (asociado) {
    const error = new Error('Este rubro no se puede eliminar, ya esta asociado a un cdp');
    error.code = 'RUBRO_ASOCIADO_CDP';
    throw error;
  }
  const rubro = await showRubroRepository(id);
  if (!rubro) {
    const error = new Error('Rubro no encontrado');
    error.code = 'NOT_FOUND';
    throw error;
  }
  await rubro.destroy();
  return true;
};