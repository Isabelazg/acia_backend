import { buildPagination } from '../../utils/buildPagination.util.js';
import {
  getSupervisoresRepository,
  getListSupervisoresRepository,
  storeSupervisorRepository,
  updateSupervisorRepository,
  showSupervisorRepository,
} from '../../repositories/supervisor.repository.js';

/**
 * Servicio para obtener supervisores con filtros, orden y paginación.
 */
export const getSupervisoresService = async (req) => {
  const {
    id,
    documento,
    nombres,
    apellidos,
    sexo,
    correo,
    search,
    cargo,
    estado, // <-- AGREGA ESTO
    sortBy = 'id',
    order = 'ASC',
    page = 1,
    limit = 10,
  } = req.query;

  const { data, count } = await getSupervisoresRepository({
    id,
    documento,
    nombres,
    apellidos,
    sexo,
    correo,
    search,
    cargo,
    estado, // <-- Y AQUÍ
    centro_filtro: req.centro_filtro, // <-- AGREGAR FILTRO DE CENTRO
    sortBy,
    order,
    page,
    limit,
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
 * Servicio para obtener la lista de supervisores sin paginación.
 */
export const getListSupervisoresService = async (req) => {
  const { sortBy = 'id', order = 'ASC' } = req.query;

  return await getListSupervisoresRepository(sortBy, order, req.centro_filtro);
};

/**
 * Servicio para buscar un supervisor por ID.
 */
export const showSupervisorService = async (id) => {
  return await showSupervisorRepository(id);
};

/**
 * Servicio para crear un nuevo supervisor.
 */
export const storeSupervisorService = async (data) => {
  return await storeSupervisorRepository(data);
};

/**
 * Servicio para actualizar un supervisor por ID.
 */
export const updateSupervisorService = async (id, data) => {
  const supervisor = await showSupervisorRepository(id);
  if (!supervisor) {
    const error = new Error('Supervisor no encontrado');
    error.code = 'NOT_FOUND';
    throw error;
  }
  return await updateSupervisorRepository(id, data);
};

/**
 * Servicio para cambiar el estado de un supervisor.
 */
export const changeSupervisorStatusService = async (id, nuevoEstado) => {
  const supervisor = await showSupervisorRepository(id);
  if (!supervisor) {
    return null;
  }
  const estadoFinal = nuevoEstado !== undefined ? nuevoEstado : !supervisor.estado;
  const updatedSupervisor = await updateSupervisorRepository(id, { estado: estadoFinal });
  return updatedSupervisor;
};
