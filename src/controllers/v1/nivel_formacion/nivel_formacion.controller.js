import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  getnivel_formacionService,
  getListnivel_formacionService,
  storenivel_formacionService,
  shownivel_formacionService,
  updatenivel_formacionService,
  changenivel_formacionStatusService
} from "../../../services/v1/nivel_formacion.service.js";

/**
 * Controlador para obtener niveles de formacion con filtros, orden y paginación usando servicios.
 */
export const getnivel_formacion = async (req, res) => {
  try {
    const {
      data,
      meta,
      links
    } = await getnivel_formacionService(req);

    return successResponse(
      res,
      data,
      200,
      meta,
      links
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener los niveles de formacion", 500, [
      {
        code: "GET_NIVEL_FORMACION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const getListnivel_formacion = async (req, res) => {
  try {
    // Ya no necesitas extraer los parámetros aquí.
    // El servicio los extrae de req.query
    const { data, count, meta, links, isPaginated } = await getnivel_formacionService(req);

    return successResponse(
      res,
      // `data` ya está formateada y lista para ser usada
      data,
      200,
      { count, meta, links, isPaginated }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de niveles de formacion", 500, [
      {
        code: "GET_LIST_NIVEL_FORMACION_ERROR",
        detail: error.message,
      },
    ]);
  }
};
export const storenivel_formacion = async (req, res) => {
  try {
    const { nombre, estado } = req.body;

    const nivel_formacion = await storenivel_formacionService({ nombre, estado });

    return successResponse(
      res,
      {
        id: nivel_formacion.id,
        nombre: nivel_formacion.nombre,
        estado: nivel_formacion.estado
      },
      201
    );
  } catch (error) {

    // Otros errores
    return errorResponse(res, "Error al crear el tipo de nivel de formacion", 500, [
      { code: "CREATE_NIVEL_FORMACION_ERROR", detail: error.message }
    ]);
  }
};

export const shownivel_formacion = async (req, res) => {
  try {
    const nivel_formacion = await shownivel_formacionService(req.params.id);

    if (!nivel_formacion) {
      return errorResponse(res, "No existe un nivel de formacion con el ID", 404, [
        {
          code: "NIVEL_FORMACION_NOT_FOUND",
          detail: `No existe un nivel de formacion con ID ${req.params.id}`,
        },
      ]);
    }

    return successResponse(
      res,
      {
        id: nivel_formacion.id,
        nombre: nivel_formacion.nombre,
        estado: nivel_formacion.estado
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener el nivel de formacion", 500, [
      {
        code: "SHOW_NIVEL_FORMACION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const updatenivel_formacion = async (req, res) => {
  try {
    const nivel_formacion = await updatenivel_formacionService(req.params.id, req.body);

    return successResponse(
      res,
      {
        id: nivel_formacion.id,
        nombre: nivel_formacion.nombre,
        estado: nivel_formacion.estado,
      },
      200
    );
  } catch (error) {

    console.error("Error al actualizar la nivel_formacion:", error);

    // Manejar errores específicos
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "nivelupdatenivel formacion no encontrada", 404, [
        {
          code: "NIVEL_FORMACION_NOT_FOUND",
          detail: `No existe una nivel formacion con ese codigo ${req.params.id}`,
        },
      ]);
    }

    if (error.code === "VALIDATION_ERROR" || error.code === "DUPLICATE_VALUE") {
      return errorResponse(res, error.message, 400, [
        {
          code: error.code,
          field: error.field,
          detail: error.message,
        },
      ]);
    }

    if (error.code === "SYSTEM_NIVEL_FORMACION_UPDATE_FORBIDDEN") {
      return errorResponse(res, "No permitido", 403, [
        {
          code: error.code,
          detail: error.message,
        },
      ]);
    }

    return errorResponse(res, "Error al actualizar la nivel_formacion", 500, [
      {
        code: "UPDATE_NIVEL_FORMACION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const changenivel_formacionStatus = async (req, res) => {
  try {
    const nivel_formacion = await changenivel_formacionStatusService(req.params.id, req.body.estado);

    return successResponse(
      res,
      {
        id: nivel_formacion.id,
        nombre: nivel_formacion.nombre,
        estado: nivel_formacion.estado,
      },
      200
    );
  } catch (error) {
    console.error("Error al cambiar estado:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "nivel de formacion no encontrado", 404, [
        {
          code: "NIVEL_FORMACION_NOT_FOUND",
          detail: error.message,
        },
      ]);
    }

    if (error.code === "NIVEL_FORMACION_HAS_AUTORIZACIONES") {
      return errorResponse(res, "No se puede desactivar", 409, [
        {
          code: "NIVEL_FORMACION_HAS_AUTORIZACIONES",
          detail: error.message,
        },
      ]);
    }

    return errorResponse(res, "Error al cambiar el estado del nivel de formacion", 500, [
      {
        code: "CHANGE_NIVEL_FORMACION_STATUS_ERROR",
        detail: error.message,
      },
    ]);
  }
};