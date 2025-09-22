import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  getCdpsService,
  getListCdpsService,
  storeCdpService,
  showCdpService,
  updateCdpService,
  getDependenciasByRubrosService,
  validateCodigoService,
  getDependenciasByCdpService
} from "../../../services/v1/cdp.service.js";

export const getCdps = async (req, res) => {
  try {
    const { data, meta, links } = await getCdpsService(req);
    return successResponse(res, data, 200, meta, links);
  } catch (error) {
    return errorResponse(res, "Error al obtener los CDP", 500, [
      { code: "GET_CDPS_ERROR", detail: error.message }
    ]);
  }
};

export const getListCdps = async (req, res) => {
  try {
    const { data, count } = await getListCdpsService(req);
    return successResponse(
      res,
      formatJsonApiData(data, ["id", "codigo", "descripcion", "fecha", "valor", "vigencia", "quien_expide_id"]),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de CDP", 500, [
      { code: "GET_LIST_CDPS_ERROR", detail: error.message }
    ]);
  }
};

export const storeCdp = async (req, res) => {
  try {
    const cdp = await storeCdpService(req.body);
    return successResponse(res, {
      id: cdp.id,
      codigo: cdp.codigo,
      descripcion: cdp.descripcion,
      fecha: cdp.fecha,
      valor: cdp.valor,
      vigencia: cdp.vigencia,
      fuente_recurso_id: cdp.fuente_recurso_id,
      quien_expide_id: cdp.quien_expide_id,
      centro_id: cdp.centro_id,
      rubro_ids: cdp.rubros.map(r => r.id),
      dependencias: cdp.dependencias || []
    }, 201);
  } catch (error) {
    return errorResponse(res, "Error al crear el CDP", error.status || 500, [
      { code: "CREATE_CDP_ERROR", detail: error.message }
    ]);
  }
};

export const showCdp = async (req, res) => {
  try {
    const cdp = await showCdpService(req.params.codigo);
    if (!cdp) {
      return errorResponse(res, "No existe un CDP con ese número", 404, [
        { code: "CDP_NOT_FOUND", detail: `No existe un CDP con número ${req.params.codigo}` }
      ]);
    }

    // Mapear la respuesta para incluir todas las relaciones
    const response = {
      id: cdp.id,
      codigo: cdp.codigo,
      descripcion: cdp.descripcion,
      fecha: cdp.fecha,
      valor: cdp.valor,
      vigencia: cdp.vigencia,
      quien_expide_id: cdp.quien_expide_id,
      fuente_recurso_id: cdp.fuente_recurso_id,
      centro_id: cdp.centro_id,
      // Incluir relaciones completas
      centro: cdp.centro ? {
        id: cdp.centro.id,
        nombre: cdp.centro.nombre
      } : null,
      fuente_recurso: cdp.fuente_recurso ? {
        id: cdp.fuente_recurso.id,
        nombre: cdp.fuente_recurso.nombre
      } : null,
      quien_expide: cdp.quien_expide ? {
        id: cdp.quien_expide.id,
        documento: cdp.quien_expide.documento,
        nombres: cdp.quien_expide.nombres,
        apellidos: cdp.quien_expide.apellidos,
        correo: cdp.quien_expide.correo
      } : null,
      rubros: cdp.rubros ? cdp.rubros.map(rubro => ({
        id: rubro.id,
        descripcion: rubro.descripcion,
        codigo_rubro_id: rubro.codigo_rubro_id,
        // Incluir datos de la tabla intermedia
        CdpsRubros: rubro.CdpsRubros ? {
          valor: rubro.CdpsRubros.valor,
          fuente_recurso_id: rubro.CdpsRubros.fuente_recurso_id
        } : null,
        // Incluir relación con código de rubro
        codigoRubro: rubro.codigoRubro ? {
          id: rubro.codigoRubro.id,
          codigo: rubro.codigoRubro.codigo,
          dependencia_id: rubro.codigoRubro.dependencia_id,
          dependencia: rubro.codigoRubro.dependencia ? {
            id: rubro.codigoRubro.dependencia.id,
            nombre: rubro.codigoRubro.dependencia.nombre
          } : null
        } : null
      })) : [],
      created_at: cdp.created_at,
      updated_at: cdp.updated_at
    };

    return successResponse(res, response, 200);
  } catch (error) {
    return errorResponse(res, "Error al obtener el CDP", 500, [
      { code: "SHOW_CDP_ERROR", detail: error.message }
    ]);
  }
};

