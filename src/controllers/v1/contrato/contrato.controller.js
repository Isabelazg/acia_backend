import { errorResponse, successResponse } from "../../../utils/response.util.js";
import {
  getContratosService,
  getListContratosService,
  storeContratoService,
  showContratoService,
  updateContratoService
} from "../../../services/v1/contrato.service.js";

export const getContratos = async (req, res) => {
  try {
    const {
      data,
      meta,
      links
    } = await getContratosService(req);

    return successResponse(
      res,
      data,
      200,
      meta,
      links
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener los contratos", 500, [
      {
        code: "GET_CONTRATOS_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const getListContratos = async (req, res) => {
  try {
    const { data, count } = await getListContratosService();
    return successResponse(
      res,
      data,
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de contratos", 500, [
      {
        code: "GET_LIST_CONTRATOS_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const storeContrato = async (req, res) => {
  try {
    const contrato = await storeContratoService(req.body);
    return successResponse(
      res,
      contrato,
      201
    );
  } catch (error) {
    // Manejar errores de validación específicos
    if (error.code === "VALIDATION_ERROR" || error.code === "DUPLICATE_VALUE") {
      return errorResponse(res, error.message, 400, [
        {
          code: error.code === "DUPLICATE__VALUE" ? "DUPLICATE_VALUE" : error.code,
          field: error.field,
          detail: error.message,
        },
      ]);
    }
    return errorResponse(res, "Error al crear el contrato", 500, [
      {
        code: "CREATE_CONTRATO_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const showContrato = async (req, res) => {
  try {
    const contrato = await showContratoService(req.params.numero);
    if (!contrato) {
      return errorResponse(res, "No existe un contrato con ese id", 404, [
        {
          code: "CONTRATO_NOT_FOUND",
          detail: `No existe un contrato con id ${req.params.numero}`,
        },
      ]);
    }
    return successResponse(
      res,
      contrato,
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener el contrato", 500, [
      {
        code: "SHOW_CONTRATO_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const updateContrato = async (req, res) => {
  try {
    const contrato = await updateContratoService(req.params.numero, req.body);
    return successResponse(
      res,
      contrato,
      200
    );
  } catch (error) {
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Contrato no encontrado", 404, [
        {
          code: "CONTRATO_NOT_FOUND",
          detail: `No existe un contrato con ese id ${req.params.numero}`,
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
    return errorResponse(res, "Error al actualizar el contrato", 500, [
      {
        code: "UPDATE_CONTRATO_ERROR",
        detail: error.message,
      },
    ]);
  }
};
