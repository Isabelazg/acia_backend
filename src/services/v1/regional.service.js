import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getRegionalsRepository,
  getListRegionalsRepository,
  storeRegionalRepository,
  showRegionalRepository,
  updateRegionalRepository,
} from "../../repositories/regional.repository.js";
import { getCentrosByRegionalRepository } from "../../repositories/centro.repository.js";

/**
 * Servicio para obtener roles con filtros, orden y paginación usando el repositorio.
 * @param {Request} req
 * @returns {Promise<Object>}
 */
export const getRegionalsService = async (req) => {
  const {
    id,
    codigo,
    nombre,
    estado,
    search, // Agregamos el parámetro search
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10
  } = req.query;

  // Convertir estado string a boolean si es necesario
  let estadoBoolean = estado;
  if (estado === 'true' || estado === 'activo') estadoBoolean = true;
  if (estado === 'false' || estado === 'inactivo') estadoBoolean = false;
  if (estado === undefined || estado === null || estado === 'todos') estadoBoolean = undefined;

  // Lógica de filtros y paginación delegada al repositorio
  const { data, count } = await getRegionalsRepository({
    id,
    codigo,
    nombre,
    estado: estadoBoolean,
    search,
    sortBy,
    order,
    page,
    limit
  });

  const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;
  const queryWithoutPage = Object.entries({ ...req.query, page: undefined })
    .filter(([_, v]) => v !== undefined)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

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
 * Servicio para obtener la lista de regionales.
 * @returns {Promise<Object>}
 */
export const getListRegionalsService = async (estado, sortBy = "id", order = "ASC") => {
  return await getListRegionalsRepository(estado, sortBy, order);
}

/**
 * Servicio para crear un nuevo rol.
 */
export const storeRegionalService = async (data) => {
  // Crear la nueva regional
  return await storeRegionalRepository(data);
};

/**
 * Servicio para mostrar una regional por codigo.
 */
export const showRegionalService = async (code) => {
  return await showRegionalRepository(code);
};

/**
 * Servicio para actualizar una regional.
 */
export const updateRegionalService = async (code, data) => {
  const regional = await showRegionalRepository(code);
  if (!regional) {
    const error = new Error("Regional no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }
  // Actualizar la regional
  return await updateRegionalRepository(code, data);
};

/**
 * Servicio para cambiar el estado de una regional.
 */
export const changeRegionalStatusService = async (codigo, nuevoEstado) => {
  const regional = await showRegionalRepository(codigo);
  if (!regional) {
    const error = new Error("Regional no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }

  // Validar si tiene centros asociados
  const hasCenters = await import('../../repositories/regional.repository.js').then(mod => mod.checkReginalHasCenterRepository(regional.id));
  if (hasCenters) {
    const error = new Error("No se puede cambiar el estado porque la regional tiene centros asociados.");
    error.code = "REGIONAL_HAS_CENTERS";
    throw error;
  }

  // Cambiar el estado de la regional
  const estadoFinal = nuevoEstado !== undefined ? nuevoEstado : !regional.estado;

  const updatedRegional = await updateRegionalRepository(codigo, { estado: estadoFinal });
  return updatedRegional;
};

/**
 * Servicio para obtener los centros de una regional por código.
 */
export const getCentrosByRegionalService = async (codigo, estado, sortBy = "id", order = "ASC") => {
  const regional = await showRegionalRepository(codigo);
  if (!regional) {
    const error = new Error("Regional no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }

  const { data, count } = await getCentrosByRegionalRepository(regional.id, estado, sortBy, order);
  return { data, count };
};