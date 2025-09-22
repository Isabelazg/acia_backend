import { errorResponse, successResponse } from "../../../utils/response.util.js";
import {
  getCoordinadoresGrupoMixtoService,
  getListCoordinadoresGrupoMixtoService,
  storeCoordinadorGrupoMixtoService,
  showCoordinadorGrupoMixtoService,
  updateCoordinadorGrupoMixtoService,
  changeCoordinadorGrupoMixtoStatusService
} from "../../../services/v1/coordinadoresGrupoMixto.service.js";

export const getCoordinadoresGrupoMixto = async (req, res) => {
  try {
    const { data, meta, links } = await getCoordinadoresGrupoMixtoService(req);
    return successResponse(res, data, 200, meta, links);
  } catch (error) {
    return errorResponse(res, "Error al obtener los coordinadores grupo mixto", 500, [
      { code: "GET_COORDINADORES_GRUPO_MIXTO_ERROR", detail: error.message }
    ]);
  }
};

export const getListCoordinadoresGrupoMixto = async (req, res) => {
  try {
    let { estado, sortBy = "id", order = "ASC" } = req.query;
    if (estado !== undefined) {
      if (estado === "true") estado = true;
      else if (estado === "false") estado = false;
      else estado = undefined;
    }
    const { data, count } = await getListCoordinadoresGrupoMixtoService(estado, sortBy, order);
    return successResponse(
      res,
      formatJsonApiData(data, ["id", "documento", "nombres", "apellidos", "correo", "telefono", "estado"]), // <-- campos correctos
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista", 500, [
      { code: "GET_LIST_COORDINADORES_GRUPO_MIXTO_ERROR", detail: error.message }
    ]);
  }
};

export const storeCoordinadorGrupoMixto = async (req, res) => {
  try {
    const coordinador = await storeCoordinadorGrupoMixtoService(req.body);
    return successResponse(res, {
      id: coordinador.id,
      documento: coordinador.documento,
      nombres: coordinador.nombres,
      apellidos: coordinador.apellidos,
      correo: coordinador.correo,
      telefono: coordinador.telefono,
      estado: coordinador.estado,
    }, 201);
  } catch (error) {
    return errorResponse(res, "Error al crear el coordinador grupo mixto", 500, [
      { code: "CREATE_COORDINADOR_GRUPO_MIXTO_ERROR", detail: error.message }
    ]);
  }
};

export const showCoordinadorGrupoMixto = async (req, res) => {
  try {
    const coordinador = await showCoordinadorGrupoMixtoService(req.params.documento);
    if (!coordinador) {
      return errorResponse(res, "No existe un coordinador grupo mixto con el documento", 404, [
        { code: "COORDINADOR_GRUPO_MIXTO_NOT_FOUND", detail: `No existe un coordinador grupo mixto con documento ${req.params.documento}` }
      ]);
    }
    return successResponse(res, {
      id: coordinador.id,
      documento: coordinador.documento,
      nombres: coordinador.nombres,
      apellidos: coordinador.apellidos,
      correo: coordinador.correo,
      telefono: coordinador.telefono,
      estado: coordinador.estado,
    }, 200);
  } catch (error) {
    return errorResponse(res, "Error al obtener el coordinador grupo mixto", 500, [
      { code: "SHOW_COORDINADOR_GRUPO_MIXTO_ERROR", detail: error.message }
    ]);
  }
};

export const updateCoordinadorGrupoMixto = async (req, res) => {
  try {
    const coordinador = await updateCoordinadorGrupoMixtoService(req.params.documento, req.body);
    return successResponse(res, {
      id: coordinador.id,
      documento: coordinador.documento,
      nombres: coordinador.nombres,
      apellidos: coordinador.apellidos,
      correo: coordinador.correo,
      telefono: coordinador.telefono,
      estado: coordinador.estado,
    }, 200);
  } catch (error) {
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Coordinador grupo mixto no encontrado", 404, [
        { code: "COORDINADOR_GRUPO_MIXTO_NOT_FOUND", detail: `No existe un coordinador grupo mixto con documento ${req.params.documento}` }
      ]);
    }
    return errorResponse(res, "Error al actualizar el coordinador grupo mixto", 500, [
      { code: "UPDATE_COORDINADOR_GRUPO_MIXTO_ERROR", detail: error.message }
    ]);
  }
};

export const changeCoordinadorGrupoMixtoStatus = async (req, res) => {
  try {
    const coordinador = await changeCoordinadorGrupoMixtoStatusService(req.params.documento, req.body.estado);
    return successResponse(res, {
      id: coordinador.id,
      documento: coordinador.documento,
      nombres: coordinador.nombres,
      apellidos: coordinador.apellidos,
      correo: coordinador.correo,
      telefono: coordinador.telefono,
      estado: coordinador.estado,
    }, 200);
  } catch (error) {
    return errorResponse(res, "Error al cambiar el estado", 500, [
      { code: "CHANGE_COORDINADOR_GRUPO_MIXTO_STATUS_ERROR", detail: error.message }
    ]);
  }
};