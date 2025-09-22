import { Op } from "sequelize";
import titulo_formacion from "../models/titulo_formacion.model.js";
import TituloFormacion from "../models/titulo_formacion.model.js"

/**
 * Obtener todos los titulos de formacion con filtros, orden y paginación.
 * Obtener lista de todos los títulos de formación.
 */
export const gettitulo_formacionRepository = async ({
  id,
  nombre,
  estado,
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  const whereClause = {};
  if (id) whereClause.id = id;
  if (nombre) whereClause.nombre = { [Op.like]: `%${nombre}%` };
  if (estado !== undefined) whereClause.estado = estado;

  const offset = (page - 1) * limit;

  const { count, rows } = await titulo_formacion.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

/**
 * Obtener lista de titulos de formacion (sin paginación).
 */
export const getListtitulo_formacionRepository = async (estado, sortBy = "id", order = "ASC") => {
  const whereClause = {};
  if (estado !== undefined) whereClause.estado = estado;

  const { count, rows } = await titulo_formacion.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return { data: rows, count };
};

/**
 * Buscar un titulo de formacion por ID.
 */
export const showtitulo_formacionRepository = async (id) => {
  return await titulo_formacion.findOne({ where: { id } });
};

/**
 * Crear un nuevo titulo de formacion.
 */
export const storetitulo_formacionRepository = async (data) => {
  return await titulo_formacion.create(data);
};

/**
 * Actualizar un titulo de formacion por ID.
 */
export const updatetitulo_formacionRepository = async (id, data) => {
  const titulo_formaciones = await titulo_formacion.findOne({ where: { id } });
  if (!titulo_formaciones) return null;
  await titulo_formaciones.update(data);
  await titulo_formaciones.reload();
  return titulo_formaciones;
};

/**
 * Eliminar un titulo de formacion por ID.
 */
export const deletetitulo_formacionRepository = async (id) => {
  const titulo_formaciones = await titulo_formacion.findOne({ where: { id } });
  if (!titulo_formaciones) return null;
  await titulo_formaciones.destroy();
  return true;
};

/**
 * Buscar un titulo de formacion por nombre, excluyendo un ID específico.
 */
export const findtitulo_formacionByNombreExcludingIdRepository = async (nombre, idToExclude) => {
  return await titulo_formacion.findOne({
    where: {
      nombre: nombre,
      id: {
        [Op.ne]: idToExclude // [Op.ne] significa "not equal" (no es igual a)
      }
    }
  });
};
export const getListTitulosFormacionRepository = async () => {
  const { count, rows } = await TituloFormacion.findAndCountAll({
    order: [["nombre", "ASC"]],
  })
  return { data: rows, count }
}
