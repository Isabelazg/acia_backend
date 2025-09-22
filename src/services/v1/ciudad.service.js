import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  getCitiesRepository,
  showCityRepository,
} from "../../repositories/ciudad.repository.js";

/**
 * Servicio para obtener roles con filtros, orden y paginación usando el repositorio.
 * @param {Request} req
 * @returns {Promise<Object>}
 */
export const getCitiesService = async (req) => {
  const {
    id,
    nombre,
    search, // Agregamos el parámetro search
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10,
    pagination = "true",
  } = req.query;

  // Lógica de filtros y paginación delegada al repositorio
  const { data, count } = await getCitiesRepository({
    id,
    nombre,
    search, // Pasamos el parámetro search al repositorio
    sortBy,
    order,
    page,
    limit,
    pagination,
  });

  const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;
  const queryWithoutPage = Object.entries({ ...req.query, page: undefined })
    .filter(([_, v]) => v !== undefined)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  if (pagination === "false") {
    return {
      data,
      count: data.length,
      meta: { total: data.length },
      links: {
        self: `${baseUrl}${queryWithoutPage ? "?" + queryWithoutPage : ""}`,
      },
      isPaginated: false,
    };
  } else {
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
  }
};



/**
 * Servicio para mostrar una ciudad por id.
 */
export const showCityService = async (id) => {
  return await showCityRepository(id);
};
