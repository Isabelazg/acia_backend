import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  getRegistrosPresupuestalesService,
  getListRegistrosPresupuestalesService,
  storeRegistroPresupuestalService,
  storeMultipleRegistrosPresupuestalesService,
  showRegistroPresupuestalService,
  updateRegistroPresupuestalService
} from "../../../services/v1/registros_presupuestales.service.js";

/**
 * Obtener los registros presupuestales con filtros, orden y paginación.
 */
export const getRegistrosPresupuestales = async (req, res) => {
  try {
    const { data, meta, links } = await getRegistrosPresupuestalesService(req);
    return successResponse(res, data, 200, meta, links);
  } catch (error) {
    return errorResponse(res, "Error al obtener los registros presupuestales", 500, [
      { code: "GET_REGISTROS_PRESUPUESTALES_ERROR", detail: error.message },
    ]);
  }
};

/**
 * Obtener lista de todos los registros presupuestales sin paginación.
 */
export const getListRegistrosPresupuestales = async (req, res) => {
  try {
    let { sortBy = "id", order = "ASC" } = req.query;

    const { data, count } = await getListRegistrosPresupuestalesService(sortBy, order);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "numero_proceso_secop", "link_proceso_secop", "contratos_id"]),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de registros presupuestales", 500, [
      { code: "GET_LIST_REGISTROS_PRESUPUESTALES_ERROR", detail: error.message },
    ]);
  }
};

/**
 * Crear un nuevo registro presupuestal individual.
 */
export const storeRegistroPresupuestal = async (req, res) => {
  try {
    const { numero_proceso_secop, link_proceso_secop, contratos_id } = req.body;

    const registro = await storeRegistroPresupuestalService({
      numero_proceso_secop,
      link_proceso_secop,
      contratos_id
    });

    return successResponse(res, registro, 201);
  } catch (error) {
    console.error("Error al crear el registro presupuestal:", error);
    return errorResponse(res, "Error al crear el registro presupuestal", 500, [
      { code: "CREATE_REGISTRO_PRESUPUESTAL_ERROR", detail: error.message }
    ]);
  }
};

/**
 * Crear múltiples registros presupuestales.
 */
export const storeMultipleRegistrosPresupuestales = async (req, res) => {
  try {
    const { registros } = req.body; // Array de objetos

    if (!Array.isArray(registros) || registros.length === 0) {
      return errorResponse(res, "Debe enviar un array de registros válidos", 400, [
        { code: "INVALID_INPUT", detail: "El campo 'registros' debe ser un array no vacío." }
      ]);
    }

    const nuevosRegistros = await storeMultipleRegistrosPresupuestalesService(registros);

    return successResponse(res, nuevosRegistros, 201);
  } catch (error) {
    console.error("Error al crear múltiples registros presupuestales:", error);
    return errorResponse(res, "Error al crear múltiples registros presupuestales", 500, [
      { code: "STORE_MULTIPLE_REGISTROS_PRESUPUESTALES_ERROR", detail: error.message }
    ]);
  }
};

/**
 * Mostrar registro presupuestal por ID.
 */
export const showRegistroPresupuestal = async (req, res) => {
  try {
    const registro = await showRegistroPresupuestalService(req.params.id);

    if (!registro) {
      return errorResponse(res, "No existe un registro presupuestal con el ID", 404, [
        { code: "REGISTRO_PRESUPUESTAL_NOT_FOUND", detail: `ID ${req.params.id}` }
      ]);
    }

    return successResponse(res, {
      id: registro.id,
      numero_proceso_secop: registro.numero_proceso_secop,
      link_proceso_secop: registro.link_proceso_secop,
      contratos_id: registro.contratos_id,
      created_at: registro.created_at,
      updated_at: registro.updated_at
    }, 200);
  } catch (error) {
    return errorResponse(res, "Error al obtener el registro presupuestal", 500, [
      { code: "SHOW_REGISTRO_PRESUPUESTAL_ERROR", detail: error.message }
    ]);
  }
};

/**
 * Actualizar registro presupuestal por ID.
 */
export const updateRegistroPresupuestal = async (req, res) => {
  try {
    const registro = await updateRegistroPresupuestalService(req.params.id, req.body);

    return successResponse(res, {
      id: registro.id,
      numero_proceso_secop: registro.numero_proceso_secop,
      link_proceso_secop: registro.link_proceso_secop,
      contratos_id: registro.contratos_id,
      created_at: registro.created_at,
      updated_at: registro.updated_at
    }, 200);
  } catch (error) {
    console.error("Error al actualizar el registro presupuestal:", error);
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Registro presupuestal no encontrado", 404, [
        { code: "REGISTRO_PRESUPUESTAL_NOT_FOUND", detail: `ID ${req.params.id}` }
      ]);
    }
    return errorResponse(res, "Error al actualizar el registro presupuestal", 500, [
      { code: "UPDATE_REGISTRO_PRESUPUESTAL_ERROR", detail: error.message }
    ]);
  }
};
