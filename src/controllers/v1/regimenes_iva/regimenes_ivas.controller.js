import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  getRegimenesIvasService,
  getListRegimenesIvasService,
  storeRegimenIvaService,
  showRegimenIvaService,
  updateRegimenIvaService,
  changeRegimenIvaStatusService
} from "../../../services/v1/regimenes_ivas.service.js";

/**
 * Controlador para obtener regimenes de IVA con filtros, orden y paginación
 */
export const getRegimenesIvas = async (req, res) => {
  try {
    const { data, meta, links } = await getRegimenesIvasService(req);
    return successResponse(res, data, 200, meta, links);
  } catch (error) {
    return errorResponse(res, "Error al obtener los regimenes de IVA", 500, [
      {
        code: "GET_REGIMENES_IVA_ERROR",
        detail: error.message,
      },
    ]);
  }
};

/**
 * Controlador para obtener lista simple de regimenes de IVA
 */
export const getListRegimenesIvas = async (req, res) => {
  try {
    let { estado, sortBy = "id", order = "ASC" } = req.query;
    if (estado === "true") estado = true;
    else if (estado === "false") estado = false;
    else estado = undefined;

    const result = await getListRegimenesIvasService(estado, sortBy, order);

    return successResponse(
      res,
      formatJsonApiData(result, ["id", "nombres", "estado"]),
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de regimenes de IVA", 500, [
      {
        code: "GET_LIST_REGIMENES_IVA_ERROR",
        detail: error.message,
      },
    ]);
  }
};

/**
 * Controlador para crear un nuevo regimen de IVA
 */
export const storeRegimenIva = async (req, res) => {
  try {
    const { nombres, estado } = req.body;
    const regimenIva = await storeRegimenIvaService({ nombres, estado });

    return successResponse(
      res,
      {
        id: regimenIva.id,
        nombres: regimenIva.nombres,
        estado: regimenIva.estado
      },
      201
    );
  } catch (error) {
    return errorResponse(res, "Error al crear el regimen de IVA", 500, [
      {
        code: "CREATE_REGIMEN_IVA_ERROR",
        detail: error.message,
      },
    ]);
  }
};

/**
 * Controlador para mostrar un regimen de IVA por ID
 */
export const showRegimenIva = async (req, res) => {
  try {
    const regimenIva = await showRegimenIvaService(req.params.id);

    if (!regimenIva) {
      return errorResponse(res, "Regimen de IVA no encontrado", 404, [
        {
          code: "REGIMEN_IVA_NOT_FOUND",
          detail: `No existe un regimen de IVA con ID ${req.params.id}`,
        },
      ]);
    }

    return successResponse(
      res,
      {
        id: regimenIva.id,
        nombres: regimenIva.nombres,
        estado: regimenIva.estado
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener el regimen de IVA", 500, [
      {
        code: "SHOW_REGIMEN_IVA_ERROR",
        detail: error.message,
      },
    ]);
  }
};

/**
 * Controlador para actualizar un regimen de IVA
 */
export const updateRegimenIva = async (req, res) => {
  try {
    const regimenIva = await updateRegimenIvaService(req.params.id, req.body);

    return successResponse(
      res,
      {
        id: regimenIva.id,
        nombres: regimenIva.nombres,
        estado: regimenIva.estado
      },
      200
    );
  } catch (error) {
    console.error("Error al actualizar el regimen de IVA:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Regimen de IVA no encontrado", 404, [
        {
          code: "REGIMEN_IVA_NOT_FOUND",
          detail: `No existe un regimen de IVA con ID ${req.params.id}`,
        },
      ]);
    }

    if (error.code === "DUPLICATE_REGIMEN_IVA_NAME") {
      return errorResponse(res, "El nombre ya está en uso", 409, [
        {
          code: error.code,
          detail: error.message,
          field: "nombres"
        },
      ]);
    }

    return errorResponse(res, "Error al actualizar el regimen de IVA", 500, [
      {
        code: "UPDATE_REGIMEN_IVA_ERROR",
        detail: error.message,
      },
    ]);
  }
};

/**
 * Controlador para cambiar el estado de un regimen de IVA
 */
export const changeRegimenIvaStatus = async (req, res) => {
  try {
    const regimenIva = await changeRegimenIvaStatusService(req.params.id, req.body.estado);

    return successResponse(
      res,
      {
        id: regimenIva.id,
        nombres: regimenIva.nombres,
        estado: regimenIva.estado,
      },
      200
    );
  } catch (error) {
    console.error("Error al cambiar estado del regimen de IVA:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Regimen de IVA no encontrado", 404, [
        {
          code: "REGIMEN_IVA_NOT_FOUND",
          detail: error.message,
        },
      ]);
    }

    if (error.code === "REGIMEN_IVA_HAS_AUTORIZACIONES") {
      return errorResponse(res, "No se puede desactivar el regimen de IVA", 409, [
        {
          code: "REGIMEN_IVA_HAS_AUTORIZACIONES",
          detail: error.message,
        },
      ]);
    }

    return errorResponse(res, "Error al cambiar el estado del regimen de IVA", 500, [
      {
        code: "CHANGE_REGIMEN_IVA_STATUS_ERROR",
        detail: error.message,
      },
    ]);
  };
};