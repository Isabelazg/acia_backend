import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  getestado_formacionesService,
  getListestado_formacionesService,
  storeestado_formacionesService,
  showestado_formacionesService,
  updateestado_formacionesService,
  changeestado_formacionesStatusService
} from "../../../services/v1/estado_formaciones.service.js";

/**
 * Controlador para obtener el estado de formaciones con filtros, orden y paginación usando servicios.
 */
export const getestado_formaciones = async (req, res) => {
  try {
    const {
      data,
      meta,
      links
    } = await getestado_formacionesService(req);

    return successResponse(
      res,
      data,
      200,
      meta,
      links
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener los estados de formaciones", 500, [
      {
        code: "GET_ESTADO_FORMACIONES_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const getListestado_formaciones = async (req, res) => {
  try {
    let { estado, sortBy = "id", order = "ASC" } = req.query;
    if (estado !== undefined) {
      if (estado === "true") estado = true;
      else if (estado === "false") estado = false;
      else estado = undefined;
    }

    const { data, count } = await getListestado_formacionesService(estado, sortBy, order);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "nombre", "estado"]),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de estados de formaciones", 500, [
      {
        code: "GET_LIST_ESTADO_FORMACIONES_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const storeestado_formaciones = async (req, res) => {
  try {
    const { nombre, estado } = req.body;

    const estado_formaciones = await storeestado_formacionesService({ nombre, estado });

    return successResponse(
      res,
      {
        id: estado_formaciones.id,
        nombre: estado_formaciones.nombre,
        estado: estado_formaciones.estado
      },
      201
    );
  } catch (error) {

    // Otros errores
    return errorResponse(res, "Error al crear el estado de formacion", 500, [
      { code: "CREATE_ESTADO_FORMACIONES_ERROR", detail: error.message }
    ]);
  }
};

export const showestado_formaciones = async (req, res) => {
  try {
    const estado_formaciones = await showestado_formacionesService(req.params.id);

    if (!estado_formaciones) {
      return errorResponse(res, "No existe un estado de formacion con el ID", 404, [
        {
          code: "ESTADO_FORMACIONES_NOT_FOUND",
          detail: `No existe un estado de formacion con ID ${req.params.id}`,
        },
      ]);
    }

    return successResponse(
      res,
      {
        id: estado_formaciones.id,
        nombre: estado_formaciones.nombre,
        estado: estado_formaciones.estado
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener el estado de formacion", 500, [
      {
        code: "SHOW_ESTADO_FORMACIONES_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const updateestado_formaciones = async (req, res) => {
  try {
    const estado_formaciones = await updateestado_formacionesService(req.params.id, req.body);

    return successResponse(
      res,
      {
        id: estado_formaciones.id,
        nombre: estado_formaciones.nombre,
        estado: estado_formaciones.estado
      },
      200
    );
  } catch (error) {
    console.error("Error al actualizar el estado de formacion:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "estado de formacion no encontrado", 404, [
        {
          code: "ESTADO_FORMACIONES_NOT_FOUND",
          detail: `No existe un estado de formacion con ID ${req.params.id}`,
        },
      ]);
    }

    if (error.code === "DUPLICATE_ESTADO_FORMACIONES_NAME") {
      return errorResponse(res, "El nombre ya está en uso", 409, [
        {
          code: error.code,
          detail: error.message,
          field: "nombre"
        },
      ]);
    }

    return errorResponse(res, "Error al actualizar el estado de formacion", 500, [
      {
        code: "UPDATE_ESTADO_FORMACIONES_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const changeestado_formacionesStatus = async (req, res) => {
  try {
    const estado_formaciones = await changeestado_formacionesStatusService(req.params.id, req.body.estado);

    return successResponse(
      res,
      {
        id: estado_formaciones.id,
        nombre: estado_formaciones.nombre,
        estado: estado_formaciones.estado,
      },
      200
    );
  } catch (error) {
    console.error("Error al cambiar estado:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "estado de formacion no encontrado", 404, [
        {
          code: "ESTADO_FORMACIONES_NOT_FOUND",
          detail: error.message,
        },
      ]);
    }

    if (error.code === "ESTADO_FORMACIONES_HAS_AUTORIZACIONES") {
      return errorResponse(res, "No se puede desactivar", 409, [
        {
          code: "ESTADO_FORMACIONES_HAS_AUTORIZACIONES",
          detail: error.message,
        },
      ]);
    }

    return errorResponse(res, "Error al cambiar el estado de formacion", 500, [
      {
        code: "CHANGE_ESTADO_FORMACIONES_STATUS_ERROR",
        detail: error.message,
      },
    ]);
  }
};