import {
  getDependenciasRepository,
  getListDependenciasRepository,
  storeDependenciaRepository,
  showDependenciaRepository,
  updateDependenciaRepository,
  getDependenciasByCentroRepository
} from "../../repositories/dependencia.repository.js";
import { buildPagination } from "../../utils/buildPagination.util.js";

/**
 * Servicio para obtener dependencias con filtros, orden y paginación.
 */
export const getDependenciasService = async (req) => {
  const {
    id,
    codigo,
    nombre,
    estado,
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10
  } = req.query;

  const { data, count } = await getDependenciasRepository({
    id,
    codigo,
    nombre,
    estado,
    centro_filtro: req.centro_filtro,
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
 * Servicio para obtener la lista de dependencias.
 */
export const getListDependenciasService = async (req) => {
  const { sortBy = "id", order = "ASC" } = req.query;

  return await getListDependenciasRepository(sortBy, order, req.centro_filtro);
};

/**
 * Servicio para crear una nueva dependencia.
 */
export const storeDependenciaService = async (data) => {
  return await storeDependenciaRepository(data);
};

/**
 * Servicio para mostrar una dependencia por código.
 */
export const showDependenciaService = async (codigo) => {
  return await showDependenciaRepository(codigo);
};

/**
 * Servicio para actualizar una dependencia.
 */
export const updateDependenciaService = async (codigo, data) => {
  const dependencia = await showDependenciaRepository(codigo);
  if (!dependencia) {
    const error = new Error("Dependencia no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }
  return await updateDependenciaRepository(codigo, data);
};

/**
 * Servicio para obtener dependencias por centro.
 */
export const getDependenciasByCentroService = async (centroId) => {
  return await getDependenciasByCentroRepository(centroId);
};