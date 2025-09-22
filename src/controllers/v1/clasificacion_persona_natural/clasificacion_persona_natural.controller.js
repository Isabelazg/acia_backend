import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  getclasificacion_persona_naturalService,
  getListclasificacion_persona_naturalService,
  storeclasificacion_persona_naturalService,
  showclasificacion_persona_naturalService,
  updateclasificacion_persona_naturalService,
  changeclasificacion_persona_naturalStatusService
} from "../../../services/v1/clasificacion_persona_natural.service.js";

/**
 * Controlador para obtener cargos con filtros, orden y paginación usando servicios.
 */
export const getclasificacion_persona_natural = async (req, res) => {
  try {
    const {
      data,
      meta,
      links
    } = await getclasificacion_persona_naturalService(req);

    return successResponse(
      res,
      data,
      200,
      meta,
      links
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener las clasificaciones de persona narural", 500, [
      {
        code: "GET_CLASIFICACION_PERSONA_NATURAL_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const getListclasificacion_persona_natural = async (req, res) => {
  try {
    let { estado, sortBy = "id", order = "ASC" } = req.query;
    if (estado !== undefined) {
      if (estado === "true") estado = true;
      else if (estado === "false") estado = false;
      else estado = undefined;
    }

    const { data, count } = await getListclasificacion_persona_naturalService(estado, sortBy, order);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "nombres", "estado"]),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de clasificacion de persona natural", 500, [
      {
        code: "GET_LIST_CLASIFICACION_PERSONA_NATURAL_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const storeclasificacion_persona_natural = async (req, res) => {
  try {
    const { nombres, estado } = req.body;

    const clasificacion_persona_natural = await storeclasificacion_persona_naturalService({ nombres, estado });

    return successResponse(
      res,
      {
        id: clasificacion_persona_natural.id,
        nombres: clasificacion_persona_natural.nombres,
        estado: clasificacion_persona_natural.estado
      },
      201
    );
  } catch (error) {

    // Otros errores
    return errorResponse(res, "Error al crear la clasificacion de persona natural", 500, [
      { code: "CREATE_CLASIFICACION_PERSONA_NATURAL_ERROR", detail: error.message }
    ]);
  }
};

export const showclasificacion_persona_natural = async (req, res) => {
  try {
    const clasificacion_persona_natural = await showclasificacion_persona_naturalService(req.params.id);

    if (!clasificacion_persona_natural) {
      return errorResponse(res, "No existe una clasificacion de persona natural con el ID", 404, [
        {
          code: "CLASIFICACION_PERSONA_NATURAL_NOT_FOUND",
          detail: `No existe un tipo minuta con ID ${req.params.id}`,
        },
      ]);
    }

    return successResponse(
      res,
      {
        id: clasificacion_persona_natural.id,
        nombres: clasificacion_persona_natural.nombres,
        estado: clasificacion_persona_natural.estado
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la clasificacion de persona natural", 500, [
      {
        code: "SHOW_CLASIFICACION_PERSONA_NATURAL_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const updateclasificacion_persona_natural = async (req, res) => {
  try {
    const clasificacion_persona_natural = await updateclasificacion_persona_naturalService(req.params.id, req.body);

    return successResponse(
      res,
      {
        id: clasificacion_persona_natural.id,
        nombres: clasificacion_persona_natural.nombres,
        estado: clasificacion_persona_natural.estado
      },
      200
    );
  } catch (error) {
    console.error("Error al actualizar la clasificacion de persona natural:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "clasificaion de persona natural no encontrado", 404, [
        {
          code: "CLASIFICACION_PERSONA_NATURAL_NOT_FOUND",
          detail: `No existe una clasificacion de persona natural con ID ${req.params.id}`,
        },
      ]);
    }

    if (error.code === "DUPLICATE_CLASIFICACION_PERSONA_NATURAL_NAME") {
      return errorResponse(res, "El nombre ya está en uso", 409, [
        {
          code: error.code,
          detail: error.message,
          field: "nombre"
        },
      ]);
    }

    return errorResponse(res, "Error al actualizar la clasificacion de persona natural", 500, [
      {
        code: "UPDATE_CLASIFICACION_PERSONA_NATURAL_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const changeclasificacion_persona_naturalStatus = async (req, res) => {
  try {
    const clasificacion_persona_natural = await changeclasificacion_persona_naturalStatusService(req.params.id, req.body.estado);

    return successResponse(
      res,
      {
        id: clasificacion_persona_natural.id,
        nombres: clasificacion_persona_natural.nombres,
        estado: clasificacion_persona_natural.estado,
      },
      200
    );
  } catch (error) {
    console.error("Error al cambiar estado:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "clasificacion de persona natural no encontrado", 404, [
        {
          code: "CLASIFICACION_PERSONA_NATURAL_NOT_FOUND",
          detail: error.message,
        },
      ]);
    }

    if (error.code === "CLASIFICACION_PERSONA_NATURAL_HAS_AUTORIZACIONES") {
      return errorResponse(res, "No se puede desactivar", 409, [
        {
          code: "CLASIFICACION_PERSONA_NATURAL_HAS_AUTORIZACIONES",
          detail: error.message,
        },
      ]);
    }

    return errorResponse(res, "Error al cambiar el estado de clasificacion de persona natural", 500, [
      {
        code: "CHANGE_CLASIFICACION_PERSONA_NATURAL_STATUS_ERROR",
        detail: error.message,
      },
    ]);
  }
};