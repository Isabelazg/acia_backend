import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import { getCoordinadoresByCentroService } from "../../../services/v1/coordinadorCentro.service.js";

export const getListCoordinadoresByCentro = async (req, res) => {
  try {
    const { codigo } = req.params;
    const { estado, sortBy = "id", order = "ASC" } = req.query;

    const { data, count } = await getCoordinadoresByCentroService(codigo, estado, sortBy, order);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "documento", "nombres", "apellidos", "correo", "telefono", "estado", "centros_id"]),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener los coordinadores del centro", 500, [
      {
        code: "GET_COORDINADORES_BY_CENTRO_ERROR",
        detail: error.message,
      },
    ]);
  }
};
