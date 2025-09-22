import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  getResolucionesService,
  getListResolucionesService,
  storeResolucionService,
  showResolucionByIdService,
  updateResolucionByIdService,
  deleteResolucionByIdService
} from "../../../services/v1/resolucion.service.js";

/**
 * Controlador para obtener resoluciones con filtros, orden y paginación usando servicios.
 */
export const getResoluciones = async (req, res) => {
  try {
    const {
      data,
      meta,
      links
    } = await getResolucionesService(req);

    // Retornar los datos completos incluyendo las relaciones
    return successResponse(
      res,
      data, // Retornar los datos tal como vienen del servicio
      200,
      meta,
      links
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener las resoluciones", 500, [
      {
        code: "GET_RESOLUCIONES_ERROR",
        detail: error.message,
      },
    ]);
  }
};

/**
 * Controlador para obtener la lista de resoluciones.
 */
export const getListResoluciones = async (req, res) => {
  try {
    let { sortBy = "id", order = "ASC" } = req.query;

    const { data, count } = await getListResolucionesService(sortBy, order);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "fecha", "acta_posesion", "fecha_posesion", "fecha_ingreso", "fecha_retiro", "es_encargado", "centro", "ordenador"]),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de resoluciones", 500, [
      {
        code: "GET_LIST_RESOLUCIONES_ERROR",
        detail: error.message,
      },
    ]);
  }
};

/**
 * Controlador para crear una nueva resolución.
 */
export const storeResolucion = async (req, res) => {
  try {
    const resolucion = await storeResolucionService(req.body);

    return successResponse(
      res,
      {
        id: resolucion.id,
        fecha: resolucion.fecha,
        acta_posesion: resolucion.acta_posesion,
        fecha_posesion: resolucion.fecha_posesion,
        fecha_ingreso: resolucion.fecha_ingreso,
        fecha_retiro: resolucion.fecha_retiro,
        es_encargado: resolucion.es_encargado,
        centro_id: resolucion.centro_id,
        ordenadores_id: resolucion.ordenadores_id,
      },
      201
    );
  } catch (error) {
    console.error("Error al crear la resolución:", error);

    return errorResponse(res, "Error al crear la resolución", 500, [
      {
        code: "CREATE_RESOLUCION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

/**
 * Controlador para mostrar una resolución por ID.
 */
export const showResolucionById = async (req, res) => {
  try {
    const resolucion = await showResolucionByIdService(req.params.id);

    if (!resolucion) {
      return errorResponse(res, "No existe una resolución con el ID", 404, [
        {
          code: "RESOLUCION_NOT_FOUND",
          detail: `No existe una resolución con ID ${req.params.id}`,
        },
      ]);
    }

    return successResponse(
      res,
      {
        id: resolucion.id,
        fecha: resolucion.fecha,
        acta_posesion: resolucion.acta_posesion,
        fecha_posesion: resolucion.fecha_posesion,
        fecha_ingreso: resolucion.fecha_ingreso,
        fecha_retiro: resolucion.fecha_retiro,
        es_encargado: resolucion.es_encargado,
        centro: resolucion.centro,
        ordenador: resolucion.ordenador,
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la resolución", 500, [
      {
        code: "SHOW_RESOLUCION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

/**
 * Controlador para actualizar una resolución.
 */
export const updateResolucionById = async (req, res) => {
  try {
    const resolucion = await updateResolucionByIdService(req.params.id, req.body);

    return successResponse(
      res,
      {
        id: resolucion.id,
        fecha: resolucion.fecha,
        acta_posesion: resolucion.acta_posesion,
        fecha_posesion: resolucion.fecha_posesion,
        fecha_ingreso: resolucion.fecha_ingreso,
        fecha_retiro: resolucion.fecha_retiro,
        es_encargado: resolucion.es_encargado,
        centro: resolucion.centro,
        ordenador: resolucion.ordenador,
      },
      200
    );
  } catch (error) {
    console.error("Error al actualizar la resolución:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "No existe una resolución con el ID", 404, [
        {
          code: "RESOLUCION_NOT_FOUND",
          detail: `No existe una resolución con ID ${req.params.id}`,
        },
      ]);
    }

    return errorResponse(res, "Error al actualizar la resolución", 500, [
      {
        code: "UPDATE_RESOLUCION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

/**
 * Controlador para eliminar una resolución.
 */
export const deleteResolucionById = async (req, res) => {
  try {
    const resolucion = await deleteResolucionByIdService(req.params.id);

    return successResponse(
      res,
      {
        id: resolucion.id,
        mensaje: "Resolución eliminada exitosamente",
      },
      200
    );
  } catch (error) {
    console.error("Error al eliminar la resolución:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "No existe una resolución con el ID", 404, [
        {
          code: "RESOLUCION_NOT_FOUND",
          detail: `No existe una resolución con ID ${req.params.id}`,
        },
      ]);
    }

    return errorResponse(res, "Error al eliminar la resolución", 500, [
      {
        code: "DELETE_RESOLUCION_ERROR",
        detail: error.message,
      },
    ]);
  }
};
