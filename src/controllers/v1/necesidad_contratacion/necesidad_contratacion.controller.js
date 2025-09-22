import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  getnecesidad_contratacionService,
  getListnecesidad_contratacionService,
  storenecesidad_contratacionService,
  shownecesidad_contratacionService,
  updatenecesidad_contratacionService,
  changenecesidad_contratacionStatusService
} from "../../../services/v1/necesidad_contratacion.service.js";

/**
 * Controlador para obtener cargos con filtros, orden y paginación usando servicios.
 */
export const getnecesidad_contratacion = async (req, res) => {
  try {
    const {
      data,
      meta,
      links
    } = await getnecesidad_contratacionService(req);

    return successResponse(
      res,
      data,
      200,
      meta,
      links
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la necesidad de contratacion", 500, [
      {
        code: "GET_NECESIDAD_CONTRATACION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const getListnecesidad_contratacion = async (req, res) => {
  try {
    let { estado, sortBy = "id", order = "ASC" } = req.query;
    if (estado !== undefined) {
      if (estado === "true") estado = true;
      else if (estado === "false") estado = false;
      else estado = undefined;
    }

    const { data, count } = await getListnecesidad_contratacionService(estado, sortBy, order);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "nombre", "estado"]),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de necesidad de contratacion", 500, [
      {
        code: "GET_LIST_NECESIDAD_CONTRATACION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const storenecesidad_contratacion = async (req, res) => {
  try {
    const { nombre, estado } = req.body;

    const necesidad_contratacion = await storenecesidad_contratacionService({ nombre, estado });

    return successResponse(
      res,
      {
        id: necesidad_contratacion.id,
        nombre: necesidad_contratacion.nombre,
        estado: necesidad_contratacion.estado
      },
      201
    );
  } catch (error) {

    // Otros errores
    return errorResponse(res, "Error al crear la necesidad de contratacion", 500, [
      { code: "CREATE_NECESIDAD_CONTRATACION_ERROR", detail: error.message }
    ]);
  }
};

export const shownecesidad_contratacion = async (req, res) => {
  try {
    const necesidad_contratacion = await shownecesidad_contratacionService(req.params.id);

    if (!necesidad_contratacion) {
      return errorResponse(res, "No existe una necesidad de contratacion con el ID", 404, [
        {
          code: "NECESIDAD_CONTRATACION_NOT_FOUND",
          detail: `No existe una necesidad de contratacion con ID ${req.params.id}`,
        },
      ]);
    }

    return successResponse(
      res,
      {
        id: necesidad_contratacion.id,
        nombre: necesidad_contratacion.nombre,
        estado: necesidad_contratacion.estado
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la necesidad de contratacion", 500, [
      {
        code: "SHOW_NECESIDAD_CONTRATACION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const updatenecesidad_contratacion = async (req, res) => {
  try {
    const necesidad_contratacion = await updatenecesidad_contratacionService(req.params.id, req.body);

    return successResponse(
      res,
      {
        id: necesidad_contratacion.id,
        nombre: necesidad_contratacion.nombre,
        estado: necesidad_contratacion.estado
      },
      200
    );
  } catch (error) {
    console.error("Error al actualizar la necesidad de contratacion:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "necesidad de contratacion no encontrada", 404, [
        {
          code: "TIPO_MINUTA_NOT_FOUND",
          detail: `No existe una necesidad de contratacion con ID ${req.params.id}`,
        },
      ]);
    }

    if (error.code === "DUPLICATE_NECESIDAD_CONTRATACION_NAME") {
      return errorResponse(res, "El nombre ya está en uso", 409, [
        {
          code: error.code,
          detail: error.message,
          field: "nombre"
        },
      ]);
    }

    return errorResponse(res, "Error al actualizar la necesidad de contratacion", 500, [
      {
        code: "UPDATE_NECESIDAD_CONTRATACION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const changenecesidad_contratacionStatus = async (req, res) => {
  try {
    const necesidad_contratacion = await changenecesidad_contratacionStatusService(req.params.id, req.body.estado);

    return successResponse(
      res,
      {
        id: necesidad_contratacion.id,
        nombre: necesidad_contratacion.nombre,
        estado: necesidad_contratacion.estado,
      },
      200
    );
  } catch (error) {
    console.error("Error al cambiar estado:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "necesidad de contratacion no encontrado", 404, [
        {
          code: "NECESIDAD_CONTRATACION_NOT_FOUND",
          detail: error.message,
        },
      ]);
    }

    if (error.code === "NECESIDAD_CONTRATACION_HAS_AUTORIZACIONES") {
      return errorResponse(res, "No se puede desactivar", 409, [
        {
          code: "NECESIDAD_CONTRATACION_HAS_AUTORIZACIONES",
          detail: error.message,
        },
      ]);
    }

    return errorResponse(res, "Error al cambiar el estado de la necesidad de contratacion", 500, [
      {
        code: "CHANGE_NECESIDAD_CONTRATACION_STATUS_ERROR",
        detail: error.message,
      },
    ]);
  }
};