import { Op } from "sequelize";
import Provincia from "../models/provincia.model.js";

/**
 * Repositorio para obtener provincias con filtros, orden y paginación.
 */
export const getProvinciesRepository = async ({
    id,
    nombre,
    search, // Nuevo parámetro para búsqueda global
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10
}) => {
    const where = {};
    if (id) where.id = id;

    // Búsqueda global: buscar en el nombre
    if (search) {
        where[Op.or] = [
            { nombre: { [Op.like]: `%${search}%` } }
        ];
    } else {
        // Solo aplicar filtros específicos si no hay búsqueda global
        if (nombre) where.nombre = { [Op.like]: `%${nombre}%` };
    }

    const allowedSort = ["id", "nombre"];
    const orderBy = allowedSort.includes(sortBy) ? sortBy : "id";
    const orderDirection = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const { rows, count } = await Provincia.findAndCountAll({
        where,
        order: [[orderBy, orderDirection]],
        limit: parseInt(limit),
        offset,
    });
    return { data: rows, count };
};

/**
 * Buscar un provincia por id.
 */
export const showProvinceRepository = async (id) => {
    return await Provincia.findByPk(id);
};

