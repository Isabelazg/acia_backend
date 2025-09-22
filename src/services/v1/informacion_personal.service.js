import {
  getinformacionnpersonalRepository,
  getlistInformacionnpersonalRepository,
  storeinformacionnpersonalRepository,
  showinformacionpersonalRepository,
  updateinformacionpersonalRepository,
  findinformacionpersonalByCorreoOrDocumentoExcludingIdRepository
} from "../../repositories/informacion_personal.repository.js";

import { buildPagination } from "../../utils/buildPagination.util.js";

/**
 * Servicio para obtener registros de información personal con filtros, orden y paginación.
 */
export const getInformacionnPersonalService = async (req) => {
  const {
    id,
    nombres,
    apellidos,
    tipo_documento,
    numero_documento,
    correo,
    telefono,
    direccion,
    estado,
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10
  } = req.query;

  let estadoBoolean = estado;
  if (estado === "true") estadoBoolean = true;
  if (estado === "false") estadoBoolean = false;
  if (estado === undefined || estado === null) estadoBoolean = undefined;

  const { data, count } = await getinformacionnpersonalRepository({
    id,
    nombres,
    apellidos,
    tipo_documento,
    numero_documento,
    correo,
    telefono,
    direccion,
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
 * Servicio para obtener la lista sin paginación.
 */
export const getListInformacionPersonalService = async (estado, sortBy = "id", order = "ASC") => {
  return await getlistInformacionnpersonalRepository(estado, sortBy, order);
};

/**
 * Servicio para crear un nuevo registro de información personal.
 */
export const storeinformacionnpersonalRepository = async (data) => {
  // Verificar duplicados de correo y documento
  const existing = await findinformacionpersonalByCorreoOrDocumentoExcludingIdRepository(data.correo, data.numero_documento, null);
  if (existing) {
    const error = new Error(`El correo o número de documento ya están registrados.`);
    error.code = "DUPLICATE_INFORMACION_PERSONAL";
    throw error;
  }

  return await storeinformacionnpersonalRepository(data);
};

/**
 * Servicio para mostrar un registro por id.
 */
export const showInformacionPersonalService = async (id) => {
  return await showinformacionpersonalRepository(id);
};

/**
 * Servicio para actualizar un registro.
 */
export const updateinformacionpersonalService = async (id, data) => {
  const registro = await showinformacionpersonalRepository(id);
  if (!registro) {
    const error = new Error("Información personal no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }

  // Validar correo y documento duplicados
  if (data.correo || data.numero_documento) {
    const existing = await findinformacionpersonalByCorreoOrDocumentoExcludingIdRepository(data.correo, data.numero_documento, id);
    if (existing) {
      const error = new Error("El correo o número de documento ya están registrados por otro usuario.");
      error.code = "DUPLICATE_INFORMACION_PERSONAL";
      throw error;
    }
  }

  return await updateinformacionpersonalRepository(id, data);
};

/**
 * Servicio para cambiar el estado (activo/inactivo).
 */
export const changeInformacionPersonalStatusService = async (id, nuevoEstado) => {
  const registro = await showinformacionpersonalRepository(id);
  if (!registro) {
    const error = new Error("Información personal no encontrada");
    error.code = "NOT_FOUND";
    throw error;
  }

  let estadoBoolean;
  if (typeof nuevoEstado === "boolean") {
    estadoBoolean = nuevoEstado;
  } else if (nuevoEstado === "true") {
    estadoBoolean = true;
  } else if (nuevoEstado === "false") {
    estadoBoolean = false;
  } else {
    estadoBoolean = !registro.estado;
  }

  if (estadoBoolean === false) {
    const hasAutorizaciones = await checkinformacionPersonalHasautorizacionesRepository(id);
    if (hasAutorizaciones) {
      const error = new Error("No se puede desactivar porque tiene autorizaciones asociadas.");
      error.code = "INFORMACION_PERSONAL_HAS_AUTORIZACIONES";
      throw error;
    }
  }

  const updated = await updateinformacionpersonalRepository(id, { estado: estadoBoolean });
  return updated;
};
