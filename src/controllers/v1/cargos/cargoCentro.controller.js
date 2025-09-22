import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import { getCentrosByCargoService, showCargoService } from "../../../services/v1/cargo.service.js";

export const getListCentrosByCargo = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, sortBy = "id", order = "ASC" } = req.query;

    // Primero verificar que el cargo existe
    const cargo = await showCargoService(id);
    if (!cargo) {
      return errorResponse(res, "No existe un cargo con el ID", 404, [
        {
          code: "CARGO_NOT_FOUND",
          detail: `No existe un cargo con ID ${id}`,
        },
      ]);
    }

    const { data, count } = await getCentrosByCargoService(id, estado, sortBy, order);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "codigo", "nombre", "estado"]),
      200,
      { count }
    );
  } catch (error) {
    console.error("Error en getListCentrosByCargo:", error);
    return errorResponse(res, "Error al obtener los centros del cargo", 500, [
      {
        code: "GET_CENTROS_BY_CARGO_ERROR",
        detail: error.message,
      },
    ]);
  }
};