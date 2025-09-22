import { buildPagination } from '../../utils/buildPagination.util.js';
import {
  getAreasRepository,
  getListAreasRepository,
  showAreaRepository,
  storeAreaRepository,
  updateAreaRepository,
  changeAreaStatusRepository,
} from "../../repositories/area.repository.js";
import db from "../../models/index.js";

const { Area, Centro } = db;



/**
 * Servicio para obtener áreas con filtros, orden y paginación.
 */
export const getAreasService = async (req) => {
  const {
    id,
    nombre,
    estado,
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10,
  } = req.query;

  const { data, count } = await getAreasRepository({
    id,
    nombre,
    estado,
    sortBy,
    order,
    page,
    limit,
  });


  const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
  const queryWithoutPage = Object.entries({ ...req.query, page: undefined })
    .filter(([_, v]) => v !== undefined)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

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
 * Servicio para obtener la lista de áreas sin paginación.
 */
export const getListAreasService = async (req) => {
  const { sortBy = 'id', order = 'ASC', page = 1, limit = 10 } = req.query;
  const { data, count } = await getListAreasRepository(sortBy, order, undefined, page, limit);
  return { data, count };
};

/**
 * Servicio para crear un área.
 */
export const storeAreaService = async (data) => {
  // Validación de nombre duplicado
  if (!data.nombre || !data.nombre.trim()) {
    const error = new Error("El nombre del área es obligatorio");
    error.code = "VALIDATION_ERROR";
    error.field = "nombre";
    throw error;
  }
  if (data.nombre.trim().length < 3) {
    const error = new Error("El nombre del área debe tener al menos 3 caracteres");
    error.code = "VALIDATION_ERROR";
    error.field = "nombre";
    throw error;
  }
  if (data.nombre.trim().length > 100) {
    const error = new Error("El nombre del área no puede exceder 100 caracteres");
    error.code = "VALIDATION_ERROR";
    error.field = "nombre";
    throw error;
  }
  // Verificar duplicado
  const existingArea = await Area.findOne({ where: { nombre: data.nombre.trim() } });
  if (existingArea) {
    const error = new Error("Este nombre ya está registrado");
    error.code = "DUPLICATE_AREA_NAME";
    error.field = "nombre";
    throw error;
  }
  let centros = [];
  if (Array.isArray(data.centros)) {
    centros = data.centros;
    delete data.centros;
  }
  const area = await Area.create(data);
  if (centros.length > 0) {
    try {
      await area.setCentros(centros);
    } catch (err) {
      // Puedes agregar manejo de error si lo necesitas
    }
  }
  return area;
};

/**
 * Servicio para mostrar un área por ID.
 */
export const showAreaService = async (id) => {
  return await showAreaRepository(id);
};

/**
 * Servicio para actualizar un área por ID.
 */
export const updateAreaService = async (id, data) => {
  const area = await Area.findByPk(id);
  if (!area) {
    const error = new Error("Área no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }
  let centros = [];
  if (Array.isArray(data.centros)) {
    centros = data.centros;
    delete data.centros;
  }
  await area.update(data);
  if (centros.length > 0) {
    try {
      await area.setCentros(centros);
    } catch (err) {
      // Puedes agregar manejo de error si lo necesitas
    }
  }
  await area.reload();
  return area;
};

/**
 * Servicio para cambiar el estado de un área por ID.
 */
export const changeAreaStatusService = async (id, estado) => {
  const area = await showAreaRepository(id);
  if (!area) {
    const error = new Error("Área no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }

  return await changeAreaStatusRepository(id, estado);
};