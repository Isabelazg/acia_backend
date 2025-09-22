import { buildPagination } from "../../utils/buildPagination.util.js";
import {
  gettipo_documentoRepository,
  storetipo_documentoRepository,
  showtipo_documentoRepository,
  updatetipo_documentoRepository,
  getListtipo_documentoRepository,
  findtipo_documentoByNombreExcludingIdRepository
} from "../../repositories/tipo_documento.repository.js";

/**
 * Servicio para obtener las tipo de documento con filtros, orden y paginación usando el repositorio.
 */
export const gettipo_documentoService = async (req) => {
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

  const { data, count } = await gettipo_documentoRepository({
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
 * Servicio para obtener la lista de la tipo de documento.
 */
export const getListtipo_documentoService = async (estado, sortBy = "id", order = "ASC") => {
  return await getListtipo_documentoRepository(estado, sortBy, order);
}

/**
 * Servicio para crear un nuevo cargo.
 */
export const storetipo_documentoService = async (data) => {
  return await storetipo_documentoRepository(data);
};

/**
 * Servicio para mostrar un tipo de documento por id.
 */
export const showtipo_documentoService = async (id) => {
  return await showtipo_documentoRepository(id);
};

/**
 * Servicio para actualizar un tipo de documento.
 */
export const updatetipo_documentoService = async (id, data) => {
  const tipo_documento = await showtipo_documentoRepository(id);
  if (!tipo_documento) {
    const error = new Error("tipo de documento no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }

  // Si se está actualizando el nombre, verificar que no exista otra tipo de documento con el mismo nombre
  if (data.nombre && data.nombre !== tipo_documento.nombre) {
    const existingCargoByNombre = await findtipo_documentoByNombreExcludingIdRepository(data.nombre, id);
    if (existingCargoByNombre) {
      const error = new Error(`El nombre "${data.nombre}" ya está registrado. No se puede repetir el nombre.`);
      error.code = "DUPLICATE_CARGO_NAME";
      throw error;
    }
  }

  return await updatetipo_documentoRepository(id, data);
};

/**
 * Servicio para cambiar el estado de un tipo_documento.
 */
export const changetipo_documentoStatusService = async (id, nuevoEstado) => {
  const tipo_documento = await showtipo_documentoRepository(id);
  if (!tipo_documento) {
    const error = new Error("tipo de documento no encontrado");
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
    estadoBoolean = !tipo_documento.estado;
  }

  if (estadoBoolean === false) {
    const hasCentros = await checktipo_documentoHasAutorizacionesRepository(id);
    if (hasCentros) {
      const error = new Error("No se puede desactivar el la tipo de documento porque tiene autorizaciones asociadas");
      error.code = "TIPO_DOCUMENTO_HAS_AUTORIZACIONES";
      throw error;
    }
  }

  const updatedtipo_documento = await updatetipo_documentoRepository(id, { estado: estadoBoolean });
  return updatedtipo_documento;
};
