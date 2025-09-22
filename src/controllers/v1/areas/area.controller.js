// controllers/areaController.js
import { errorResponse, successResponse } from "../../../utils/response.util.js";
import {
  getAreasService,
  getListAreasService,
  storeAreaService,
  showAreaService,
  updateAreaService,
  changeAreaStatusService,
} from "../../../services/v1/area.service.js";
import { getCentrosByAreaRepository } from "../../../repositories/area.repository.js";

import { buildPagination } from '../../../utils/buildPagination.util.js';

export const getAreas = async (req, res) => {
  try {
    const { data, count, meta, links } = await getAreasService(req);
    return successResponse(res, data, 200, meta, links);
  } catch (error) {
    return errorResponse(res, "Error al obtener las áreas", 500, [
      {
        code: "GET_AREAS_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const getListAreas = async (req, res) => {
  try {
    const { data, count } = await getListAreasService(req);
    return successResponse(
      res,
      data.map((area) => ({
        id: area.id,
        nombre: area.nombre,
        estado: area.estado,
        created_at: area.created_at,
        updated_at: area.updated_at,
      })),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de áreas", 500, [
      {
        code: "GET_LIST_AREAS_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const storeArea = async (req, res) => {
  try {
    const area = await storeAreaService(req.body);
    return successResponse(
      res,
      {
        id: area.id,
        nombre: area.nombre,
        estado: area.estado,
        created_at: area.created_at,
        updated_at: area.updated_at,
      },
      201
    );
  } catch (error) {
    // Manejo de error de nombre duplicado igual que roles
    if (error.code === "DUPLICATE_AREA_NAME") {
      return errorResponse(res, error.message, 409, [
        {
          code: error.code,
          field: error.field,
          detail: error.message,
        },
      ]);
    }
    if (error.code === "VALIDATION_ERROR") {
      return errorResponse(res, error.message, 400, [
        {
          code: error.code,
          field: error.field,
          detail: error.message,
        },
      ]);
    }
    return errorResponse(res, "Error al crear el área", 500, [
      {
        code: "CREATE_AREA_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const showArea = async (req, res) => {
  try {
    const area = await showAreaService(req.params.id);
    if (!area) {
      return errorResponse(res, 'area no encontrada', 404, [
        { code: 'area_NOT_FOUND', detail: `No existe un area con ID ${req.params.id}` },
      ]);
    }
    return successResponse(
      res,
      {
        id: area.id,
        nombre: area.nombre,
        estado: area.estado,
        created_at: area.created_at,
        updated_at: area.updated_at,
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener el área", 500, [
      {
        code: "SHOW_AREA_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const updateArea = async (req, res) => {
  try {
    const area = await updateAreaService(req.params.id, req.body);
    return successResponse(
      res,
      {
        id: area.id,
        nombre: area.nombre,
        estado: area.estado,
        created_at: area.created_at,
        updated_at: area.updated_at,
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al actualizar el área", 500, [
      {
        code: "UPDATE_AREA_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const changeAreaStatus = async (req, res) => {
  try {
    const area = await changeAreaStatusService(req.params.id, req.body.estado);
    if (!area) {
      return errorResponse(res, 'area no encontrada', 404, [
        { code: 'area_NOT_FOUND', detail: `No existe un area con ID ${req.params.id}` },
      ]);
    }
    return res.status(200).json({
      message: "Cambio de estado realizado correctamente",
      data: {
        id: area.id,
        nombre: area.nombre,
        estado: area.estado,
        created_at: area.created_at,
        updated_at: area.updated_at,
      }
    });
  } catch (error) {
    return errorResponse(res, "Error al cambiar el estado del área", 500, [
      {
        code: "CHANGE_AREA_STATUS_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const getCentrosByArea = async (req, res) => {
  try {
    const areaId = req.params.id;
    const centros = await getCentrosByAreaRepository(areaId);
    if (!centros) {
      return errorResponse(res, "Área no encontrada", 404, [
        { code: "AREA_NOT_FOUND", detail: `No existe un área con ID ${areaId}` },
      ]);
    }
    // Solo devolver array plano de centros
    return res.status(200).json(centros.map(c => ({ id: c.id, nombre: c.nombre })));
  } catch (error) {
    return errorResponse(res, "Error al obtener los centros del área", 500, [
      { code: "GET_CENTROS_BY_AREA_ERROR", detail: error.message },
    ]);
  }
};