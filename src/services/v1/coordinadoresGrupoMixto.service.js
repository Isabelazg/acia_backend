import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getCoordinadoresGrupoMixtoRepository,
  getListCoordinadoresGrupoMixtoRepository,
  storeCoordinadorGrupoMixtoRepository,
  showCoordinadorGrupoMixtoRepository,
  updateCoordinadorGrupoMixtoRepository,
} from "../../repositories/coordinadoresGrupoMixto.repository.js";

/**
 * Servicio para obtener coordinadores grupo mixto con filtros, orden y paginación.
 */
export const getCoordinadoresGrupoMixtoService = async (req) => {
  const {
    id, estado,
    documento, nombres, apellidos, correo,
    sortBy = "id", order = "ASC", page = 1, limit = 10
  } = req.query;

  let estadoBoolean = estado;
  if (estado === 'true') estadoBoolean = true;
  if (estado === 'false') estadoBoolean = false;
  if (estado === undefined || estado === null) estadoBoolean = undefined;

  const { data, count } = await getCoordinadoresGrupoMixtoRepository({
    id, estado: estadoBoolean,
    documento, nombres, apellidos, correo,
    sortBy, order, page, limit
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

  return { data, count, meta, links, isPaginated: true };
};

export const getListCoordinadoresGrupoMixtoService = async (estado, sortBy = "id", order = "ASC") => {
  return await getListCoordinadoresGrupoMixtoRepository(estado, sortBy, order);
};

export const storeCoordinadorGrupoMixtoService = async (data) => {
  return await storeCoordinadorGrupoMixtoRepository(data);
};

export const showCoordinadorGrupoMixtoService = async (documento) => {
  return await showCoordinadorGrupoMixtoRepository(documento);
};

export const updateCoordinadorGrupoMixtoService = async (documento, data) => {
  const coordinador = await showCoordinadorGrupoMixtoService(documento);
  if (!coordinador) {
    const error = new Error("Coordinador grupo mixto no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }
  return await updateCoordinadorGrupoMixtoRepository(documento, data);
};

export const changeCoordinadorGrupoMixtoStatusService = async (documento, nuevoEstado) => {
  const coordinador = await showCoordinadorGrupoMixtoRepository(documento);
  if (!coordinador) {
    const error = new Error("Coordinador grupo mixto no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }
  const estadoFinal = nuevoEstado !== undefined ? nuevoEstado : !coordinador.estado;
  const updatedCoordinador = await updateCoordinadorGrupoMixtoRepository(documento, { estado: estadoFinal });
  return updatedCoordinador;
};