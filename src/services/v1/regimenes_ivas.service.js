import {
  getRegimenesIvasRepository,
  getListRegimenesIvasRepository,
  storeRegimenIvaRepository,
  showRegimenIvaRepository,
  updateRegimenIvaRepository,
  findRegimenIvaByNombreExcludingIdRepository,
  checkRegimenIvaHasAutorizacionesRepository
} from "../../repositories/regimenes_ivas.repository.js";
import { buildPagination } from "../../utils/buildPagination.util.js";

/**
 * Servicio para obtener regimenes de IVA con filtros, orden y paginación usando el repositorio.
 */
export const getRegimenesIvasService = async (req) => {
  const { id, nombres, estado, sortBy = "id", order = "ASC", page = 1, limit = 10 } = req.query; // <-- CORREGIDO a 'nombres'

  let estadoBoolean = estado;
  if (estado === 'true') estadoBoolean = true;
  if (estado === 'false') estadoBoolean = false;
  if (estado === undefined || estado === null) estadoBoolean = undefined;

  const { data, count } = await getRegimenesIvasRepository({
    id,
    nombres, // <-- CORREGIDO a 'nombres'
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
 * Servicio para obtener la lista de regimenes de IVA.
 */
export const getListRegimenesIvasService = async (estado, sortBy = "id", order = "ASC") => {
  return await getListRegimenesIvasRepository(estado, sortBy, order);
}

/**
 * Servicio para crear un nuevo regimen de IVA.
 */
export const storeRegimenIvaService = async (data) => {
  return await storeRegimenIvaRepository(data);
};

/**
 * Servicio para mostrar un regimen de IVA por id.
 */
export const showRegimenIvaService = async (id) => {
  return await showRegimenIvaRepository(id);
};

/**
 * Servicio para actualizar un regimen de IVA.
 */
export const updateRegimenIvaService = async (id, data) => {
  const regimenIva = await showRegimenIvaRepository(id);
  if (!regimenIva) {
    const error = new Error("Regimen de IVA no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }

  // Verificar que no exista otro regimen de IVA con el mismo nombres
  if (data.nombres && data.nombres !== regimenIva.nombres) { // <-- CORREGIDO a 'nombres'
    const existingRegimenByNombre = await findRegimenIvaByNombreExcludingIdRepository(data.nombres, id); // <-- CORREGIDO a 'nombres'
    if (existingRegimenByNombre) {
      const error = new Error(`El nombre "${data.nombres}" ya está registrado. No se puede repetir el nombre.`); // <-- CORREGIDO a 'nombres'
      error.code = "DUPLICATE_REGIMEN_IVA_NAME";
      throw error;
    }
  }

  return await updateRegimenIvaRepository(id, data);
};

/**
 * Servicio para cambiar el estado de un regimen de IVA.
 */
export const changeRegimenIvaStatusService = async (id, nuevoEstado) => {
  const regimenIva = await showRegimenIvaRepository(id);
  if (!regimenIva) {
    const error = new Error("Regimen de IVA no encontrado");
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
    estadoBoolean = !regimenIva.estado;
  }

  if (estadoBoolean === false) {
    const hasAutorizaciones = await checkRegimenIvaHasAutorizacionesRepository(id);
    if (hasAutorizaciones) {
      const error = new Error("No se puede desactivar el regimen de IVA porque tiene autorizaciones asociadas");
      error.code = "REGIMEN_IVA_HAS_AUTORIZACIONES";
      throw error;
    }
  }

  const updatedRegimenIva = await updateRegimenIvaRepository(id, { estado: estadoBoolean });
  return updatedRegimenIva;
};