import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getAutorizacionesRepository,
  getListAutorizacionesRepository,
  storeAutorizacionRepository,
  showAutorizacionRepository,
  updateAutorizacionRepository,
  deleteAutorizacionRepository,
} from "../../repositories/autorizacion.repository.js";

/**
 * Servicio para obtener autorizaciones con filtros, orden y paginación usando el repositorio.
 * @param {Request} req
 * @returns {Promise<Object>}
 */
export const getAutorizacionesService = async (req) => {
  const {
    id,
    numero_autorizacion,
    fecha,
    vigencia,
    ordenador_id,
    centro_id,
    tipo_contratacion_id,
    cdp_id, // Agregamos el parámetro cdp_id
    search, // Agregamos el parámetro search
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10
  } = req.query;

  // Lógica de filtros y paginación delegada al repositorio
  const { data, count } = await getAutorizacionesRepository({
    id,
    numero_autorizacion,
    fecha,
    vigencia,
    ordenador_id,
    centro_id,
    tipo_contratacion_id,
    cdp_id, // Pasamos el parámetro cdp_id al repositorio
    search, // Pasamos el parámetro search al repositorio
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
 * Servicio para obtener la lista de autorizaciones.
 * @returns {Promise<Object>}
 */
export const getListAutorizacionesService = async (centro_id, ordenador_id, sortBy = "id", order = "ASC") => {
  return await getListAutorizacionesRepository(centro_id, ordenador_id, sortBy, order);
}

/**
 * Servicio para crear una nueva autorización.
 */
export const storeAutorizacionService = async (data) => {
  // Crear la nueva autorización
  return await storeAutorizacionRepository(data);
};

/**
 * Servicio para mostrar una autorización por número de autorización.
 */
export const showAutorizacionService = async (numero) => {
  return await showAutorizacionRepository(numero);
};

/**
 * Servicio para actualizar una autorización.
 */
export const updateAutorizacionService = async (numero, data) => {
  const autorizacion = await showAutorizacionRepository(numero);
  if (!autorizacion) {
    const error = new Error("Autorización no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }
  // Actualizar la autorización
  return await updateAutorizacionRepository(numero, data);
};

/**
 * Servicio para eliminar una autorización.
 */
export const deleteAutorizacionService = async (numero) => {
  const autorizacion = await showAutorizacionRepository(numero);
  if (!autorizacion) {
    const error = new Error("Autorización no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }

  // Eliminar la autorización
  return await deleteAutorizacionRepository(numero);
};
