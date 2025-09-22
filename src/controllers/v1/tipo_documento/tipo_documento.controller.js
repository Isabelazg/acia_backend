import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  gettipo_documentoService,
  getListtipo_documentoService,
  storetipo_documentoService,
  showtipo_documentoService,
  updatetipo_documentoService,
  changetipo_documentoStatusService
} from "../../../services/v1/tipo_documento.service.js";

/**
 * Controlador para obtener cargos con filtros, orden y paginación usando servicios.
 */
export const gettipo_documento = async (req, res) => {
  try {
    const {
      data,
      meta,
      links
    } = await gettipo_documentoService(req);

    return successResponse(
      res,
      data,
      200,
      meta,
      links
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener el tipo de documento", 500, [
      {
        code: "GET_TIPO_DOCUMENTO_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const getListtipo_documento = async (req, res) => {
  try {
    let { estado, sortBy = "id", order = "ASC" } = req.query;
    if (estado !== undefined) {
      if (estado === "true") estado = true;
      else if (estado === "false") estado = false;
      else estado = undefined;
    }

    const { data, count } = await getListtipo_documentoService(estado, sortBy, order);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "nombre", "estado"]),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de tipo de documento", 500, [
      {
        code: "GET_LIST_TIPO_DOCUMENTO_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const storetipo_documento = async (req, res) => {
  try {
    const { nombre, estado } = req.body;

    const tipo_documento = await storetipo_documentoService({ nombre, estado });

    return successResponse(
      res,
      {
        id: tipo_documento.id,
        nombre: tipo_documento.nombre,
        estado: tipo_documento.estado
      },
      201
    );
  } catch (error) {

    // Otros errores
    return errorResponse(res, "Error al crear el tipo de documento", 500, [
      { code: "CREATE_TIPO_DOCUMENTO_ERROR", detail: error.message }
    ]);
  }
};

export const showtipo_documento = async (req, res) => {
  try {
    const tipo_documento = await showtipo_documentoService(req.params.id);

    if (!tipo_documento) {
      return errorResponse(res, "No existe una tipo de documento con el ID", 404, [
        {
          code: "TIPO_DOCUMENTO_NOT_FOUND",
          detail: `No existe una tipo de documento con ID ${req.params.id}`,
        },
      ]);
    }

    return successResponse(
      res,
      {
        id: tipo_documento.id,
        nombre: tipo_documento.nombre,
        estado: tipo_documento.estado
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la tipo de documento", 500, [
      {
        code: "SHOW_TIPO_DOCUMENTO_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const updatetipo_documento = async (req, res) => {
  try {
    const tipo_documento = await updatetipo_documentoService(req.params.id, req.body);

    return successResponse(
      res,
      {
        id: tipo_documento.id,
        nombre: tipo_documento.nombre,
        estado: tipo_documento.estado
      },
      200
    );
  } catch (error) {
    console.error("Error al actualizar la tipo de documento:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "tipo de documento no encontrada", 404, [
        {
          code: "TIPO_DOCUMENTO_NOT_FOUND",
          detail: `No existe una tipo de documento con ID ${req.params.id}`,
        },
      ]);
    }

    if (error.code === "DUPLICATE_TIPO_DOCUMENTO_NAME") {
      return errorResponse(res, "El nombre ya está en uso", 409, [
        {
          code: error.code,
          detail: error.message,
          field: "nombre"
        },
      ]);
    }

    return errorResponse(res, "Error al actualizar la tipo de documento", 500, [
      {
        code: "UPDATE_TIPO_DOCUMENTO_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const changetipo_documentoStatus = async (req, res) => {
  try {
    const tipo_documento = await changetipo_documentoStatusService(req.params.id, req.body.estado);

    return successResponse(
      res,
      {
        id: tipo_documento.id,
        nombre: tipo_documento.nombre,
        estado: tipo_documento.estado,
      },
      200
    );
  } catch (error) {
    console.error("Error al cambiar estado:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "tipo de documento no encontrado", 404, [
        {
          code: "TIPO_DOCUMENTO_NOT_FOUND",
          detail: error.message,
        },
      ]);
    }

    if (error.code === "TIPO_DOCUMENTO_HAS_AUTORIZACIONES") {
      return errorResponse(res, "No se puede desactivar", 409, [
        {
          code: "TIPO_DOCUMENTO_HAS_AUTORIZACIONES",
          detail: error.message,
        },
      ]);
    }

    return errorResponse(res, "Error al cambiar el estado del tipo de documento", 500, [
      {
        code: "CHANGE_TIPO_DOCUMENTO_STATUS_ERROR",
        detail: error.message,
      },
    ]);
  }
};