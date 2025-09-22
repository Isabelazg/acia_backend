import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import { getCitiesByProvinceService } from "../../../services/v1/provinicia.service.js";

export const getCitiesByProvince = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la provincia desde los parámetros
    const { sortBy = "id", order = "ASC" } = req.query;

    const { data, count } = await getCitiesByProvinceService(id, sortBy, order);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "nombre", "provincia_id"]), // Cambiado "ciudad" a "nombre"
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener las ciudades de la provincia", 500, [
      {
        code: "GET_CITIES_BY_PROVINCE_ERROR",
        detail: error.message,
      },
    ]);
  }
};