import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getexperiencia_laboralRepository,
  getListexperiencia_laboralRepository,
  storeexperiencia_laboralRepository,
  showexperiencia_laboralRepository,
  updateexperiencia_laboralRepository,
} from "../../repositories/experiencia_laboral.repository.js";

/**
 * Servicio para obtener las experiencias laborales con filtros, orden y paginación.
 */
export const getexperiencia_laboralService = async (req) => {
  const {
    id,
    empresa,
    cargo,
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10
  } = req.query;

  // Validación y sanitización de los parámetros de ordenación
  const allowedSortColumns = ["id", "empresa", "cargo", "fecha_ingreso", "fecha_retiro", "experiencia_docente"];
  const sortColumn = allowedSortColumns.includes(sortBy) ? sortBy : "id";
  const sortOrder = (order.toUpperCase() === "ASC" || order.toUpperCase() === "DESC") ? order.toUpperCase() : "ASC";

  const { data, count } = await getexperiencia_laboralRepository({
    id,
    empresa,
    cargo,
    sortBy: sortColumn,
    order: sortOrder,
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
 * Servicio para obtener la lista de experiencia laboral.
 */
export const getListexperiencia_laboralService = async (sortBy = "id", order = "ASC") => {
  // Validación y sanitización de los parámetros de ordenación
  const allowedSortColumns = ["id", "empresa", "cargo", "fecha_ingreso", "fecha_retiro", "experiencia_docente"];
  const sortColumn = allowedSortColumns.includes(sortBy) ? sortBy : "id";
  const sortOrder = (order.toUpperCase() === "ASC" || order.toUpperCase() === "DESC") ? order.toUpperCase() : "ASC";

  return await getListexperiencia_laboralRepository(sortColumn, sortOrder);
};

/**
 * Servicio para crear una nueva experiencia laboral.
 */
export const storeexperiencia_laboralService = async (data) => {
  return await storeexperiencia_laboralRepository(data);
};

/**
 * Servicio para crear múltiples experiencias laborales.
 */
export const storeMultipleExperienciasService = async (experienciasArray) => {
  if (!Array.isArray(experienciasArray) || experienciasArray.length === 0) {
    const error = new Error("Debe enviar un array de experiencias laborales válido.");
    error.code = "INVALID_INPUT_ARRAY";
    throw error;
  }

  const createdExperiencias = [];
  for (const experiencia of experienciasArray) {
    const nuevaExperiencia = await storeexperiencia_laboralRepository(experiencia);
    createdExperiencias.push(nuevaExperiencia);
  }
  return createdExperiencias;
};

/**
 * Servicio para mostrar una experiencia laboral por id.
 */
export const showexperiencia_laboralService = async (id) => {
  return await showexperiencia_laboralRepository(id);
};

/**
 * Servicio para actualizar una experiencia laboral.
 */
export const updateexperiencia_laboralService = async (id, data) => {
  const experiencia_laboral = await showexperiencia_laboralRepository(id);
  if (!experiencia_laboral) {
    const error = new Error("Experiencia laboral no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }

  return await updateexperiencia_laboralRepository(id, data);
};