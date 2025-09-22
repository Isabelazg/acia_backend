import { errorResponse, successResponse } from "../../../utils/response.util.js";
import {
  getFuentesRecursosService,
  getListFuentesRecursosService,
  showFuenteRecursoService,
  storeFuenteRecursoService,
  updateFuenteRecursoService,
  deleteFuenteRecursoService
} from "../../../services/v1/fuenteRecurso.service.js";

export const getFuentesRecursos = async (req, res) => {
  try {
    const result = await getFuentesRecursosService(req);
    return res.status(200).json(result);
  } catch (error) {
    return errorResponse(res, "Error al obtener las fuentes de recursos", 500, [
      { code: "GET_FUENTES_RECURSOS_ERROR", detail: error.message }
    ]);
  }
};

export const getListFuentesRecursos = async (req, res) => {
  try {
    const { data, count } = await getListFuentesRecursosService();
    return successResponse(res, data, 200, { count });
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de fuentes de recursos", 500, [
      { code: "GET_LIST_FUENTES_RECURSOS_ERROR", detail: error.message }
    ]);
  }
};

export const showFuenteRecurso = async (req, res) => {
  try {
    const fuente = await showFuenteRecursoService(req.params.id);
    if (!fuente) {
      return errorResponse(res, "No existe la fuente de recurso", 404, [
        { code: "FUENTE_RECURSO_NOT_FOUND", detail: `No existe fuente con id ${req.params.id}` }
      ]);
    }
    return successResponse(res, fuente, 200);
  } catch (error) {
    return errorResponse(res, "Error al obtener la fuente de recurso", 500, [
      { code: "SHOW_FUENTE_RECURSO_ERROR", detail: error.message }
    ]);
  }
};

export const storeFuenteRecurso = async (req, res) => {
  try {
    const fuente = await storeFuenteRecursoService(req.body);
    return successResponse(res, fuente, 201);
  } catch (error) {
    return errorResponse(res, "Error al crear la fuente de recurso", 500, [
      { code: "CREATE_FUENTE_RECURSO_ERROR", detail: error.message }
    ]);
  }
};

export const updateFuenteRecurso = async (req, res) => {
  try {
    const fuente = await updateFuenteRecursoService(req.params.id, req.body);
    if (!fuente) {
      return errorResponse(res, "No existe la fuente de recurso", 404, [
        { code: "FUENTE_RECURSO_NOT_FOUND", detail: `No existe fuente con id ${req.params.id}` }
      ]);
    }
    return successResponse(res, fuente, 200);
  } catch (error) {
    return errorResponse(res, "Error al actualizar la fuente de recurso", 500, [
      { code: "UPDATE_FUENTE_RECURSO_ERROR", detail: error.message }
    ]);
  }
};

export const deleteFuenteRecurso = async (req, res) => {
  try {
    const deleted = await deleteFuenteRecursoService(req.params.id);
    if (!deleted) {
      return errorResponse(res, "No existe la fuente de recurso", 404, [
        { code: "FUENTE_RECURSO_NOT_FOUND", detail: `No existe fuente con id ${req.params.id}` }
      ]);
    }
    return successResponse(res, { deleted: true }, 200);
  } catch (error) {
    return errorResponse(res, "Error al eliminar la fuente de recurso", 500, [
      { code: "DELETE_FUENTE_RECURSO_ERROR", detail: error.message }
    ]);
  }
};