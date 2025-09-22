import { errorResponse, successResponse } from "../../../utils/response.util.js";
import {
  getformaciones_complementariasService,
  getListformaciones_complementariasService,
  storeformaciones_complementariasService,
  showformaciones_complementariasService,
  updateformaciones_complementariasService,
} from "../../../services/v1/formaciones_complementarias.service.js";

/**
 * Obtener formaciones complementarias con filtros y paginación
 */
export const getformaciones_complementarias = async (req, res) => {
  try {
    const { data, meta, links } = await getformaciones_complementariasService(req);

    return successResponse(res, data, 200, meta, links);
  } catch (error) {
    return errorResponse(res, "Error al obtener las formaciones complementarias", 500, [
      { code: "GET_FORMACIONES_COMPLEMENTARIAS_ERROR", detail: error.message },
    ]);
  }
};

/**
 * Obtener lista sin paginación
 */
export const getListformaciones_complementarias = async (req, res) => {
  try {
    const { data, count } = await getListformaciones_complementariasService();

    return successResponse(res, data, 200, { count });
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de formaciones complementarias", 500, [
      { code: "GET_LIST_FORMACIONES_COMPLEMENTARIAS_ERROR", detail: error.message },
    ]);
  }
};

/**
 * Crear registro
 */
export const storeformaciones_complementarias = async (req, res) => {
  try {
    const {
      informatica_basica,
      tics,
      sve,
      formacion_pedagogica,
      formacion_competencias,
      formacion_proyectos,
    } = req.body;

    const nuevaFormacion = await storeformaciones_complementariasService({
      informatica_basica,
      tics,
      sve,
      formacion_pedagogica,
      formacion_competencias,
      formacion_proyectos,
    });

    return successResponse(res, nuevaFormacion, 201);
  } catch (error) {
    return errorResponse(res, "Error al crear la formación complementaria", 500, [
      { code: "CREATE_FORMACIONES_COMPLEMENTARIAS_ERROR", detail: error.message },
    ]);
  }
};

/**
 * Mostrar por ID
 */
export const showformaciones_complementarias = async (req, res) => {
  try {
    const formacion = await showformaciones_complementariasService(req.params.id);

    if (!formacion) {
      return errorResponse(res, "No existe una formación complementaria con ese ID", 404, [
        { code: "FORMACION_COMPLEMENTARIA_NOT_FOUND", detail: `ID ${req.params.id}` },
      ]);
    }

    return successResponse(res, formacion, 200);
  } catch (error) {
    return errorResponse(res, "Error al obtener la formación complementaria", 500, [
      { code: "SHOW_FORMACIONES_COMPLEMENTARIAS_ERROR", detail: error.message },
    ]);
  }
};

/**
 * Actualizar
 */
export const updateformaciones_complementarias = async (req, res) => {
  try {
    const formacion = await updateformaciones_complementariasService(req.params.id, req.body);

    if (!formacion) {
      return errorResponse(res, "No se encontró la formación complementaria", 404, [
        { code: "FORMACION_COMPLEMENTARIA_NOT_FOUND", detail: `ID ${req.params.id}` },
      ]);
    }

    return successResponse(res, formacion, 200);
  } catch (error) {
    return errorResponse(res, "Error al actualizar la formación complementaria", 500, [
      { code: "UPDATE_FORMACIONES_COMPLEMENTARIAS_ERROR", detail: error.message },
    ]);
  }
};
