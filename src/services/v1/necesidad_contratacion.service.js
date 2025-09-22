import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getnecesidad_contratacionRepository,
  getListnecesidad_contratacionRepository,
  storenecesidad_contratacionRepository,
  shownecesidad_contratacionRepository,
  updatenecesidad_contratacionRepository,
  findnecesidad_contratacionByNombreExcludingIdRepository
} from "../../repositories/necesidad_contratacion.repository.js";

/**
 * Servicio para obtener las necesidad de contratacion con filtros, orden y paginación usando el repositorio.
 */
export const getnecesidad_contratacionService = async (req) => {
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

  const { data, count } = await getnecesidad_contratacionRepository({
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
 * Servicio para obtener la lista de la necesidad de contratacion.
 */
export const getListnecesidad_contratacionService = async (estado, sortBy = "id", order = "ASC") => {
  return await getListnecesidad_contratacionRepository(estado, sortBy, order);
}

/**
 * Servicio para crear un nuevo cargo.
 */
export const storenecesidad_contratacionService = async (data) => {
  return await storenecesidad_contratacionRepository(data);
};

/**
 * Servicio para mostrar una necesidad de contratacion por id.
 */
export const shownecesidad_contratacionService = async (id) => {
  return await shownecesidad_contratacionRepository(id);
};

/**
 * Servicio para actualizar una necesidad de contratacion.
 */
export const updatenecesidad_contratacionService = async (id, data) => {
  const necesidad_contratacion = await shownecesidad_contratacionRepository(id);
  if (!necesidad_contratacion) {
    const error = new Error("necesidad de contratacion no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }

  // Si se está actualizando el nombre, verificar que no exista otra necesidad de contratacion con el mismo nombre
  if (data.nombre && data.nombre !== necesidad_contratacion.nombre) {
    const existingCargoByNombre = await findnecesidad_contratacionByNombreExcludingIdRepository(data.nombre, id);
    if (existingCargoByNombre) {
      const error = new Error(`El nombre "${data.nombre}" ya está registrado. No se puede repetir el nombre.`);
      error.code = "DUPLICATE_CARGO_NAME";
      throw error;
    }
  }

  return await updatenecesidad_contratacionRepository(id, data);
};

/**
 * Servicio para cambiar el estado de un necesidad_contratacion.
 */
export const changenecesidad_contratacionStatusService = async (id, nuevoEstado) => {
  const necesidad_contratacion = await shownecesidad_contratacionRepository(id);
  if (!necesidad_contratacion) {
    const error = new Error("necesidad de contratacion no encontrado");
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
    estadoBoolean = !necesidad_contratacion.estado;
  }

  if (estadoBoolean === false) {
    const hasCentros = await checknecesidad_contratacionHasAutorizacionesRepository(id);
    if (hasCentros) {
      const error = new Error("No se puede desactivar el la necesidad de contratacion porque tiene autorizaciones asociadas");
      error.code = "NECESIDAD_CONTRATACION_HAS_AUTORIZACIONES";
      throw error;
    }
  }

  const updatednecesidad_contratacion = await updatenecesidad_contratacionRepository(id, { estado: estadoBoolean });
  return updatednecesidad_contratacion;
};
