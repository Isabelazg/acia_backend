import { buildPagination } from "../../utils/buildPagination.util.js";
import Resolucion from "../../models/resolucion.model.js";
import {
  getOrdenadoresRepository,
  getListOrdenadoresRepository,
  storeOrdenadorRepository,
  showOrdenadorRepository,
  showOrdenadorByIdRepository,
  updateOrdenadorRepository,
  updateOrdenadorByIdRepository,
  changeOrdenadorStatusRepository,
  changeOrdenadorStatusByIdRepository,
} from "../../repositories/ordenador.repository.js";

/**
 * Servicio para obtener ordenadores con filtros, orden y paginación usando el repositorio.
 * @param {Request} req
 * @returns {Promise<Object>}
 */
export const getOrdenadoresService = async (req) => {
  const {
    id,
    documento,
    nombres,
    apellidos,
    lugar_expedicion_id,
    lugar_domicilio_id,
    sexo,
    correo,
    telefono,
    estado,
    cargo_id,
    sortBy = "id",
    order = "ASC",
    page = 1,
    limit = 10
  } = req.query;

  // Convertir estado string a boolean si es necesario
  let estadoBoolean = estado;
  if (estado === 'true') estadoBoolean = true;
  if (estado === 'false') estadoBoolean = false;
  if (estado === undefined || estado === null) estadoBoolean = undefined;

  // Lógica de filtros y paginación delegada al repositorio
  const { data, count } = await getOrdenadoresRepository({
    id,
    documento,
    nombres,
    apellidos,
    lugar_expedicion_id,
    lugar_domicilio_id,
    sexo,
    correo,
    telefono,
    estado: estadoBoolean,
    cargo_id,
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
 * Servicio para obtener la lista de ordenadores.
 * @returns {Promise<Object>}
 */
export const getListOrdenadoresService = async (estado, sortBy = "id", order = "ASC") => {
  return await getListOrdenadoresRepository(estado, sortBy, order);
};

/**
 * Servicio para crear un nuevo ordenador.
 */
export const storeOrdenadorService = async (data) => {
  // Separar los datos del ordenador de los datos de la resolución
  const {
    fecha_resolucion,
    acta_posesion,
    es_encargado,
    fecha_posesion,
    fecha_ingreso,
    fecha_retiro,
    ...ordenadorData
  } = data;

  // Crear el nuevo ordenador
  const nuevoOrdenador = await storeOrdenadorRepository(ordenadorData);

  // Si hay datos de resolución, crear la resolución asociada
  if (fecha_resolucion || acta_posesion || fecha_posesion || fecha_ingreso || fecha_retiro || es_encargado !== undefined) {
    const resolucionData = {
      fecha: fecha_resolucion || new Date().toISOString().split('T')[0],
      acta_posesion: acta_posesion || null,
      es_encargado: es_encargado !== undefined ? parseInt(es_encargado) : 0,
      fecha_posesion: fecha_posesion || null,
      fecha_ingreso: fecha_ingreso || new Date().toISOString().split('T')[0],
      fecha_retiro: fecha_retiro || null,
      centro_id: 1, // TODO: Obtener del centro actual del usuario
      ordenadores_id: nuevoOrdenador.id,
    };

    await Resolucion.create(resolucionData);
  }

  return nuevoOrdenador;
};

/**
 * Servicio para mostrar un ordenador por documento.
 */
export const showOrdenadorService = async (documento) => {
  return await showOrdenadorRepository(documento);
};

/**
 * Servicio para mostrar un ordenador por ID.
 */
export const showOrdenadorByIdService = async (id) => {
  return await showOrdenadorByIdRepository(id);
};

/**
 * Servicio para actualizar un ordenador.
 */
export const updateOrdenadorService = async (documento, data) => {
  const ordenador = await showOrdenadorRepository(documento);
  if (!ordenador) {
    const error = new Error("Ordenador no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }

  // Separar los datos del ordenador de los datos de la resolución
  const {
    fecha_resolucion,
    acta_posesion,
    es_encargado,
    fecha_posesion,
    fecha_ingreso,
    fecha_retiro,
    ...ordenadorData
  } = data;

  // Actualizar el ordenador
  const ordenadorActualizado = await updateOrdenadorRepository(documento, ordenadorData);

  // Manejar la resolución asociada
  if (fecha_resolucion || acta_posesion || fecha_posesion || fecha_ingreso || fecha_retiro || es_encargado !== undefined) {
    // Buscar resolución existente
    const resolucionExistente = await Resolucion.findOne({
      where: { ordenadores_id: ordenador.id }
    });

    const resolucionData = {
      fecha: fecha_resolucion || (resolucionExistente?.fecha) || new Date().toISOString().split('T')[0],
      acta_posesion: acta_posesion !== undefined ? acta_posesion : resolucionExistente?.acta_posesion,
      es_encargado: es_encargado !== undefined ? parseInt(es_encargado) : (resolucionExistente?.es_encargado || 0),
      fecha_posesion: fecha_posesion !== undefined ? fecha_posesion : resolucionExistente?.fecha_posesion,
      fecha_ingreso: fecha_ingreso || (resolucionExistente?.fecha_ingreso) || new Date().toISOString().split('T')[0],
      fecha_retiro: fecha_retiro !== undefined ? fecha_retiro : resolucionExistente?.fecha_retiro,
      centro_id: resolucionExistente?.centro_id || 1, // TODO: Obtener del centro actual del usuario
      ordenadores_id: ordenador.id,
    };

    if (resolucionExistente) {
      // Actualizar resolución existente
      await resolucionExistente.update(resolucionData);
    } else {
      // Crear nueva resolución
      await Resolucion.create(resolucionData);
    }
  }

  return ordenadorActualizado;
};

/**
 * Servicio para actualizar un ordenador por ID.
 */
export const updateOrdenadorByIdService = async (id, data) => {
  const ordenador = await showOrdenadorByIdRepository(id);
  if (!ordenador) {
    const error = new Error("Ordenador no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }

  // Separar los datos del ordenador de los datos de la resolución
  const {
    fecha_resolucion,
    acta_posesion,
    es_encargado,
    fecha_posesion,
    fecha_ingreso,
    fecha_retiro,
    ...ordenadorData
  } = data;

  // Actualizar el ordenador
  const ordenadorActualizado = await updateOrdenadorByIdRepository(id, ordenadorData);

  // Manejar la resolución asociada
  if (fecha_resolucion || acta_posesion || fecha_posesion || fecha_ingreso || fecha_retiro || es_encargado !== undefined) {
    // Buscar resolución existente
    const resolucionExistente = await Resolucion.findOne({
      where: { ordenadores_id: id }
    });

    const resolucionData = {
      fecha: fecha_resolucion || (resolucionExistente?.fecha) || new Date().toISOString().split('T')[0],
      acta_posesion: acta_posesion !== undefined ? acta_posesion : resolucionExistente?.acta_posesion,
      es_encargado: es_encargado !== undefined ? parseInt(es_encargado) : (resolucionExistente?.es_encargado || 0),
      fecha_posesion: fecha_posesion !== undefined ? fecha_posesion : resolucionExistente?.fecha_posesion,
      fecha_ingreso: fecha_ingreso || (resolucionExistente?.fecha_ingreso) || new Date().toISOString().split('T')[0],
      fecha_retiro: fecha_retiro !== undefined ? fecha_retiro : resolucionExistente?.fecha_retiro,
      centro_id: resolucionExistente?.centro_id || 1, // TODO: Obtener del centro actual del usuario
      ordenadores_id: id,
    };

    if (resolucionExistente) {
      // Actualizar resolución existente
      await resolucionExistente.update(resolucionData);
    } else {
      // Crear nueva resolución
      await Resolucion.create(resolucionData);
    }
  }

  return ordenadorActualizado;
};

/**
 * Servicio para cambiar el estado de un ordenador.
 */
export const changeOrdenadorStatusService = async (documento, estado) => {
  const ordenador = await showOrdenadorRepository(documento);
  if (!ordenador) {
    const error = new Error("Ordenador no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }

  return await changeOrdenadorStatusRepository(documento, estado);
};

/**
 * Servicio para cambiar el estado de un ordenador por ID.
 */
export const changeOrdenadorStatusByIdService = async (id, estado) => {
  const ordenador = await showOrdenadorByIdRepository(id);
  if (!ordenador) {
    const error = new Error("Ordenador no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }

  return await changeOrdenadorStatusByIdRepository(id, estado);
};
