import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  geteducacion_formalRepository,
  getListeducacion_formalRepository,
  storeeducacion_formalRepository,
  showeducacion_formalRepository,
  updateeducacion_formalRepository,
  findeducacion_formalByNombreExcludingIdRepository
} from "../../repositories/educacion_formal.repository.js";

/**
 * Servicio para obtener las educaciones formales con filtros, orden y paginación usando el repositorio.
 */
export const geteducacion_formalService = async (req) => {
  const {
    id,
    nombre,
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

  const { data, count } = await geteducacion_formalRepository({
    id,
    nombre,
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
 * Servicio para obtener la lista de educacion formal.
 */
export const getListeducacion_formalService = async (estado, sortBy = "id", order = "ASC") => {
  return await getListeducacion_formalRepository(estado, sortBy, order);
};

/**
 * Servicio para crear una nueva educacion formal.
 */
export const storeeducacion_formalService = async (data) => {
  return await storeeducacion_formalRepository(data);
};

/**
 * Servicio para crear múltiples educaciones formales.
 */
export const storeMultipleEducacionesService = async (educacionesArray) => {
  if (!Array.isArray(educacionesArray) || educacionesArray.length === 0) {
    const error = new Error("Debe enviar un array de educaciones formales válido.");
    error.code = "INVALID_INPUT_ARRAY";
    throw error;
  }

  const createdEducaciones = [];
  for (const educacion of educacionesArray) {
    const nuevaEducacion = await storeeducacion_formalRepository(educacion);
    createdEducaciones.push(nuevaEducacion);
  }
  return createdEducaciones;
};

/**
 * Servicio para mostrar una educacion formal por id.
 */
export const showeducacion_formalService = async (id) => {
  return await showeducacion_formalRepository(id);
};

/**
 * Servicio para actualizar una educacion formal.
 */
export const updateeducacion_formalService = async (id, data) => {
  const educacion_formal = await showeducacion_formalRepository(id);
  if (!educacion_formal) {
    const error = new Error("educacion formal no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }

  // Si se está actualizando el nombre, verificar que no exista otra educacion formal con el mismo nombre
  if (data.nombre && data.nombre !== educacion_formal.nombre) {
    const existingEducacionByNombre = await findeducacion_formalByNombreExcludingIdRepository(data.nombre, id);
    if (existingEducacionByNombre) {
      const error = new Error(`El nombre "${data.nombre}" ya está registrado. No se puede repetir el nombre.`);
      error.code = "DUPLICATE_CARGO_NAME";
      throw error;
    }
  }

  return await updateeducacion_formalRepository(id, data);
};

/**
 * Servicio para cambiar el estado de una educacion formal.
 */
export const changeeducacion_formalStatusService = async (id, nuevoEstado) => {
  const educacion_formal = await showeducacion_formalRepository(id);
  if (!educacion_formal) {
    const error = new Error("educacion formal no encontrada");
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
    estadoBoolean = !educacion_formal.estado;
  }

  if (estadoBoolean === false) {
    const hasCentros = await checkeducacion_formalHasAutorizacionesRepository(id);
    if (hasCentros) {
      const error = new Error("No se puede desactivar la educacion formal porque tiene autorizaciones asociadas");
      error.code = "EDUCACION_FORMAL_HAS_AUTORIZACIONES";
      throw error;
    }
  }

  const updatededucacion_formal = await updateeducacion_formalRepository(id, { estado: estadoBoolean });
  return updatededucacion_formal;
};
