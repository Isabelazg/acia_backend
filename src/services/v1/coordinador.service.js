import {
  getCoordinadoresRepository,
  getListCoordinadoresRepository,
  storeCoordinadorRepository,
  showCoordinadorRepository,
  updateCoordinadorRepository,
  changeCoordinadorStatusRepository
} from "../../repositories/coordinador.repository.js";
import { buildPagination } from "../../utils/buildPagination.util.js";


export const getCoordinadoresService = async (req) => {
  const {
    id,
    documento,
    nombres,
    apellidos,
    correo,
    telefono,
    estado,
    centros_id,
    search,
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10
  } = req.query;

  // Nota: la columna `estado` fue removida de la tabla coordinadores.
  // Aceptamos el parámetro pero no lo convertimos ni lo aplicamos en el repositorio.
  let estadoFinal = undefined;

  const { data, count } = await getCoordinadoresRepository({
    id,
    documento,
    nombres,
    apellidos,
    correo,
    telefono,
    estado: estadoFinal,
    centros_id,
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

  return { data, count, meta, links, isPaginated: true };
};


export const getListCoordinadoresService = async (estado, sortBy = "id", order = "ASC") => {
  // No aplicamos filtro por estado ya que la columna no existe.
  return await getListCoordinadoresRepository(undefined, sortBy, order);
};


export const storeCoordinadorService = async (data) => {
  // Validar unicidad de documento y correo
  // (esto normalmente se hace en el validador, pero aquí puedes agregar lógica extra si lo necesitas)
  return await storeCoordinadorRepository(data);
};


export const showCoordinadorService = async (id) => {
  return await showCoordinadorRepository(id);
};


export const updateCoordinadorService = async (id, data) => {
  const coordinador = await showCoordinadorRepository(id);
  if (!coordinador) {
    const error = new Error("Coordinador no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }
  // Validar unicidad de documento/correo si se actualizan
  return await updateCoordinadorRepository(id, data);
};

/**
 * Servicio para cambiar el estado de un coordinador.
 */
export const changeCoordinadorStatusService = async (id, nuevoEstado) => {
  const coordinador = await showCoordinadorRepository(id);
  if (!coordinador) {
    const error = new Error("Coordinador no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }
  // La operación de cambiar estado no está implementada porque la columna `estado` no existe.
  const error = new Error('CAMBIAR_ESTADO_NO_IMPLEMENTADO');
  error.code = 'NOT_IMPLEMENTED';
  throw error;
};
