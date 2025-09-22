import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getContratosRepository,
  getListContratosRepository,
  storeContratoRepository,
  showContratoRepository,
  updateContratoRepository,
} from "../../repositories/contrato.repository.js";


export const getContratosService = async (req) => {
  const {
    id,
    search,
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10
  } = req.query;

  const { data, count } = await getContratosRepository({
    id,
    search,
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
    isPaginated: true
  };
};

/**
 * Servicio para obtener la lista de regionales.
 * @returns {Promise<Object>}
 */
export const getListContratosService = async (sortBy = "id", order = "ASC") => {
  return await getListContratosRepository(sortBy, order);
}

export const storeContratoService = async (data) => {
  try {
    return await storeContratoRepository(data);
  } catch (err) {
    // Map some sequelize errors to structured errors for controller
    if (err.name === 'SequelizeValidationError') {
      err.code = 'VALIDATION_ERROR';
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
      err.code = 'DUPLICATE_VALUE';
    }
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      err.code = 'FOREIGN_KEY_ERROR';
    }
    // Re-throw after mapping
    throw err;
  }
};

export const showContratoService = async (numero) => {
  return await showContratoRepository(numero);
};

export const updateContratoService = async (numero, data) => {
  const contrato = await showContratoRepository(numero);
  if (!contrato) {
    const error = new Error("Contrato no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }
  return await updateContratoRepository(numero, data);
};
