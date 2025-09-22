import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  getCoordinadoresService,
  getListCoordinadoresService,
  storeCoordinadorService,
  showCoordinadorService,
  updateCoordinadorService,
  changeCoordinadorStatusService
} from "../../../services/v1/coordinador.service.js";

/**
 * Controlador para obtener coordinadores con filtros, orden y paginación usando servicios.
 */
export const getCoordinadores = async (req, res) => {
  try {
    const {
      data,
      meta,
      links
    } = await getCoordinadoresService(req);


    return successResponse(
      res,
      data,
      200,
      meta,
      links
    );
  } catch (error) {
    // Log completo para facilitar debugging de errores 500
    console.error('Error en getCoordinadores:', error);
    return errorResponse(res, "Error al obtener los coordinadores", 500, [
      {
        code: "GET_COORDINADORES_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const getListCoordinadores = async (req, res) => {
  try {
    const { sortBy = "id", order = "ASC" } = req.query;
    const { data, count } = await getListCoordinadoresService(undefined, sortBy, order);
    return successResponse(
      res,
      formatJsonApiData(data, ["id", "nombre", "descripcion", "centros_id"]),
      200,
      { count }
    );
  } catch (error) {
    // Log completo para facilitar debugging de errores 500
    console.error('Error en getListCoordinadores:', error);
    return errorResponse(res, "Error al obtener la lista de coordinadores", 500, [
      { code: "GET_LIST_COORDINADORES_ERROR", detail: error.message },
    ]);
  }
};

export const storeCoordinador = async (req, res) => {
  try {
    const coordinador = await storeCoordinadorService(req.body);
    return successResponse(
      res,
      {
        id: coordinador.id,
        nombre: coordinador.nombre,
        descripcion: coordinador.descripcion,
        centros_id: coordinador.centros_id,
      },
      201
    );
  } catch (error) {
    if (error.code === "VALIDATION_ERROR" || error.code === "DUPLICATE_VALUE") {
      return errorResponse(res, error.message, 400, [
        {
          code: error.code,
          field: error.field,
          detail: error.message,
        },
      ]);
    }
    return errorResponse(res, "Error al crear el coordinador", 500, [
      { code: "CREATE_COORDINADOR_ERROR", detail: error.message },
    ]);
  }
};

export const showCoordinador = async (req, res) => {
  try {
    const coordinador = await showCoordinadorService(req.params.id);
    if (!coordinador) {
      return errorResponse(res, "No existe un coordinador con el id", 404, [
        {
          code: "COORDINADOR_NOT_FOUND",
          detail: `No existe un coordinador con id ${req.params.id}`,
        },
      ]);
    }
    return successResponse(
      res,
      {
        id: coordinador.id,
        nombre: coordinador.nombre,
        descripcion: coordinador.descripcion,
        centros_id: coordinador.centros_id,
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener el coordinador", 500, [
      { code: "SHOW_COORDINADOR_ERROR", detail: error.message },
    ]);
  }
};

export const updateCoordinador = async (req, res) => {
  try {
    const coordinador = await updateCoordinadorService(req.params.id, req.body);
    return successResponse(
      res,
      {
        id: coordinador.id,
        nombre: coordinador.nombre,
        descripcion: coordinador.descripcion,
        centros_id: coordinador.centros_id,
      },
      200
    );
  } catch (error) {
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Coordinador no encontrado", 404, [
        {
          code: "COORDINADOR_NOT_FOUND",
          detail: `No existe un coordinador con ese id ${req.params.id}`,
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
    return errorResponse(res, "Error al actualizar el coordinador", 500, [
      { code: "UPDATE_COORDINADOR_ERROR", detail: error.message },
    ]);
  }
};

export const changeCoordinadorStatus = async (req, res) => {
  try {
    const coordinador = await changeCoordinadorStatusService(req.params.id, req.body.estado);
    if (!coordinador) {
      return errorResponse(res, "Coordinador no encontrado", 404, [
        {
          code: "COORDINADOR_NOT_FOUND",
          detail: `No existe un coordinador con ese id ${req.params.id}`,
        },
      ]);
    }
    return successResponse(
      res,
      {
        id: coordinador.id,
        documento: coordinador.documento,
        nombres: coordinador.nombres,
        apellidos: coordinador.apellidos,
        correo: coordinador.correo,
        telefono: coordinador.telefono,
        estado: coordinador.estado,
        centros_id: coordinador.centros_id,
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al cambiar el estado del coordinador", 500, [
      { code: "CHANGE_COORDINADOR_STATUS_ERROR", detail: error.message },
    ]);
  }
};
