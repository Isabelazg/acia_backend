import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  gettitulo_formacionRepository,
  storetitulo_formacionRepository,
  showtitulo_formacionRepository,
  updatetitulo_formacionRepository,
  findtitulo_formacionByNombreExcludingIdRepository,
  getListtitulo_formacionRepository
} from "../../repositories/tipo_formacion.repository.js";

/**
 * Servicio para obtener los titulos de formacion con filtros, orden y paginación usando el repositorio.
 */
export const gettitulo_formacionService = async (req) => {
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

  const { data, count } = await gettitulo_formacionRepository({
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
};

/**
 * Servicio para obtener la lista de titulos de formaciones.
 */
export const getListtitulo_formacionService = async (estado, sortBy = "id", order = "ASC") => {
  return await getListtitulo_formacionRepository(estado, sortBy, order);
}

/**
 * Servicio para crear un nuevo titulos de formacion.
 */
export const storetitulo_formacionService = async (data) => {
  return await storetitulo_formacionRepository(data);
};

/**
 * Servicio para mostrar un titulo de formacion por id.
 */
export const showtitulo_formacionService = async (id) => {
  return await showtitulo_formacionRepository(id);
};

/**
 * Servicio para actualizar un titulo de formacion.
 */
export const updatetitulo_formacionService = async (id, data) => {
  const titulo_formacion = await showtitulo_formacionRepository(id);
  if (!titulo_formacion) {
    const error = new Error("titulo de formacion no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }

  // Si se está actualizando el nombre, verificar que no exista otro titulo de formacion con el mismo nombre
  if (data.nombre && data.nombre !== titulo_formacion.nombre) {
    const existingCargoByNombre = await findtitulo_formacionByNombreExcludingIdRepository(data.nombre, id);
    if (existingCargoByNombre) {
      const error = new Error(`El nombre "${data.nombre}" ya está registrado. No se puede repetir el nombre.`);
      error.code = "DUPLICATE_CARGO_NAME";
      throw error;
    }
  }

  return await updatetitulo_formacionRepository(id, data);
};

/**
 * Servicio para cambiar el estado de un titulo_formacion.
 */
export const changetitulo_formacionStatusService = async (id, nuevoEstado) => {
  const titulo_formacion = await showtitulo_formacionRepository(id);
  if (!titulo_formacion) {
    const error = new Error("titulo de formacion no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }

  let estadoBoolean;
  if (typeof nuevoEstado === 'boolean') {
    estadoBoolean = nuevoEstado;
  } else if (nuevoEstado === 'true') {
    estadoBoolean = true;
  } else if (nuevoEstado === 'false') {
    estadoBoolean = false;
  } else {
    estadoBoolean = !titulo_formacion.estado;
  }

  if (estadoBoolean === false) {
    const hasCentros = await checktitulo_formacionHasAutorizacionesRepository(id);
    if (hasCentros) {
      const error = new Error("No se puede desactivar el titulo de formacion porque tiene autorizaciones asociadas");
      error.code = "TITULO_FORMACION_HAS_AUTORIZACIONES";
      throw error;
    }
  }

  const updatedtitulo_formacion = await updatetitulo_formacionRepository(id, { estado: estadoBoolean });
  return updatedtitulo_formacion;
};
