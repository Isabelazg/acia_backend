import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getformaciones_complementariasRepository,
  getListformaciones_complementariasRepository,
  storeformaciones_complementariasRepository,
  showformaciones_complementariasRepository,
  updateformaciones_complementariasRepository,
  findformaciones_complementariasByNombreExcludingIdRepository,
  checkformaciones_complementariasHasRelacionRepository
} from "../../repositories/formaciones_complementarias.repository.js";

/**
 * Servicio para obtener formaciones complementarias con filtros, orden y paginación.
 */
export const getformaciones_complementariasService = async (req) => {
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
  if (estado === "true") estadoBoolean = true;
  if (estado === "false") estadoBoolean = false;
  if (estado === undefined || estado === null) estadoBoolean = undefined;

  const { data, count } = await getformaciones_complementariasRepository({
    id,
    nombre,
    estado: estadoBoolean,
    sortBy,
    order,
    page,
    limit,
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
 * Servicio para obtener lista de formaciones complementarias (sin paginación).
 */
export const getListformaciones_complementariasService = async (estado, sortBy = "id", order = "ASC") => {
  return await getListformaciones_complementariasRepository(estado, sortBy, order);
};

/**
 * Servicio para crear una nueva formación complementaria.
 */
export const storeformaciones_complementariasService = async (data) => {
  return await storeformaciones_complementariasRepository(data);
};

/**
 * Servicio para mostrar una formación complementaria por id.
 */
export const showformaciones_complementariasService = async (id) => {
  return await showformaciones_complementariasRepository(id);
};

/**
 * Servicio para actualizar una formación complementaria.
 */
export const updateformaciones_complementariasService = async (id, data) => {
  const formacion = await showformaciones_complementariasRepository(id);
  if (!formacion) {
    const error = new Error("formación complementaria no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }

  if (data.nombre && data.nombre !== formacion.nombre) {
    const existingByNombre = await findformaciones_complementariasByNombreExcludingIdRepository(data.nombre, id);
    if (existingByNombre) {
      const error = new Error(`El nombre "${data.nombre}" ya está registrado. No se puede repetir.`);
      error.code = "DUPLICATE_NOMBRE";
      throw error;
    }
  }

  return await updateformaciones_complementariasRepository(id, data);
};

/**
 * Servicio para cambiar el estado de una formación complementaria.
 */
export const changeformaciones_complementariaStatusService = async (id, nuevoEstado) => {
  const formacion = await showformaciones_complementariasRepository(id);
  if (!formacion) {
    const error = new Error("formación complementaria no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }

  let estadoBoolean;
  if (typeof nuevoEstado === "boolean") {
    estadoBoolean = nuevoEstado;
  } else if (nuevoEstado === "true") {
    estadoBoolean = true;
  } else if (nuevoEstado === "false") {
    estadoBoolean = false;
  } else {
    estadoBoolean = !formacion.estado;
  }

  if (estadoBoolean === false) {
    const hasRelaciones = await checkformaciones_complementariasHasRelacionRepository(id);
    if (hasRelaciones) {
      const error = new Error("No se puede desactivar la formación complementaria porque tiene relaciones asociadas");
      error.code = "FORMACIONES_COMPLEMENTARIAS_HAS_RELACIONES";
      throw error;
    }
  }

  return await updateformaciones_complementariasRepository(id, { estado: estadoBoolean });
};
