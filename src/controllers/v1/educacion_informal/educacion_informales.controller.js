import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  geteducacion_informalService,
  getListeducacion_informalService,
  storeeducacion_informalService,
  storeMultipleEducacionesInformalesService,
  showeducacion_informalService,
  updateeducacion_informalService,
  changeeducacion_informalStatusService
} from "../../../services/v1/educacion_informales.service.js";

/**
 * Obtener las educaciones informales con filtros, orden y paginación.
 */
export const geteducacion_informal = async (req, res) => {
  try {
    const { data, meta, links } = await geteducacion_informalService(req);
    return successResponse(res, data, 200, meta, links);
  } catch (error) {
    return errorResponse(res, "Error al obtener las educaciones informales", 500, [
      { code: "GET_EDUCACION_INFORMAL_ERROR", detail: error.message },
    ]);
  }
};

/**
 * Obtener lista de todas las educaciones informales sin paginación.
 */
export const getListeducacion_informal = async (req, res) => {
  try {
    let { estado, sortBy = "id", order = "ASC" } = req.query;
    if (estado !== undefined) {
      estado = estado === "true" ? true : estado === "false" ? false : undefined;
    }
    const { data, count } = await getListeducacion_informalService(estado, sortBy, order);
    return successResponse(res, formatJsonApiData(data, ["id", "titulo", "titulo_formacion", "institucion", "estado"]), 200, { count });
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de educaciones informales", 500, [
      { code: "GET_LIST_EDUCACION_INFORMAL_ERROR", detail: error.message },
    ]);
  }
};

/**
 * Crear una nueva educación informal individual.
 */
export const storeeducacion_informal = async (req, res) => {
  try {
    const { titulo, tipo_formacion_id, institucion, fecha_inicio, fecha_terminacion, intensidad_horaria, estado_id, informacion_personal_id } = req.body;

    const educacion_informal = await storeeducacion_informalService({
      titulo, tipo_formacion_id, institucion, fecha_inicio, fecha_terminacion, intensidad_horaria, estado_id, informacion_personal_id
    });

    return successResponse(res, educacion_informal, 201);
  } catch (error) {
    console.error("Error al crear la educación informal:", error);
    return errorResponse(res, "Error al crear la educación informal", 500, [
      { code: "CREATE_EDUCACION_INFORMAL_ERROR", detail: error.message }
    ]);
  }
};

/**
 * Crear múltiples educaciones informales.
 */
export const storeMultipleEducaciones = async (req, res) => {
  try {
    const { educaciones } = req.body; // Array de objetos

    if (!Array.isArray(educaciones) || educaciones.length === 0) {
      return errorResponse(res, "Debe enviar un array de educaciones informales válidas", 400, [
        { code: "INVALID_INPUT", detail: "El campo 'educaciones' debe ser un array no vacío." }
      ]);
    }

    const nuevasEducaciones = await storeMultipleEducacionesInformalesService(educaciones);

    return successResponse(res, nuevasEducaciones, 201);
  } catch (error) {
    console.error("Error al crear múltiples educaciones informales:", error);
    return errorResponse(res, "Error al crear múltiples educaciones informales", 500, [
      { code: "STORE_MULTIPLE_EDUCACIONES_ERROR", detail: error.message }
    ]);
  }
};

/**
 * Mostrar educación informal por ID.
 */
export const showeducacion_informal = async (req, res) => {
  try {
    const educacion_informal = await showeducacion_informalService(req.params.id);

    if (!educacion_informal) {
      return errorResponse(res, "No existe una educación informal con el ID", 404, [
        { code: "EDUCACION_INFORMAL_NOT_FOUND", detail: `ID ${req.params.id}` }
      ]);
    }

    return successResponse(res, {
      id: educacion_informal.id,
      titulo: educacion_informal.titulo,
      tipo_formacion_id: educacion_informal.tipo_formacion_id,
      institucion: educacion_informal.institucion,
      fecha_inicio: educacion_informal.fecha_inicio,
      fecha_terminacion: educacion_informal.fecha_terminacion,
      intensidad_horaria: educacion_informal.intensidad_horaria,
      estado_id: educacion_informal.estado_id,
      informacion_personal_id: educacion_informal.informacion_personal_id
    }, 200);
  } catch (error) {
    return errorResponse(res, "Error al obtener la educación informal", 500, [
      { code: "SHOW_EDUCACION_INFORMAL_ERROR", detail: error.message }
    ]);
  }
};

/**
 * Actualizar educación informal por ID.
 */
export const updateeducacion_informal = async (req, res) => {
  try {
    const educacion_informal = await updateeducacion_informalService(req.params.id, req.body);

    return successResponse(res, {
      id: educacion_informal.id,
      titulo: educacion_informal.titulo,
      tipo_formacion_id: educacion_informal.tipo_formacion_id,
      institucion: educacion_informal.institucion,
      fecha_inicio: educacion_informal.fecha_inicio,
      fecha_terminacion: educacion_informal.fecha_terminacion,
      intensidad_horaria: educacion_informal.intensidad_horaria,
      estado_id: educacion_informal.estado_id,
      informacion_personal_id: educacion_informal.informacion_personal_id
    }, 200);
  } catch (error) {
    console.error("Error al actualizar la educación informal:", error);
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Educación informal no encontrada", 404, [
        { code: "EDUCACION_INFORMAL_NOT_FOUND", detail: `ID ${req.params.id}` }
      ]);
    }
    // No hay validación de nombre duplicado en la tabla de educacion informal,
    // por lo que se elimina la verificación DUPLICATE_EDUCACION_INFORMAL_NAME.
    return errorResponse(res, "Error al actualizar la educación informal", 500, [
      { code: "UPDATE_EDUCACION_INFORMAL_ERROR", detail: error.message }
    ]);
  }
};

/**
 * Cambiar estado de educación informal.
 */
export const changeeducacion_informalStatus = async (req, res) => {
  try {
    const educacion_informal = await changeeducacion_informalStatusService(req.params.id, req.body.estado);

    return successResponse(res, {
      id: educacion_informal.id,
      titulo: educacion_informal.titulo,
      tipo_formacion_id: educacion_informal.tipo_formacion_id,
      institucion: educacion_informal.institucion,
      fecha_inicio: educacion_informal.fecha_inicio,
      fecha_terminacion: educacion_informal.fecha_terminacion,
      intensidad_horaria: educacion_informal.intensidad_horaria,
      estado_id: educacion_informal.estado_id,
      informacion_personal_id: educacion_informal.informacion_personal_id
    }, 200);
  } catch (error) {
    console.error("Error al cambiar estado:", error);
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Educación informal no encontrada", 404, [
        { code: "EDUCACION_INFORMAL_NOT_FOUND", detail: error.message }
      ]);
    }
    return errorResponse(res, "Error al cambiar el estado de la educación informal", 500, [
      { code: "CHANGE_EDUCACION_INFORMAL_STATUS_ERROR", detail: error.message }
    ]);
  }
};