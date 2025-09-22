import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  gettitulo_formacionService,
  getListtitulo_formacionService,
  storetitulo_formacionService,
  showtitulo_formacionService,
  updatetitulo_formacionService,
  changetitulo_formacionStatusService
} from "../../../services/v1/tipo_formacion.service.js";

/**
 * Controlador para obtener los titulos de formacion con filtros, orden y paginación usando servicios.
 */
export const gettitulo_formacion = async (req, res) => {
  try {
    const {
      data,
      meta,
      links
    } = await gettitulo_formacionService(req);

    return successResponse(
      res,
      data,
      200,
      meta,
      links
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener los titulos de formacion", 500, [
      {
        code: "GET_TITULO_FORMACION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const getListtitulo_formacion = async (req, res) => {
  try {
    let { estado, sortBy = "id", order = "ASC" } = req.query;
    if (estado !== undefined) {
      if (estado === "true") estado = true;
      else if (estado === "false") estado = false;
      else estado = undefined;
    }

    const { data, count } = await getListtitulo_formacionService(estado, sortBy, order);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "nombre", "estado"]),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de titulo de formacion", 500, [
      {
        code: "GET_LIST_TITULO_FORMACION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const storetitulo_formacion = async (req, res) => {
  try {
    const { nombre, estado } = req.body;

    const titulo_formacion = await storetitulo_formacionService({ nombre, estado });

    return successResponse(
      res,
      {
        id: titulo_formacion.id,
        nombre: titulo_formacion.nombre,
        estado: titulo_formacion.estado
      },
      201
    );
  } catch (error) {

    // Otros errores
    return errorResponse(res, "Error al crear el titulo de formacion", 500, [
      { code: "CREATE_TITULO_FORMACION_ERROR", detail: error.message }
    ]);
  }
};

export const showtitulo_formacion = async (req, res) => {
  try {
    const titulo_formacion = await showtitulo_formacionService(req.params.id);

    if (!titulo_formacion) {
      return errorResponse(res, "No existe un titulo de formacion con el ID", 404, [
        {
          code: "TITULO_FORMACION_NOT_FOUND",
          detail: `No existe un titulo de formacion con ID ${req.params.id}`,
        },
      ]);
    }

    return successResponse(
      res,
      {
        id: titulo_formacion.id,
        nombre: titulo_formacion.nombre,
        estado: titulo_formacion.estado
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener el titulo de formacion", 500, [
      {
        code: "SHOW_TITULO_FORMACION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const updatetitulo_formacion = async (req, res) => {
  try {
    const titulo_formacion = await updatetitulo_formacionService(req.params.id, req.body);

    return successResponse(
      res,
      {
        id: titulo_formacion.id,
        nombre: titulo_formacion.nombre,
        estado: titulo_formacion.estado
      },
      200
    );
  } catch (error) {
    console.error("Error al actualizar el titulo de formacion:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Tipo minuta no encontrado", 404, [
        {
          code: "TITULO_FORMACION_NOT_FOUND",
          detail: `No existe un titulo de formacion con ID ${req.params.id}`,
        },
      ]);
    }

    if (error.code === "DUPLICATE_TITULO_FORMACION_NAME") {
      return errorResponse(res, "El nombre ya está en uso", 409, [
        {
          code: error.code,
          detail: error.message,
          field: "nombre"
        },
      ]);
    }

    return errorResponse(res, "Error al actualizar el titulo de formacion", 500, [
      {
        code: "UPDATE_TITULO_FORMACION_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const changetitulo_formacionStatus = async (req, res) => {
  try {
    const titulo_formacion = await changetitulo_formacionStatusService(req.params.id, req.body.estado);

    return successResponse(
      res,
      {
        id: titulo_formacion.id,
        nombre: titulo_formacion.nombre,
        estado: titulo_formacion.estado,
      },
      200
    );
  } catch (error) {
    console.error("Error al cambiar estado:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Titulo de formacion no encontrado", 404, [
        {
          code: "TITULO_FORMACION_NOT_FOUND",
          detail: error.message,
        },
      ]);
    }

    if (error.code === "TITULO_FORMACION_HAS_AUTORIZACIONES") {
      return errorResponse(res, "No se puede desactivar", 409, [
        {
          code: "TITULO_FORMACION_HAS_AUTORIZACIONES",
          detail: error.message,
        },
      ]);
    }

    return errorResponse(res, "Error al cambiar el estado del titulo de formacion", 500, [
      {
        code: "CHANGE_TITULO_FORMACION_STATUS_ERROR",
        detail: error.message,
      },
    ]);
  }
};