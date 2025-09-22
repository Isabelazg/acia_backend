import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getResolucionesRepository,
  getListResolucionesRepository,
  storeResolucionRepository,
  showResolucionByIdRepository,
  updateResolucionByIdRepository,
  deleteResolucionByIdRepository,
} from "../../repositories/resolucion.repository.js";

/**
 * Servicio para obtener resoluciones con filtros, orden y paginación usando el repositorio.
 * @param {Request} req
 * @returns {Promise<Object>}
 */
export const getResolucionesService = async (req) => {
  const {
    id,
    fecha,
    acta_posesion,
    fecha_posesion,
    fecha_ingreso,
    fecha_retiro,
    es_encargado,
    centro_id,
    ordenadores_id,
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10
  } = req.query;

  // Convertir es_encargado string a boolean si es necesario
  let esEncargadoBoolean = es_encargado;
  if (es_encargado === 'true') esEncargadoBoolean = true;
  if (es_encargado === 'false') esEncargadoBoolean = false;
  if (es_encargado === undefined || es_encargado === null) esEncargadoBoolean = undefined;

  // Lógica de filtros y paginación delegada al repositorio
  const { data, count } = await getResolucionesRepository({
    id,
    fecha,
    acta_posesion,
    fecha_posesion,
    fecha_ingreso,
    fecha_retiro,
    es_encargado: esEncargadoBoolean,
    centro_id,
    ordenadores_id,
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
 * Servicio para obtener la lista de resoluciones.
 * @returns {Promise<Object>}
 */
export const getListResolucionesService = async (sortBy = "id", order = "ASC") => {
  return await getListResolucionesRepository(sortBy, order);
}

/**
 * Servicio para crear una nueva resolución.
 */
export const storeResolucionService = async (data) => {
  // Crear la nueva resolución
  return await storeResolucionRepository(data);
};

/**
 * Servicio para mostrar una resolución por ID.
 */
export const showResolucionByIdService = async (id) => {
  return await showResolucionByIdRepository(id);
};

/**
 * Servicio para actualizar una resolución.
 */
export const updateResolucionByIdService = async (id, data) => {
  const resolucion = await showResolucionByIdRepository(id);
  if (!resolucion) {
    const error = new Error("Resolución no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }
  // Actualizar la resolución
  return await updateResolucionByIdRepository(id, data);
};

/**
 * Servicio para eliminar una resolución.
 */
export const deleteResolucionByIdService = async (id) => {
  const resolucion = await showResolucionByIdRepository(id);
  if (!resolucion) {
    const error = new Error("Resolución no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }

  // Eliminar la resolución
  return await deleteResolucionByIdRepository(id);
};
