import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getestado_formacionesRepository,
  storeestado_formacionesRepository,
  showestado_formacionesRepository,
  updateestado_formacionesRepository,
  findestado_formacionesByNombreExcludingIdRepository,
  getListestado_formacionesRepository
} from "../../repositories/estado_formaciones.repository.js";

/**
 * Servicio para obtener un estado de formacion con filtros, orden y paginación usando el repositorio.
 */
export const getestado_formacionesService = async (req) => {
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

  const { data, count } = await getestado_formacionesRepository({
    id,
    nombre,
    estado: estadoBoolean,
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
 * Servicio para obtener la lista de estado de formaciones.
 */
export const getListestado_formacionesService = async (estado, sortBy = "id", order = "ASC") => {
  return await getListestado_formacionesRepository(estado, sortBy, order);
}

/**
 * Servicio para crear un nuevo estado de formacion.
 */
export const storeestado_formacionesService = async (data) => {
  return await storeestado_formacionesRepository(data);
};

/**
 * Servicio para mostrar un estado de formacion por id.
 */
export const showestado_formacionesService = async (id) => {
  return await showestado_formacionesRepository(id);
};

/**
 * Servicio para actualizar un estado de formacion.
 */
export const updateestado_formacionesService = async (id, data) => {
  const estado_formaciones = await showestado_formacionesRepository(id);
  if (!estado_formaciones) {
    const error = new Error("estado de formacion no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }

  // Si se está actualizando el nombre, verificar que no exista otro estado de formacion con el mismo nombre
  if (data.nombre && data.nombre !== estado_formaciones.nombre) {
    const existingCargoByNombre = await findestado_formacionesByNombreExcludingIdRepository(data.nombre, id);
    if (existingCargoByNombre) {
      const error = new Error(`El nombre "${data.nombre}" ya está registrado. No se puede repetir el nombre.`);
      error.code = "DUPLICATE_ESTADO_FORMACIONES_NAME";
      throw error;
    }
  }

  return await updateestado_formacionesRepository(id, data);
};

/**
 * Servicio para cambiar el estado de una formacion.
 */
export const changeestado_formacionesStatusService = async (id, nuevoEstado) => {
  const estado_formaciones = await showestado_formacionesRepository(id);
  if (!estado_formaciones) {
    const error = new Error("estado de formacion no encontrado");
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
    estadoBoolean = !estado_formaciones.estado;
  }

  if (estadoBoolean === false) {
    const hasCentros = await checkestado_formacionesHasAutorizacionesRepository(id);
    if (hasCentros) {
      const error = new Error("No se puede desactivar el estado de formacion porque tiene autorizaciones asociadas");
      error.code = "ESTADO_FORMACIONES_HAS_AUTORIZACIONES";
      throw error;
    }
  }

  const updatedestado_formaciones = await updateestado_formacionesRepository(id, { estado: estadoBoolean });
  return updatedestado_formaciones;
};
