import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import { getCitiesService, showCityService } from "../../../services/v1/ciudad.service.js";

/**
 * Controlador para obtener las ciudades con filtros, orden y paginación usando servicios.
 */
export const getCities = async (req, res) => {
  try {
    const {
      data,
      meta,
      links,
      isPaginated
    } = await getCitiesService(req);

    if (!isPaginated) {
      return successResponse(
        res,
        formatJsonApiData(data, ["id", "nombre", "created_at", "updated_at"]),
        200,
        meta,
        links
      );
    }
    return successResponse(
      res,
      formatJsonApiData(data, [
        "id",
        "nombre",
        "provincia", // Esto incluirá el objeto provincia con id y nombre
        "created_at",
        "updated_at"
      ]),
      200,
      meta,
      links
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener las ciudades", 500, [
      {
        code: "GET_CITY_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const showCity = async (req, res) => {
  try {
    const nombre = await showCityService(req.params.id);

    if (!nombre) {
      return errorResponse(res, "Ciudad no encontrada", 404, [
        {
          code: "CITY_NOT_FOUND",
          detail: `No existe una ciudad con id ${req.params.id}`,
        },
      ]);
    }

    return successResponse(
      res,
      {
        id: ciudad.id,
        nombre: ciudad.ciudad,
        provincia: ciudad.provincia // Incluye el objeto provincia
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la ciudad", 500, [
      {
        code: "SHOW_CITY_ERROR",
        detail: error.message,
      },
    ]);
  }
};