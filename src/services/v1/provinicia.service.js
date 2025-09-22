import { buildPagination } from "../../utils/buildPagination.util.js";
import {
    getProvinciesRepository,
    showProvinceRepository,
} from "../../repositories/provincia.repository.js";
import { getCitiesByProvinceRepository } from "../../repositories/ciudad.repository.js";

/**
 * Servicio para obtener roles con filtros, orden y paginación usando el repositorio.
 * @param {Request} req
 * @returns {Promise<Object>}
 */
export const getProvincesService = async (req) => {
    const {
        id,
        nombre,
        search, // Agregamos el parámetro search
        sortBy = "id",
        order = "ASC",
        page = 1,
        limit = 10
    } = req.query;

    // Lógica de filtros y paginación delegada al repositorio
    const { data, count } = await getProvinciesRepository({
        id,
        nombre,
        search, // Pasamos el parámetro search al repositorio
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
    };
};

/**
 * Servicio para mostrar una provincia por id.
 */
export const showProvinceService = async (id) => {
    return await showProvinceRepository(id);
};

/**
 * Servicio para obtener las ciudades de una provincia por ID.
 */
export const getCitiesByProvinceService = async (provinceId, sortBy = "id", order = "ASC") => {
    const province = await showProvinceRepository(provinceId);
    if (!province) {
        const error = new Error("Provincia no encontrada");
        error.code = "NOT_FOUND";
        throw error;
    }

    const { data, count } = await getCitiesByProvinceRepository(provinceId, sortBy, order);
    return { data, count };
};
