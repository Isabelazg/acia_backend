import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getclasificacion_persona_naturalRepository,
  storeclasificacion_persona_naturalRepository,
  showclasificacion_persona_naturalRepository,
  updateclasificacion_persona_naturalRepository,
  findclasificacion_persona_naturalByNombreExcludingIdRepository
} from "../../repositories/clasificacion_persona_natural.repository.js";

/**
 * Servicio para obtener tipo minutas con filtros, orden y paginación usando el repositorio.
 */
export const getclasificacion_persona_naturalService = async (req) => {
  const {
    id,
    nombres,
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

  const { data, count } = await getclasificacion_persona_naturalRepository({
    id,
    nombres,
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
 * Servicio para obtener la lista de clasificacion de persona natural.
 */
export const getListclasificacion_persona_naturalService = async (estado, sortBy = "id", order = "ASC") => {
  return await getListclasificacion_persona_naturalRepository(estado, sortBy, order);
}

/**
 * Servicio para crear un nuevo cargo.
 */
export const storeclasificacion_persona_naturalService = async (data) => {
  return await storeclasificacion_persona_naturalRepository(data);
};

/**
 * Servicio para mostrar una clasificacion de persona natural por id.
 */
export const showclasificacion_persona_naturalService = async (id) => {
  return await showclasificacion_persona_naturalRepository(id);
};

/**
 * Servicio para actualizar un tipo de minuta.
 */
export const updateclasificacion_persona_naturalService = async (id, data) => {
  const clasificacion_persona_natural = await showclasificacion_persona_naturalRepository(id);
  if (!clasificacion_persona_natural) {
    const error = new Error("clasificacion de persona natural no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }

  // Si se está actualizando el nombres, verificar que no exista otro tipo de minuta con el mismo nombres
  if (data.nombres && data.nombres !== clasificacion_persona_natural.nombres) {
    const existingCargoByNombre = await findclasificacion_persona_naturalByNombreExcludingIdRepository(data.nombres, id);
    if (existingCargoByNombre) {
      const error = new Error(`El nombres "${data.nombres}" ya está registrado. No se puede repetir el nombres.`);
      error.code = "DUPLICATE_CARGO_NAME";
      throw error;
    }
  }

  return await updateclasificacion_persona_naturalRepository(id, data);
};

/**
 * Servicio para cambiar el estado de un clasificacion_persona_natural.
 */
export const changeclasificacion_persona_naturalStatusService = async (id, nuevoEstado) => {
  const clasificacion_persona_natural = await showclasificacion_persona_naturalRepository(id);
  if (!clasificacion_persona_natural) {
    const error = new Error("clasificacion de persona natural no encontrada");
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
    estadoBoolean = !clasificacion_persona_natural.estado;
  }


  const updatedclasificacion_persona_natural = await updateclasificacion_persona_naturalRepository(id, { estado: estadoBoolean });
  return updatedclasificacion_persona_natural;
};
