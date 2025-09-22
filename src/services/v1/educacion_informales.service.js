import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  geteducacion_informalRepository,
  getListeducacion_informalRepository,
  storeeducacion_informalRepository,
  storeMultipleEducacionesInformalesRepository,
  showeducacion_informalRepository,
  updateeducacion_informalRepository,
} from "../../repositories/educacion_informales.repository.js";

/**
 * Servicio para obtener las educaciones informales con filtros, orden y paginación.
 */
export const geteducacion_informalService = async (req) => {
  const {
    id,
    titulo,
    institucion,
    estado,
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10
  } = req.query;

  let estadoBoolean = estado;
  if (estado === 'true') estadoBoolean = true;
  if (estado === 'false') estadoBoolean = false;
  if (estado === undefined || estado === null) estadoBoolean = undefined;

  const { data, count } = await geteducacion_informalRepository({
    id,
    titulo,
    titulo,
    institucion,
    estado_id: estadoBoolean,
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
 * Servicio para obtener la lista de educacion informal.
 */
export const getListeducacion_informalService = async (estado, sortBy = "id", order = "ASC") => {
  return await getListeducacion_informalRepository(estado, sortBy, order);
};

/**
 * Servicio para crear una nueva educacion informal.
 */
export const storeeducacion_informalService = async (data) => {
  return await storeeducacion_informalRepository(data);
};

/**
 * Servicio para crear múltiples educaciones informales.
 */
export const storeMultipleEducacionesInformalesService = async (educacionesArray) => {
  if (!Array.isArray(educacionesArray) || educacionesArray.length === 0) {
    const error = new Error("Debe enviar un array de educaciones informales válido.");
    error.code = "INVALID_INPUT_ARRAY";
    throw error;
  }

  // Se utiliza storeMultipleEducacionesInformalesRepository para una inserción más eficiente.
  const createdEducaciones = await storeMultipleEducacionesInformalesRepository(educacionesArray);
  
  return createdEducaciones;
};

/**
 * Servicio para mostrar una educacion informal por id.
 */
export const showeducacion_informalService = async (id) => {
  return await showeducacion_informalRepository(id);
};

/**
 * Servicio para actualizar una educacion informal.
 */
export const updateeducacion_informalService = async (id, data) => {
  const educacion_informal = await showeducacion_informalRepository(id);
  if (!educacion_informal) {
    const error = new Error("Educación informal no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }

  // No hay validación de nombre duplicado en la tabla de educacion informal.
  // La validación original de educación formal se eliminó para evitar conflictos.

  return await updateeducacion_informalRepository(id, data);
};

/**
 * Servicio para cambiar el estado de una educacion informal.
 */
export const changeeducacion_informalStatusService = async (id, nuevoEstado) => {
  const educacion_informal = await showeducacion_informalRepository(id);
  if (!educacion_informal) {
    const error = new Error("Educación informal no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }

  let estadoBoolean;
  if (typeof nuevoEstado === 'boolean') {
    estadoBoolean = nuevoEstado;
  } else if (nuevoEstado === 'true') {
    estadoBoolean = true;
  } else if (nuevoEstado === 'false') {
    estadoBoolean = false;
  } else {
    estadoBoolean = !educacion_informal.estado;
  }

  // Asumiendo que no hay una validación de 'autorizaciones' para educación informal,
  // se elimina esa lógica para evitar un error. Si necesitas una validación similar,
  // deberás implementarla en el repositorio.
  const updatededucacion_informal = await updateeducacion_informalRepository(id, { estado: estadoBoolean });
  return updatededucacion_informal;
};