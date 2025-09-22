import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getFuentesRecursosRepository,
  getListFuentesRecursosRepository,
  showFuenteRecursoRepository,
  storeFuenteRecursoRepository,
  updateFuenteRecursoRepository,
  deleteFuenteRecursoRepository
} from '../../repositories/fuenteRecurso.repository.js';

export const getFuentesRecursosService = async (req) => {
  const {
    nombre,
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10
  } = req.query;

  const { data, count } = await getFuentesRecursosRepository({
    nombre,
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

export const getListFuentesRecursosService = async (sortBy = "id", order = "ASC") => {
  return await getListFuentesRecursosRepository(sortBy, order);
};

export const showFuenteRecursoService = async (id) => {
  return await showFuenteRecursoRepository(id);
};

export const storeFuenteRecursoService = async (data) => {
  return await storeFuenteRecursoRepository(data);
};

export const updateFuenteRecursoService = async (id, data) => {
  return await updateFuenteRecursoRepository(id, data);
};

export const deleteFuenteRecursoService = async (id) => {
  return await deleteFuenteRecursoRepository(id);
};