export const updateCdp = async (req, res) => {
  try {
    const cdp = await updateCdpService(req.params.codigo, req.body);
    return successResponse(res, {
      id: cdp.id,
      codigo: cdp.codigo,
      descripcion: cdp.descripcion,
      fecha: cdp.fecha,
      valor: cdp.valor,
      vigencia: cdp.vigencia,
      quien_expide_id: cdp.quien_expide_id
    }, 200);
  } catch (error) {
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "CDP no encontrado", 404, [
        { code: "CDP_NOT_FOUND", detail: `No existe un CDP con número ${req.params.codigo}` }
      ]);
    }
    if (error.code === "CDP_IN_USE") {
      return errorResponse(res, error.message, 400, [
        { code: "CDP_IN_USE", detail: error.message }
      ]);
    }
    return errorResponse(res, "Error al actualizar el CDP", 500, [
      { code: "UPDATE_CDP_ERROR", detail: error.message }
    ]);
  }
};

export const getDependenciasByRubros = async (req, res) => {
  try {
    // Aceptar tanto 'rubros' como 'rubroIds' para compatibilidad
    const { rubros, rubroIds } = req.body;
    const idsToProcess = rubroIds || rubros;

    if (!idsToProcess || !Array.isArray(idsToProcess)) {
      return errorResponse(res, "Se requiere un array de IDs de rubros", 400, [
        { code: "INVALID_RUBROS", detail: "El campo 'rubroIds' o 'rubros' debe ser un array de IDs" }
      ]);
    }

    if (idsToProcess.length === 0) {
      return successResponse(res, { dependencias: [] }, 200);
    }

    const dependencias = await getDependenciasByRubrosService(idsToProcess);

    return successResponse(res, { dependencias }, 200);
  } catch {
    return errorResponse(res, "Error al obtener las dependencias", 500, [
      { code: "GET_DEPENDENCIAS_ERROR", detail: error.message }
    ]);
  }
};

export const validateCodigo = async (req, res) => {
  try {
    const { codigo, excludeId } = req.query;

    if (!codigo) {
      return errorResponse(res, "Código es requerido", 400, [
        { code: "CODIGO_REQUIRED", detail: "El parámetro código es obligatorio" }
      ]);
    }

    const result = await validateCodigoService(codigo, excludeId);

    // El servicio devuelve { isValid, message }, pero necesitamos { exists }
    const exists = !result.isValid;

    return successResponse(res, { exists }, 200);
  } catch (error) {
    return errorResponse(res, "Error al validar código", 500, [
      { code: "VALIDATE_CODIGO_ERROR", detail: error.message }
    ]);
  }
};

/**
 * Obtiene las dependencias asociadas a un CDP específico
 */
export const getDependenciasByCdp = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, "ID del CDP es requerido", 400, [
        { code: "CDP_ID_REQUIRED", detail: "El parámetro ID es obligatorio" }
      ]);
    }

    const dependencias = await getDependenciasByCdpService(id);

    return successResponse(res, { dependencias }, 200);
  } catch (error) {
    if (error.status === 404) {
      return errorResponse(res, error.message, 404, [
        { code: "CDP_NOT_FOUND", detail: error.message }
      ]);
    }

    return errorResponse(res, "Error al obtener dependencias del CDP", 500, [
      { code: "GET_DEPENDENCIAS_BY_CDP_ERROR", detail: error.message }
    ]);
  }
};