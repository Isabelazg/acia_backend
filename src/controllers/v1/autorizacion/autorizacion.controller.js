import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  getAutorizacionesService,
  getListAutorizacionesService,
  storeAutorizacionService,
  showAutorizacionService,
  updateAutorizacionService,
  deleteAutorizacionService
} from "../../../services/v1/autorizacion.service.js";

/**
 * Controlador para obtener autorizaciones con filtros, orden y paginación usando servicios.
 */
export const getAutorizaciones = async (req, res) => {
  try {
    const {
      data,
      meta,
      links
    } = await getAutorizacionesService(req);

    // Retornar los datos completos incluyendo las relaciones
    return successResponse(
      res,
      data, // Retornar los datos tal como vienen del servicio
      200,
      meta,
      links
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener las autorizaciones", 500, [
      {
        code: "GET_AUTORIZACIONES_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const getListAutorizaciones = async (req, res) => {
  try {
    let { centro_id, ordenador_id, sortBy = "id", order = "ASC" } = req.query;

    if (centro_id !== undefined) {
      centro_id = parseInt(centro_id);
    }

    if (ordenador_id !== undefined) {
      ordenador_id = parseInt(ordenador_id);
    }

    const { data, count } = await getListAutorizacionesService(centro_id, ordenador_id, sortBy, order);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "numero_autorizacion", "numero_linea_PAA", "fecha", "objeto", "fecha_inicio", "fecha_terminacion"]),
      200,
      { count }
    ); // No hay campos de minuta
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de autorizaciones", 500, [
      {
        code: "GET_LIST_AUTORIZACIONES_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const storeAutorizacion = async (req, res) => {
  try {
    const autorizacion = await storeAutorizacionService(req.body);

    // Devolver la autorización completa (incluyendo relaciones como 'obligaciones')
    return successResponse(
      res,
      autorizacion,
      201
    );
  } catch (error) {
    // Manejar errores de validación específicos
    if (error.code === "VALIDATION_ERROR" || error.code === "DUPLICATE_VALUE") {
      return errorResponse(res, error.message, 400, [
        {
          code: error.code === "DUPLICATE_VALUE" ? "DUPLICATE_VALUE" : error.code,
          field: error.field,
          detail: error.message,
        },
      ]);
    }

    return errorResponse(res, "Error al crear la autorización", 500, [
      {
        code: "CREATE_AUTORIZACION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const showAutorizacion = async (req, res) => {
  try {
    const autorizacion = await showAutorizacionService(req.params.numero);

    if (!autorizacion) {
      return errorResponse(res, "No existe una autorización con ese número", 404, [
        {
          code: "AUTORIZACION_NOT_FOUND",
          detail: `No existe una autorización con número ${req.params.numero}`,
        },
      ]);
    }

    return successResponse(
      res,
      autorizacion,
      200
    ); // No hay campos de minuta
  } catch (error) {
    return errorResponse(res, "Error al obtener la autorización", 500, [
      {
        code: "SHOW_AUTORIZACION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const updateAutorizacion = async (req, res) => {
  try {
    const autorizacion = await updateAutorizacionService(req.params.numero, req.body);

    return successResponse(
      res,
      autorizacion,
      200
    ); // No hay campos de minuta
  } catch (error) {
    console.error("Error al actualizar la autorización:", error);

    // Manejar errores específicos
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Autorización no encontrada", 404, [
        {
          code: "AUTORIZACION_NOT_FOUND",
          detail: `No existe una autorización con ese número ${req.params.numero}`,
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

    return errorResponse(res, "Error al actualizar la autorización", 500, [
      {
        code: "UPDATE_AUTORIZACION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const deleteAutorizacion = async (req, res) => {
  try {
    const autorizacion = await deleteAutorizacionService(req.params.numero);

    return successResponse(
      res,
      {
        message: "Autorización eliminada exitosamente",
        id: autorizacion.id,
        numero_autorizacion: autorizacion.numero_autorizacion,
      },
      200
    ); // No hay campos de minuta
  } catch (error) {
    console.error("Error al eliminar la autorización:", error);

    // Manejar errores específicos
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Autorización no encontrada", 404, [
        {
          code: "AUTORIZACION_NOT_FOUND",
          detail: `No existe una autorización con ese número ${req.params.numero}`,
        },
      ]);
    }

    return errorResponse(res, "Error al eliminar la autorización", 500, [
      {
        code: "DELETE_AUTORIZACION_ERROR",
        detail: error.message,
      },
    ]);
  }
};
