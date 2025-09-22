import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getnivel_formacionRepository,
  storenivel_formacionRepository,
  shownivel_formacionRepository,
  updatenivel_formacionRepository,
  findnivel_formacionByNombreExcludingIdRepository
} from "../../repositories/nivel_formacion.repository.js";

/**
 * Servicio para obtener nivel de formacion con filtros, orden y paginación usando el repositorio.
 */
export const getnivel_formacionService = async (req) => {
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

  const { data, count } = await getnivel_formacionRepository({
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
 * Servicio para obtener la lista de nivel de formacion.
 */
export const getListnivel_formacionService = async (estado, sortBy = "id", order = "ASC") => {
  return await getListnivel_formacionRepository(estado, sortBy, order);
}

/**
 * Servicio para crear un nuevo nivel de formacion.
 */
export const storenivel_formacionService = async (data) => {
  return await storenivel_formacionRepository(data);
};

/**
 * Servicio para mostrar un nivel de formacion por id.
 */
export const shownivel_formacionService = async (id) => {
  return await shownivel_formacionRepository(id);
};

/**
 * Servicio para actualizar un nivel de formacion.
 */
export const updatenivel_formacionService = async (id, data) => {
  const nivel_formacion = await shownivel_formacionRepository(id);
  if (!nivel_formacion) {
    const error = new Error("nivel de formacion no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }

  // Si se está actualizando el nombre, verificar que no exista otro nivel de formacion con el mismo nombre
  if (data.nombre && data.nombre !== nivel_formacion.nombre) {
    const existingCargoByNombre = await findnivel_formacionByNombreExcludingIdRepository(data.nombre, id);
    if (existingCargoByNombre) {
      const error = new Error(`El nombre "${data.nombre}" ya está registrado. No se puede repetir el nombre.`);
      error.code = "DUPLICATE_CARGO_NAME";
      throw error;
    }
  }

  return await updatenivel_formacionRepository(id, data);
};

/**
 * Servicio para cambiar el estado de un nivel_formacion.
 */
export const changenivel_formacionStatusService = async (id, nuevoEstado) => {
  const nivel_formacion = await shownivel_formacionRepository(id);
  if (!nivel_formacion) {
    const error = new Error("nivel de formacion no encontrado");
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
    estadoBoolean = !nivel_formacion.estado;
  }

  if (estadoBoolean === false) {
    const hasCentros = await checknivel_formacionHasAutorizacionesRepository(id);
    if (hasCentros) {
      const error = new Error("No se puede desactivar el nivel de formacion porque tiene autorizaciones asociadas");
      error.code = "NIVEL_FORMACION_HAS_AUTORIZACIONES";
      throw error;
    }
  }

  const updatednivel_formacion = await updatenivel_formacionRepository(id, { estado: estadoBoolean });
  return updatednivel_formacion;
};
