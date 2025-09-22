import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  getOrdenadoresService,
  getListOrdenadoresService,
  storeOrdenadorService,
  showOrdenadorService,
  showOrdenadorByIdService,
  updateOrdenadorService,
  updateOrdenadorByIdService,
  changeOrdenadorStatusService,
  changeOrdenadorStatusByIdService
} from "../../../services/v1/ordenador.service.js";

/**
 * Controlador para obtener ordenadores con filtros, orden y paginación usando servicios.
 */
export const getOrdenadores = async (req, res) => {
  try {
    const {
      data,
      meta,
      links
    } = await getOrdenadoresService(req);

    // Formatear los datos para incluir la información del cargo y resoluciones
    const formattedData = data.map(ordenador => {
      // Obtener la primera resolución (asumiendo que hay una por ordenador)
      const resolucion = ordenador.resoluciones && ordenador.resoluciones.length > 0
        ? ordenador.resoluciones[0]
        : null;

      return {
        id: ordenador.id,
        documento: ordenador.documento,
        nombres: ordenador.nombres,
        apellidos: ordenador.apellidos,
        lugar_expedicion_id: ordenador.lugar_expedicion_id,
        lugar_domicilio_id: ordenador.lugar_domicilio_id,
        lugar_expedicion: ordenador.lugar_expedicion ? {
          id: ordenador.lugar_expedicion.id,
          nombre: ordenador.lugar_expedicion.nombre
        } : null,
        lugar_domicilio: ordenador.lugar_domicilio ? {
          id: ordenador.lugar_domicilio.id,
          nombre: ordenador.lugar_domicilio.nombre
        } : null,
        sexo: ordenador.sexo,
        correo: ordenador.correo,
        telefono: ordenador.telefono,
        estado: ordenador.estado,
        cargo_id: ordenador.cargo_id,
        cargo: ordenador.cargo ? {
          id: ordenador.cargo.id,
          nombre: ordenador.cargo.nombre,
          estado: ordenador.cargo.estado
        } : null,
        // Campos de resolución
        fecha_resolucion: resolucion?.fecha || null,
        acta_posesion: resolucion?.acta_posesion || null,
        es_encargado: resolucion?.es_encargado || null,
        fecha_posesion: resolucion?.fecha_posesion || null,
        fecha_ingreso: resolucion?.fecha_ingreso || null,
        fecha_retiro: resolucion?.fecha_retiro || null,
        created_at: ordenador.created_at,
        updated_at: ordenador.updated_at
      };
    });

    return successResponse(
      res,
      formattedData,
      200,
      meta,
      links
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener los ordenadores", 500, [
      {
        code: "GET_ORDENADORES_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const getListOrdenadores = async (req, res) => {
  try {
    let { estado, sortBy = "id", order = "ASC" } = req.query;
    if (estado !== undefined) {
      if (estado === "true") estado = true;
      else if (estado === "false") estado = false;
      else estado = undefined;
    }

    const { data, count } = await getListOrdenadoresService(estado, sortBy, order);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "documento", "nombres", "apellidos", "lugar_expedicion_id", "lugar_domicilio_id", "sexo", "correo", "telefono", "estado", "cargo_id"]),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de ordenadores", 500, [
      {
        code: "GET_LIST_ORDENADORES_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const storeOrdenador = async (req, res) => {
  try {
    const ordenador = await storeOrdenadorService(req.body);

    return successResponse(
      res,
      {
        id: ordenador.id,
        documento: ordenador.documento,
        nombres: ordenador.nombres,
        apellidos: ordenador.apellidos,
        lugar_expedicion_id: ordenador.lugar_expedicion_id,
        lugar_domicilio_id: ordenador.lugar_domicilio_id,
        lugar_expedicion: ordenador.lugar_expedicion ? {
          id: ordenador.lugar_expedicion.id,
          nombre: ordenador.lugar_expedicion.nombre
        } : null,
        lugar_domicilio: ordenador.lugar_domicilio ? {
          id: ordenador.lugar_domicilio.id,
          nombre: ordenador.lugar_domicilio.nombre
        } : null,
        sexo: ordenador.sexo,
        correo: ordenador.correo,
        telefono: ordenador.telefono,
        estado: ordenador.estado,
        cargo_id: ordenador.cargo_id,
        cargo: ordenador.cargo ? {
          id: ordenador.cargo.id,
          nombre: ordenador.cargo.nombre,
          estado: ordenador.cargo.estado
        } : null,
        created_at: ordenador.created_at,
        updated_at: ordenador.updated_at
      },
      201
    );
  } catch (error) {
    // Manejar errores de validación específicos
    if (error.code === "VALIDATION_ERROR" || error.code === "DUPLICATE_VALUE") {
      return errorResponse(res, error.message, 400, [
        {
          code: error.code === "DUPLICATE_VALUE" ? "DUPLICATE_VALUE" : error.code,
          field: error.field,
          detail: error.message,
        },
      ]);
    }

    return errorResponse(res, "Error al crear el ordenador", 500, [
      {
        code: "CREATE_ORDENADOR_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const showOrdenador = async (req, res) => {
  try {
    const ordenador = await showOrdenadorService(req.params.documento);

    if (!ordenador) {
      return errorResponse(res, "No existe un ordenador con ese documento", 404, [
        {
          code: "ORDENADOR_NOT_FOUND",
          detail: `No existe un ordenador con documento ${req.params.documento}`,
        },
      ]);
    }

    return successResponse(
      res,
      {
        id: ordenador.id,
        documento: ordenador.documento,
        nombres: ordenador.nombres,
        apellidos: ordenador.apellidos,
        lugar_expedicion_id: ordenador.lugar_expedicion_id,
        lugar_domicilio_id: ordenador.lugar_domicilio_id,
        lugar_expedicion: ordenador.lugar_expedicion ? {
          id: ordenador.lugar_expedicion.id,
          nombre: ordenador.lugar_expedicion.nombre
        } : null,
        lugar_domicilio: ordenador.lugar_domicilio ? {
          id: ordenador.lugar_domicilio.id,
          nombre: ordenador.lugar_domicilio.nombre
        } : null,
        sexo: ordenador.sexo,
        correo: ordenador.correo,
        telefono: ordenador.telefono,
        estado: ordenador.estado,
        cargo_id: ordenador.cargo_id,
        cargo: ordenador.cargo ? {
          id: ordenador.cargo.id,
          nombre: ordenador.cargo.nombre,
          estado: ordenador.cargo.estado
        } : null,
        created_at: ordenador.created_at,
        updated_at: ordenador.updated_at
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener el ordenador", 500, [
      {
        code: "SHOW_ORDENADOR_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const showOrdenadorById = async (req, res) => {
  try {
    const ordenador = await showOrdenadorByIdService(req.params.id);

    if (!ordenador) {
      return errorResponse(res, "No existe un ordenador con ese ID", 404, [
        {
          code: "ORDENADOR_NOT_FOUND",
          detail: `No existe un ordenador con ID ${req.params.id}`,
        },
      ]);
    }

    return successResponse(
      res,
      {
        id: ordenador.id,
        documento: ordenador.documento,
        nombres: ordenador.nombres,
        apellidos: ordenador.apellidos,
        lugar_expedicion_id: ordenador.lugar_expedicion_id,
        lugar_domicilio_id: ordenador.lugar_domicilio_id,
        lugar_expedicion: ordenador.lugar_expedicion ? {
          id: ordenador.lugar_expedicion.id,
          nombre: ordenador.lugar_expedicion.nombre
        } : null,
        lugar_domicilio: ordenador.lugar_domicilio ? {
          id: ordenador.lugar_domicilio.id,
          nombre: ordenador.lugar_domicilio.nombre
        } : null,
        sexo: ordenador.sexo,
        correo: ordenador.correo,
        telefono: ordenador.telefono,
        estado: ordenador.estado,
        cargo_id: ordenador.cargo_id,
        cargo: ordenador.cargo ? {
          id: ordenador.cargo.id,
          nombre: ordenador.cargo.nombre,
          estado: ordenador.cargo.estado
        } : null,
        created_at: ordenador.created_at,
        updated_at: ordenador.updated_at
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener el ordenador", 500, [
      {
        code: "SHOW_ORDENADOR_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const updateOrdenador = async (req, res) => {
  try {
    const ordenador = await updateOrdenadorService(req.params.documento, req.body);

    return successResponse(
      res,
      {
        id: ordenador.id,
        documento: ordenador.documento,
        nombres: ordenador.nombres,
        apellidos: ordenador.apellidos,
        lugar_expedicion_id: ordenador.lugar_expedicion_id,
        lugar_domicilio_id: ordenador.lugar_domicilio_id,
        lugar_expedicion: ordenador.lugar_expedicion ? {
          id: ordenador.lugar_expedicion.id,
          nombre: ordenador.lugar_expedicion.nombre
        } : null,
        lugar_domicilio: ordenador.lugar_domicilio ? {
          id: ordenador.lugar_domicilio.id,
          nombre: ordenador.lugar_domicilio.nombre
        } : null,
        sexo: ordenador.sexo,
        correo: ordenador.correo,
        telefono: ordenador.telefono,
        estado: ordenador.estado,
        cargo_id: ordenador.cargo_id,
        cargo: ordenador.cargo ? {
          id: ordenador.cargo.id,
          nombre: ordenador.cargo.nombre,
          estado: ordenador.cargo.estado
        } : null,
        created_at: ordenador.created_at,
        updated_at: ordenador.updated_at
      },
      200
    );
  } catch {

    // Manejar errores específicos
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Ordenador no encontrado", 404, [
        {
          code: "ORDENADOR_NOT_FOUND",
          detail: `No existe un ordenador con ese documento ${req.params.documento}`,
        },
      ]);
    }

    if (error.code === "VALIDATION_ERROR" || error.code === "DUPLICATE_VALUE") {
      return errorResponse(res, error.message, 400, [
        {
          code: error.code,
          field: error.field,
          detail: error.message,
        },
      ]);
    }

    return errorResponse(res, "Error al actualizar el ordenador", 500, [
      {
        code: "UPDATE_ORDENADOR_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const updateOrdenadorById = async (req, res) => {
  try {
    const ordenador = await updateOrdenadorByIdService(req.params.id, req.body);

    return successResponse(
      res,
      {
        id: ordenador.id,
        documento: ordenador.documento,
        nombres: ordenador.nombres,
        apellidos: ordenador.apellidos,
        lugar_expedicion_id: ordenador.lugar_expedicion_id,
        lugar_domicilio_id: ordenador.lugar_domicilio_id,
        lugar_expedicion: ordenador.lugar_expedicion ? {
          id: ordenador.lugar_expedicion.id,
          nombre: ordenador.lugar_expedicion.nombre
        } : null,
        lugar_domicilio: ordenador.lugar_domicilio ? {
          id: ordenador.lugar_domicilio.id,
          nombre: ordenador.lugar_domicilio.nombre
        } : null,
        sexo: ordenador.sexo,
        correo: ordenador.correo,
        telefono: ordenador.telefono,
        estado: ordenador.estado,
        cargo_id: ordenador.cargo_id,
        cargo: ordenador.cargo ? {
          id: ordenador.cargo.id,
          nombre: ordenador.cargo.nombre,
          estado: ordenador.cargo.estado
        } : null,
        created_at: ordenador.created_at,
        updated_at: ordenador.updated_at
      },
      200
    );
  } catch {

    // Manejar errores específicos
    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Ordenador no encontrado", 404, [
        {
          code: "ORDENADOR_NOT_FOUND",
          detail: `No existe un ordenador con ID ${req.params.id}`,
        },
      ]);
    }

    if (error.code === "VALIDATION_ERROR" || error.code === "DUPLICATE_VALUE") {
      return errorResponse(res, error.message, 400, [
        {
          code: error.code,
          field: error.field,
          detail: error.message,
        },
      ]);
    }

    return errorResponse(res, "Error al actualizar el ordenador", 500, [
      {
        code: "UPDATE_ORDENADOR_ERROR",
        detail: error.message,
      },
    ]);
  }
};

/**
 * Controlador para cambiar el estado de un ordenador por ID.
 */
export const changeOrdenadorStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const ordenador = await changeOrdenadorStatusByIdService(id, estado);

    return successResponse(
      res,
      {
        id: ordenador.id,
        documento: ordenador.documento,
        nombres: ordenador.nombres,
        apellidos: ordenador.apellidos,
        lugar_expedicion_id: ordenador.lugar_expedicion_id,
        lugar_domicilio_id: ordenador.lugar_domicilio_id,
        sexo: ordenador.sexo,
        correo: ordenador.correo,
        telefono: ordenador.telefono,
        estado: ordenador.estado,
        cargo_id: ordenador.cargo_id,
        cargo: ordenador.cargo ? {
          id: ordenador.cargo.id,
          nombre: ordenador.cargo.nombre,
          estado: ordenador.cargo.estado
        } : null,
        created_at: ordenador.created_at,
        updated_at: ordenador.updated_at
      },
      200
    );
  } catch {

    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Ordenador no encontrado", 404, [
        {
          code: "ORDENADOR_NOT_FOUND",
          detail: `No existe un ordenador con ID ${req.params.id}`,
        },
      ]);
    }

    return errorResponse(res, "Error al cambiar el estado del ordenador", 500, [
      {
        code: "CHANGE_ORDENADOR_STATUS_ERROR",
        detail: error.message,
      },
    ]);
  }
};
