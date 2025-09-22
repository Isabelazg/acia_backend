import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import { getCentrosByRegionalService } from "../../../services/v1/regional.service.js";

export const getListCentrosByRegional = async (req, res) => {
  try {
    const { codigo } = req.params; // Obtener el código de la regional desde los parámetros
    const { estado, sortBy = "id", order = "ASC" } = req.query;

    const { data, count } = await getCentrosByRegionalService(codigo, estado, sortBy, order);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "codigo", "nombre", "estado"]),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener los centros de la regional", 500, [
      {
        code: "GET_CENTROS_BY_REGIONAL_ERROR",
        detail: error.message,
      },
    ]);
  }
};