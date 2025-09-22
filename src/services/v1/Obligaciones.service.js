import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getObligacionesRepository,
  getListObligacionesRepository,
  showObligacionRepository, // Singular
  storeObligacionRepository, // Singular
  updateObligacionRepository, // Singular
  deleteObligacionRepository, // Singular
  findObligacionByNumeroOrdenExcludingIdRepository, // Singular
  findObligacionByNombreExcludingIdRepository // Singular
} from "../../repositories/Obligaciones.repository.js"; // Ruta al repositorio

// No necesitas importar el modelo directamente en el servicio si solo lo usas en el repositorio.
// Si lo necesitas por alguna razón de lógica de negocio en el servicio, la importación sería así:
// import Obligacion from "../../models/obligacion.model.js";

/**
 * Servicio para obtener obligaciones con filtros, orden y paginación usando el repositorio.
 */
export const getObligacionesService = async (req) => {
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

  try {
    const { data, count } = await getObligacionesRepository({
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
  } catch (error) {
    console.error('Error en getObligacionesService:', error);
    throw error;
  }
};

/**
 * Servicio para obtener la lista de obligaciones.
 */
export const getListObligacionesService = async (sortBy = "id", order = "ASC") => {
  try {
    const { data, count } = await getListObligacionesRepository(sortBy, order);
    return { data, count };
  } catch (error) {
    console.error('Error en getListObligacionesService:', error);
    throw error;
  }
}

/**
 * Servicio para crear una nueva obligacion.
 */
export const storeObligacionesService = async (data) => {
  try {
    return await storeObligacionRepository(data); // Singular
  } catch (error) {
    console.error('Error en storeObligacionesService:', error);
    throw error;
  }
};

/**
 * Servicio para mostrar una obligacion por id.
 */
export const showObligacionesService = async (id) => {
  try {
    const obligacion = await showObligacionRepository(id); // Singular
    if (!obligacion) {
      const error = new Error("Obligación no encontrada");
      error.code = "NOT_FOUND";
      throw error;
    }
    return obligacion;
  } catch (error) {
    console.error('Error en showObligacionesService:', error);
    throw error;
  }
};

/**
 * Servicio para actualizar una obligacion.
 */
export const updateObligacionesService = async (id, data) => {
  try {
    const obligacion = await showObligacionRepository(id); // Singular
    if (!obligacion) {
      const error = new Error("Obligación no encontrada");
      error.code = "NOT_FOUND";
      throw error;
    }
    return await updateObligacionRepository(id, data); // Singular
  } catch (error) {
    console.error('Error en updateObligacionesService:', error);
    throw error;
  }
};

/**
 * Servicio para eliminar una obligacion.
 */
export const deleteObligacionesService = async (id) => {
    // 1. Primero, se verifica si la obligación existe
    const obligacion = await showObligacionRepository(id);

    // 2. Si no existe, se lanza el error correcto
    if (!obligacion) {
        const error = new Error("Obligación no encontrada");
        error.code = "NOT_FOUND";
        throw error;
    }

    // 3. Ahora, se llama a la función correcta para eliminar el registro.
    await deleteObligacionRepository(id);

    // 4. Se devuelve el objeto eliminado para la respuesta exitosa en el controlador.
    return obligacion;
};

