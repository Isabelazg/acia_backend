import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  getRegionalsService,
  getListRegionalsService,
  storeRegionalService,
  showRegionalService,
  updateRegionalService,
  changeRegionalStatusService
} from "../../../services/v1/regional.service.js";

/**
 * Controlador para obtener regionales con filtros, orden y paginación usando servicios.
 */
export const getRegionales = async (req, res) => {
  try {
    const {
      data,
      meta,
      links
    } = await getRegionalsService(req);

    // Retornar los datos completos incluyendo las relaciones
    return successResponse(
      res,
      data, // Retornar los datos tal como vienen del servicio
      200,
      meta,
      links
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener las regionales", 500, [
      {
        code: "GET_REGIONALS_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const getListRegionals = async (req, res) => {
  try {
    let { estado, sortBy = "id", order = "ASC" } = req.query;
    if (estado !== undefined) {
      if (estado === "true") estado = true;
      else if (estado === "false") estado = false;
      else estado = undefined;
    }

    const { data, count } = await getListRegionalsService(estado, sortBy, order);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "codigo", "nombre", "estado"]),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de regionales", 500, [
      {
        code: "GET_LIST_REGIONALS_ERROR",
        detail: error.message,
      },
    ]);
  }
};


export const storeRegional = async (req, res) => {
  try {
    const regional = await storeRegionalService(req.body);

    return successResponse(
      res,
      {
        id: regional.id,
        nombre: regional.codigo,
        descripcion: regional.nombre,
        estado: regional.estado,
      },
      201
    );
  } catch (error) {

    // Manejar errores de validación específicos
    // Unificar código de error de duplicados
    if (error.code === "VALIDATION_ERROR" || error.code === "DUPLICATE_VALUE") {
      return errorResponse(res, error.message, 400, [
        {
          code: error.code === "DUPLICATE__VALUE" ? "DUPLICATE_VALUE" : error.code,
          field: error.field,
          detail: error.message,
        },
      ]);
    }

    return errorResponse(res, "Error al crear la regional", 500, [
      {
        code: "CREATE_REGIONAL_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const showRegional = async (req, res) => {
  try {
    const regional = await showRegionalService(req.params.codigo);

    if (!regional) {
      return errorResponse(res, "No existe una regional con el codigo", 404, [
        {
          code: "REGIONAL_NOT_FOUND",
          detail: `No existe una regional con codigo ${req.params.codigo}`,
        },
      ]);
    }

    return successResponse(
      res,
      {
        id: regional.id,
        codigo: regional.codigo,
        nombre: regional.nombre,
        estado: regional.estado,
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la regional", 500, [
      {
        code: "SHOW_REGIONAL_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const updateRegional = async (req, res) => {
  try {
    const regional = await updateRegionalService(req.params.codigo, req.body);

    return successResponse(
      res,
      {
        id: regional.id,
        codigo: regional.codigo,
        nombre: regional.nombre,
        estado: regional.estado,
      },
      200
    );
  } catch (error) {
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Regional no encontrada", 404, [
        {
          code: "REGIONAL_NOT_FOUND",
          detail: `No existe una regional con ese codigo ${req.params.codigo}`,
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

    if (error.code === "SYSTEM_REGIONAL_UPDATE_FORBIDDEN") {
      return errorResponse(res, "No permitido", 403, [
        {
          code: error.code,
          detail: error.message,
        },
      ]);
    }

    return errorResponse(res, "Error al actualizar la regional", 500, [
      {
        code: "UPDATE_REGIONAL_ERROR",
        detail: error.message,
      },
    ]);
  }
};


export const changeRegionalStatus = async (req, res) => {
  try {
    const regional = await changeRegionalStatusService(req.params.codigo, req.body.estado);

    if (regional === "NOT_FOUND") {
      return errorResponse(res, "Regional no encontrada", 404, [
        {
          code: "ROLE_NOT_FOUND",
          detail: `No existe una Regional con ese codigo${req.params.codigo}`,
        },
      ]);
    }

    return successResponse(
      res,
      {
        id: regional.id,
        codigo: regional.codigo,
        nombre: regional.nombre,
        estado: regional.estado,
      },
      200
    );
  } catch (error) {

    // Manejar errores específicos
    if (error.code === "REGIONAL_HAS_CENTERS") {
      return errorResponse(res, "No se puede cambiar el estado porque la regional tiene centros asociados", 409, [
        {
          code: "REGIONAL_HAS_CENTERS",
          detail: error.message,
        },
      ]);
    }
    if (error.code === "SYSTEM_ROLE_UPDATE_FORBIDDEN") {
      return errorResponse(res, "No permitido", 403, [
        {
          code: "SYSTEM_ROLE_UPDATE_FORBIDDEN",
          detail: error.message,
        },
      ]);
    }
    if (error.code === "ROLE_HAS_USERS") {
      return errorResponse(res, "No se puede desactivar", 409, [
        {
          code: "ROLE_HAS_USERS",
          detail: error.message,
        },
      ]);
    }
    return errorResponse(res, "Error al cambiar el estado de la Regional", 500, [
      {
        code: "CHANGE_ROLE_STATUS_ERROR",
        detail: error.message,
      },
    ]);
  }
};

