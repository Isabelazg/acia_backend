import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getRegistrosPresupuestalesRepository,
  getListRegistrosPresupuestalesRepository,
  storeRegistroPresupuestalRepository,
  showRegistroPresupuestalRepository,
  updateRegistroPresupuestalRepository
} from "../../repositories/registros_presupuestales.repository.js";

/**
 * Servicio para obtener los registros presupuestales con filtros, orden y paginación.
 */
export const getRegistrosPresupuestalesService = async (req) => {
  const {
    id,
    numero_proceso_secop,
    contratos_id,
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10
  } = req.query;

  const { data, count } = await getRegistrosPresupuestalesRepository({
    id,
    numero_proceso_secop,
    contratos_id,
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
 * Servicio para obtener la lista de registros presupuestales sin paginación.
 */
export const getListRegistrosPresupuestalesService = async (sortBy = "id", order = "ASC") => {
  return await getListRegistrosPresupuestalesRepository(sortBy, order);
};

/**
 * Servicio para crear un registro presupuestal.
 */
export const storeRegistroPresupuestalService = async (data) => {
  return await storeRegistroPresupuestalRepository(data);
};

/**
 * Servicio para crear múltiples registros presupuestales.
 */
export const storeMultipleRegistrosPresupuestalesService = async (registrosArray) => {
  if (!Array.isArray(registrosArray) || registrosArray.length === 0) {
    const error = new Error("Debe enviar un array de registros presupuestales válido.");
    error.code = "INVALID_INPUT_ARRAY";
    throw error;
  }

  const createdRegistros = [];
  for (const registro of registrosArray) {
    const nuevoRegistro = await storeRegistroPresupuestalRepository(registro);
    createdRegistros.push(nuevoRegistro);
  }
  return createdRegistros;
};

/**
 * Servicio para mostrar un registro presupuestal por id.
 */
export const showRegistroPresupuestalService = async (id) => {
  return await showRegistroPresupuestalRepository(id);
};

/**
 * Servicio para actualizar un registro presupuestal.
 */
export const updateRegistroPresupuestalService = async (id, data) => {
  const registro = await showRegistroPresupuestalRepository(id);
  if (!registro) {
    const error = new Error("Registro presupuestal no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }

  return await updateRegistroPresupuestalRepository(id, data);
};
