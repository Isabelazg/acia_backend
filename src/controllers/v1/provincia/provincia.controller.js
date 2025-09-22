import { errorResponse, successResponse } from '../../../utils/response.util.js';
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import { getProvincesService, showProvinceService } from "../../../services/v1/provinicia.service.js";

/**
 * Controlador para obtener las provincias con filtros, orden y paginación usando servicios.
 */
export const getProvinces = async (req, res) => {
  try {
    const {
      data,
      meta,
      links
    } = await getProvincesService(req);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "nombre", "created_at", "updated_at"]),
      200,
      meta,
      links
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener las provincias", 500, [
      {
        code: "GET_PROVINCE_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const showProvince = async (req, res) => {
  try {
    const provincia = await showProvinceService(req.params.id);

    if (!provincia) {
      return errorResponse(res, "Provincia no encontrada", 404, [
        {
          code: "PROVINCE_NOT_FOUND",
          detail: `No existe una provincia con id ${req.params.id}`,
        },
      ]);
    }

    return successResponse(
      res,
      {
        id: provincia.id,
        nombre: provincia.nombre,
        created_at: provincia.created_at,
        updated_at: provincia.updated_at
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la provincia", 500, [
      {
        code: "SHOW_PROVINCE_ERROR",
        detail: error.message,
      },
    ]);
  }
};