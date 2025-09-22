import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  geteducacion_formalService,
  getListeducacion_formalService,
  storeeducacion_formalService,
  storeMultipleEducacionesService,
  showeducacion_formalService,
  updateeducacion_formalService,
  changeeducacion_formalStatusService
} from "../../../services/v1/educacion_formal.service.js";

/**
 * Obtener las educaciones formales con filtros, orden y paginación.
 */
export const geteducacion_formal = async (req, res) => {
  try {
    const { data, meta, links } = await geteducacion_formalService(req);
    return successResponse(res, data, 200, meta, links);
  } catch (error) {
    return errorResponse(res, "Error al obtener las educaciones formales", 500, [
      { code: "GET_EDUCACION_FORMAL_ERROR", detail: error.message },
    ]);
  }
};

/**
 * Obtener lista de todas las educaciones formales sin paginación.
 */
export const getListeducacion_formal = async (req, res) => {
  try {
    let { estado, sortBy = "id", order = "ASC" } = req.query;
    if (estado !== undefined) {
      estado = estado === "true" ? true : estado === "false" ? false : undefined;
    }
    const { data, count } = await getListeducacion_formalService(estado, sortBy, order);
    return successResponse(res, formatJsonApiData(data, ["id", "nombre", "estado"]), 200, { count });
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de educaciones formales", 500, [
      { code: "GET_LIST_EDUCACION_FORMAL_ERROR", detail: error.message },
    ]);
  }
};

/**
 * Crear una nueva educación formal individual.
 */
export const storeeducacion_formal = async (req, res) => {
  try {
    const { nombre, nivel_formacion_id, titulo, institucion, numero_semestres, fecha_inicio, fecha_terminacion, estado_id, informacion_personal_id } = req.body;

    const educacion_formal = await storeeducacion_formalService({
      nombre, nivel_formacion_id, titulo, institucion, numero_semestres, fecha_inicio, fecha_terminacion, estado_id, informacion_personal_id
    });

    return successResponse(res, educacion_formal, 201);
  } catch (error) {
    console.error("Error al crear la educación formal:", error);
    return errorResponse(res, "Error al crear la educación formal", 500, [
      { code: "CREATE_EDUCACION_FORMAL_ERROR", detail: error.message }
    ]);
  }
};

/**
 * Crear múltiples educaciones formales.
 */
export const storeMultipleEducaciones = async (req, res) => {
  try {
    const { educaciones } = req.body; // Array de objetos

    if (!Array.isArray(educaciones) || educaciones.length === 0) {
      return errorResponse(res, "Debe enviar un array de educaciones válidas", 400, [
        { code: "INVALID_INPUT", detail: "El campo 'educaciones' debe ser un array no vacío." }
      ]);
    }

    const nuevasEducaciones = await storeMultipleEducacionesService(educaciones);

    return successResponse(res, nuevasEducaciones, 201);
  } catch (error) {
    console.error("Error al crear múltiples educaciones:", error);
    return errorResponse(res, "Error al crear múltiples educaciones", 500, [
      { code: "STORE_MULTIPLE_EDUCACIONES_ERROR", detail: error.message }
    ]);
  }
};

/**
 * Mostrar educación formal por ID.
 */
export const showeducacion_formal = async (req, res) => {
  try {
    const educacion_formal = await showeducacion_formalService(req.params.id);

    if (!educacion_formal) {
      return errorResponse(res, "No existe una educación formal con el ID", 404, [
        { code: "EDUCACION_FORMAL_NOT_FOUND", detail: `ID ${req.params.id}` }
      ]);
    }

    return successResponse(res, {
      id: educacion_formal.id,
      nivel_formacion_id: educacion_formal.nivel_formacion_id,
      titulo: educacion_formal.titulo,
      institucion: educacion_formal.institucion,
      numero_semestres: educacion_formal.numero_semestres,
      fecha_inicio: educacion_formal.fecha_inicio,
      fecha_terminacion: educacion_formal.fecha_terminacion,
      estado_id: educacion_formal.estado_id,
      informacion_personal_id: educacion_formal.informacion_personal_id
    }, 200);
  } catch (error) {
    return errorResponse(res, "Error al obtener la educación formal", 500, [
      { code: "SHOW_EDUCACION_FORMAL_ERROR", detail: error.message }
    ]);
  }
};

/**
 * Actualizar educación formal por ID.
 */
export const updateeducacion_formal = async (req, res) => {
  try {
    const educacion_formal = await updateeducacion_formalService(req.params.id, req.body);

    return successResponse(res, {
      id: educacion_formal.id,
      nivel_formacion_id: educacion_formal.nombre,
      titulo: educacion_formal.estado,
      institucion: educacion_formal.institucion,
      numero_semestres: educacion_formal.numero_semestres,
      fecha_inicio: educacion_formal.fecha_inicio,
      fecha_terminacion: educacion_formal.fecha_terminacion,
      estado_id: educacion_formal.estado_id,
      informacion_personal_id: educacion_formal.informacion_personal_id
    }, 200);
  } catch (error) {
    console.error("Error al actualizar la educación formal:", error);
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Educación formal no encontrada", 404, [
        { code: "EDUCACION_FORMAL_NOT_FOUND", detail: `ID ${req.params.id}` }
      ]);
    }
    if (error.code === "DUPLICATE_EDUCACION_FORMAL_NAME") {
      return errorResponse(res, "El nombre ya está en uso", 409, [
        { code: error.code, detail: error.message, field: "nombre" }
      ]);
    }
    return errorResponse(res, "Error al actualizar la educación formal", 500, [
      { code: "UPDATE_EDUCACION_FORMAL_ERROR", detail: error.message }
    ]);
  }
};

/**
 * Cambiar estado de educación formal.
 */
export const changeeducacion_formalStatus = async (req, res) => {
  try {
    const educacion_formal = await changeeducacion_formalStatusService(req.params.id, req.body.estado);

    return successResponse(res, {
      id: educacion_formal.id,
      nivel_formacion_id: educacion_formal.nombre,
      titulo: educacion_formal.estado,
      institucion: educacion_formal.institucion,
      numero_semestres: educacion_formal.numero_semestres,
      fecha_inicio: educacion_formal.fecha_inicio,
      fecha_terminacion: educacion_formal.fecha_terminacion,
      estado_id: educacion_formal.estado_id,
      informacion_personal_id: educacion_formal.informacion_personal_id
    }, 200);
  } catch (error) {
    console.error("Error al cambiar estado:", error);
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Tipo minuta no encontrado", 404, [
        { code: "EDUCACION_FORMAL_NOT_FOUND", detail: error.message }
      ]);
    }
    if (error.code === "EDUCACION_FORMAL_HAS_AUTORIZACIONES") {
      return errorResponse(res, "No se puede desactivar", 409, [
        { code: "EDUCACION_FORMAL_HAS_AUTORIZACIONES", detail: error.message }
      ]);
    }
    return errorResponse(res, "Error al cambiar el estado del tipo minuta", 500, [
      { code: "CHANGE_EDUCACION_FORMAL_STATUS_ERROR", detail: error.message }
    ]);
  }
};
