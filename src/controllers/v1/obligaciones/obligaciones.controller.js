import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  getObligacionesService,
  getListObligacionesService,
  storeObligacionesService,
  showObligacionesService,
  updateObligacionesService,
  deleteObligacionesService
} from "../../../services/v1/Obligaciones.service.js";

/**
 * Controlador para obtener obligaciones con filtros, orden y paginación usando servicios.
 */
export const getObligaciones = async (req, res) => {
  try {
    const {
      data,
      meta,
      links
    } = await getObligacionesService(req);

    return successResponse(
      res,
      data,
      200,
      meta,
      links
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener los cargos", 500, [
      {
        code: "GET_TIPO_MINUTAS_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const getListObligaciones = async (req, res) => {
  try {
    let { estado, sortBy = "id", order = "ASC" } = req.query;
    if (estado !== undefined) {
      if (estado === "true") estado = true;
      else if (estado === "false") estado = false;
      else estado = undefined;
    }

    const { data, count } = await getListObligacionesService(estado, sortBy, order);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "nombre", "numero_orden"]),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de obligaciones", 500, [
      {
        code: "GET_LIST_OBLIGACIONES_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const storeObligaciones = async (req, res) => {
  try {
    const { nombre, numero_orden } = req.body;

    const Obligaciones = await storeObligacionesService({ nombre, numero_orden });

    return successResponse(
      res,
      {
        id: Obligaciones.id,
        nombre: Obligaciones.nombre,
        numero_orden: Obligaciones.numero_orden
      },
      201
    );
  } catch (error) {

    // Otros errores
    return errorResponse(res, "Error al crear el tipo de obligacion", 500, [
      { code: "CREATE_OBLIGACIONES_ERROR", detail: error.message }
    ]);
  }
};

export const showObligaciones = async (req, res) => {
  try {
    const Obligaciones = await showObligacionesService(req.params.id);

    if (!Obligaciones) {
      return errorResponse(res, "No existe un tipo de obligacion con el ID", 404, [
        {
          code: "OBLIGACIONES_NOT_FOUND",
          detail: `No existe una obligacion con ID ${req.params.id}`,
        },
      ]);
    }

    return successResponse(
      res,
      {
        id: Obligaciones.id,
        nombre: Obligaciones.nombre,
        numero_orden: Obligaciones.numero_orden
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la obligacion", 500, [
      {
        code: "SHOW_OBLIGACIONES_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const updateObligaciones = async (req, res) => {
  try {
    const Obligaciones = await updateObligacionesService(req.params.id, req.body);

    return successResponse(
      res,
      {
        id: Obligaciones.id,
        nombre: Obligaciones.nombre,
        numero_orden: Obligaciones.numero_orden
      },
      200
    );
  } catch (error) {
    console.error("Error al actualizar el tipo de obligacion:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "obligacion no encontrada", 404, [
        {
          code: "OBLIGACIONES_NOT_FOUND",
          detail: `No existe un tipo de obligacion con ID ${req.params.id}`,
        },
      ]);
    }

    if (error.code === "DUPLICATE_OBLIGACIONES_NAME") {
      return errorResponse(res, "El nombre ya está en uso", 409, [
        {
          code: error.code,
          detail: error.message,
          field: "nombre"
        },
      ]);
    }

    return errorResponse(res, "Error al actualizar la obligacion", 500, [
      {
        code: "UPDATE_OBLIGACIONES_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const changeObligacionesStatus = async (req, res) => {
  try {
    const Obligaciones = await getObligacionesService(req.params.id, req.body.numero_orden);

    return successResponse(
      res,
      {
        id: Obligaciones.id,
        nombre: Obligaciones.nombre,
        numero_orden: Obligaciones.numero_orden,
      },
      200
    );
  } catch (error) {
    console.error("Error al cambiar el numero de orden:", error);

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "obligacion no encontrada", 404, [
        {
          code: "OBLIGACIONES_NOT_FOUND",
          detail: error.message,
        },
      ]);
    }

    if (error.code === "OBLIGACIONES_HAS_AUTORIZACIONES") {
      return errorResponse(res, "No se puede desactivar", 409, [
        {
          code: "OBLIGACIONES_HAS_AUTORIZACIONES",
          detail: error.message,
        },
      ]);
    }

    return errorResponse(res, "Error al cambiar el estado de la obligacion", 500, [
      {
        code: "CHANGE_OBLIGACIONES_STATUS_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const deleteObligaciones = async (req, res) => {
  try {
    const { id } = req.params;

    const obligacionEliminada = await deleteObligacionesService(id);

    return successResponse(
      res,
      {
        id: obligacionEliminada.id,
        nombre: obligacionEliminada.nombre,
        message: 'Obligación eliminada exitosamente'
      },
      200
    );
  } catch (error) {
    console.error("Error al eliminar la obligación:", error);
    
    // ... el mismo manejo de errores que ya tienes ...
    
    if (error.code === 'NOT_FOUND') {
      return errorResponse(res, 'Obligación no encontrada', 404, [
        {
          code: 'OBLIGACION_NOT_FOUND',
          detail: `No existe una obligación con el ID ${req.params.id}`
        }
      ]);
    }
    
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return errorResponse(res, 'No se puede eliminar la obligación porque está asociada a otros registros', 409, [
        {
          code: 'CONSTRAINT_ERROR',
          detail: 'Violación de integridad referencial. Elimina primero los registros asociados.'
        }
      ]);
    }

    return errorResponse(res, 'Error al eliminar la obligación', 500, [
      {
        code: 'DELETE_OBLIGACION_ERROR',
        detail: error.message
      }
    ]);
  }
};