import { errorResponse, successResponse } from "../../../utils/response.util.js";
import {
  getDependenciasService,
  getListDependenciasService,
  storeDependenciaService,
  showDependenciaService,
  updateDependenciaService,
  getDependenciasByCentroService
} from "../../../services/v1/dependencia.service.js";

export const getDependencias = async (req, res) => {
  try {
    const result = await getDependenciasService(req);
    // Enviar meta y links como propiedades separadas
    return successResponse(res, result.data, 200, result.meta, result.links);
  } catch (error) {
    return errorResponse(res, "Error al obtener dependencias", 500, [
      { code: "GET_DEPENDENCIAS_ERROR", detail: error.message }
    ]);
  }
};

export const getListDependencias = async (req, res) => {
  try {
    const { data, count } = await getListDependenciasService(req);
    return successResponse(res, data, 200, { count });
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de dependencias", 500, [
      { code: "GET_LIST_DEPENDENCIAS_ERROR", detail: error.message }
    ]);
  }
};

export const storeDependencia = async (req, res) => {
  try {
    const dependencia = await storeDependenciaService(req.body);
    return successResponse(res, dependencia, 201);
  } catch (error) {
    return errorResponse(res, "Error al crear la dependencia", 500, [
      { code: "CREATE_DEPENDENCIA_ERROR", detail: error.message }
    ]);
  }
};

export const showDependencia = async (req, res) => {
  try {
    const { codigo } = req.params;
    const dependencia = await showDependenciaService(codigo);
    if (!dependencia) {
      return errorResponse(res, "Dependencia no encontrada", 404, [
        { code: "DEPENDENCIA_NOT_FOUND", detail: `No existe una dependencia con código ${codigo}` }
      ]);
    }
    return successResponse(res, dependencia, 200);
  } catch (error) {
    return errorResponse(res, "Error al obtener la dependencia", 500, [
      { code: "SHOW_DEPENDENCIA_ERROR", detail: error.message }
    ]);
  }
};

export const updateDependencia = async (req, res) => {
  try {
    const { codigo } = req.params;
    const dependencia = await updateDependenciaService(codigo, req.body);
    if (!dependencia) {
      return errorResponse(res, "Dependencia no encontrada", 404, [
        { code: "DEPENDENCIA_NOT_FOUND", detail: `No existe una dependencia con código ${codigo}` }
      ]);
    }
    return successResponse(res, dependencia, 200);
  } catch (error) {
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Dependencia no encontrada", 404, [
        { code: "DEPENDENCIA_NOT_FOUND", detail: `No existe una dependencia con código ${req.params.codigo}` }
      ]);
    }
    return errorResponse(res, "Error al actualizar la dependencia", 500, [
      { code: "UPDATE_DEPENDENCIA_ERROR", detail: error.message }
    ]);
  }
};

export const changeEstadoDependencia = async (req, res) => {
  try {
    const { codigo } = req.params;
    const { estado } = req.body;
    // Busca y actualiza solo el campo estado
    const dependencia = await showDependenciaService(codigo);
    if (!dependencia) {
      return errorResponse(res, "Dependencia no encontrada", 404, [
        { code: "DEPENDENCIA_NOT_FOUND", detail: `No existe una dependencia con código ${codigo}` }
      ]);
    }
    dependencia.estado = estado;
    await dependencia.save();
    return successResponse(res, dependencia, 200);
  } catch (error) {
    return errorResponse(res, "Error al cambiar el estado", 500, [
      { code: "CHANGE_ESTADO_ERROR", detail: error.message }
    ]);
  }
};

export const getDependenciasByCentro = async (req, res) => {
  try {
    const { centroId } = req.params;
    const dependencias = await getDependenciasByCentroService(centroId);
    return successResponse(res, dependencias, 200);
  } catch (error) {
    return errorResponse(res, "Error al obtener dependencias por centro", 500, [
      { code: "GET_DEPENDENCIAS_BY_CENTRO_ERROR", detail: error.message }
    ]);
  }
};