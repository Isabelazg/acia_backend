import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  getexperiencia_laboralService,
  getListexperiencia_laboralService,
  storeexperiencia_laboralService,
  storeMultipleExperienciasService,
  updateexperiencia_laboralService,
} from "../../../services/v1/experiencias_laboral.service.js";

/**
 * Obtener las experiencias laborales con filtros, orden y paginación.
 */
export const getexperiencia_laboral = async (req, res) => {
  try {
    const { data, meta, links } = await getexperiencia_laboralService(req);
    return successResponse(res, data, 200, meta, links);
  } catch (error) {
    return errorResponse(res, "Error al obtener las experiencias laborales", 500, [
      { code: "GET_EXPERIENCIA_LABORAL_ERROR", detail: error.message },
    ]);
  }
};

/**
 * Obtener lista de todas las experiencias laborales sin paginación.
 */
export const getListexperiencia_laboral = async (req, res) => {
  try {
    let { estado, sortBy = "id", order = "ASC" } = req.query;
    if (estado !== undefined) {
      estado = estado === "true" ? true : estado === "false" ? false : undefined;
    }
    const { data, count } = await getListexperiencia_laboralService(estado, sortBy, order);
    return successResponse(res, formatJsonApiData(data, ["id", "empresa", "cargo"]), 200, { count });
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de experiencias laborales", 500, [
      { code: "GET_LIST_EXPERIENCIA_LABORAL_ERROR", detail: error.message },
    ]);
  }
};

/**
 * Crear una nueva experiencia laboral individual.
 */
export const storeexperiencia_laboral = async (req, res) => {
  try {
    const { empresa, cargo, fecha_ingreso, fecha_retiro, experiencia_docente, informacion_personal_id } = req.body;

    const experiencia_laboral = await storeexperiencia_laboralService({
      empresa, cargo, fecha_ingreso, fecha_retiro, experiencia_docente, informacion_personal_id
    });

    return successResponse(res, experiencia_laboral, 201);
  } catch (error) {
    console.error("Error al crear la experiencia laboral:", error);
    return errorResponse(res, "Error al crear la experiencia laboral", 500, [
      { code: "CREATE_EXPERIENCIA_LABORAL_ERROR", detail: error.message }
    ]);
  }
};

/**
 * Crear múltiples experiencias laborales.
 */
export const storeMultipleExperiencias = async (req, res) => {
  try {
    const { experiencias } = req.body; // Array de objetos

    if (!Array.isArray(experiencias) || experiencias.length === 0) {
      return errorResponse(res, "Debe enviar un array de experiencias laborales válidas", 400, [
        { code: "INVALID_INPUT", detail: "El campo 'experiencias' debe ser un array no vacío." }
      ]);
    }

    const nuevasExperiencias = await storeMultipleExperienciasService(experiencias);

    return successResponse(res, nuevasExperiencias, 201);
  } catch (error) {
    console.error("Error al crear múltiples experiencias:", error);
    return errorResponse(res, "Error al crear múltiples experiencias laborales", 500, [
      { code: "STORE_MULTIPLE_EXPERIENCIAS_ERROR", detail: error.message }
    ]);
  }
};

/**
 * Mostrar experiencia laboral por ID.
 */
export const showexperiencia_laboral = async (req, res) => {
  try {
    const experiencia_laboral = await showexperiencia_laboralService(req.params.id);

    if (!experiencia_laboral) {
      return errorResponse(res, "No existe una experiencia laboral con el ID", 404, [
        { code: "EXPERIENCIA_LABORAL_NOT_FOUND", detail: `ID ${req.params.id}` }
      ]);
    }

    return successResponse(res, {
      id: experiencia_laboral.id,
      empresa: experiencia_laboral.empresa,
      cargo: experiencia_laboral.cargo,
      fecha_ingreso: experiencia_laboral.fecha_ingreso,
      fecha_retiro: experiencia_laboral.fecha_retiro,
      experiencia_docente: experiencia_laboral.experiencia_docente,
      informacion_personal_id: experiencia_laboral.informacion_personal_id
    }, 200);
  } catch (error) {
    return errorResponse(res, "Error al obtener la experiencia laboral", 500, [
      { code: "SHOW_EXPERIENCIA_LABORAL_ERROR", detail: error.message }
    ]);
  }
};

/**
 * Actualizar experiencia laboral por ID.
 */
export const updateexperiencia_laboral = async (req, res) => {
  try {
    const experiencia_laboral = await updateexperiencia_laboralService(req.params.id, req.body);

    return successResponse(res, {
      id: experiencia_laboral.id,
      empresa: experiencia_laboral.empresa,
      cargo: experiencia_laboral.cargo,
      fecha_ingreso: experiencia_laboral.fecha_ingreso,
      fecha_retiro: experiencia_laboral.fecha_retiro,
      experiencia_docente: experiencia_laboral.experiencia_docente,
      informacion_personal_id: experiencia_laboral.informacion_personal_id
    }, 200);
  } catch (error) {
    console.error("Error al actualizar la experiencia laboral:", error);
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Experiencia laboral no encontrada", 404, [
        { code: "EXPERIENCIA_LABORAL_NOT_FOUND", detail: `ID ${req.params.id}` }
      ]);
    }
    return errorResponse(res, "Error al actualizar la experiencia laboral", 500, [
      { code: "UPDATE_EXPERIENCIA_LABORAL_ERROR", detail: error.message }
    ]);
  }
};

// He eliminado la función `changeexperiencia_laboralStatus` ya que no parece haber un campo de 'estado_id' en la tabla 'experiencia_laboral' que hayas mostrado.