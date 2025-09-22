import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  getCargosService,
  getListCargosService,
  storeCargoService,
  showCargoService,
  updateCargoService,
  changeCargoStatusService
} from "../../../services/v1/cargo.service.js";

/**
 * Controlador para obtener cargos con filtros, orden y paginación usando servicios.
 */
export const getCargos = async (req, res) => {
  try {
    const {
      data,
      meta,
      links
    } = await getCargosService(req);

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
        code: "GET_CARGOS_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const getListCargos = async (req, res) => {
  try {
    const { data, count } = await getListCargosService(req);

    return successResponse(
      res,
      formatJsonApiData(data, ["id", "nombre", "estado"]),
      200,
      { count }
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener la lista de cargos", 500, [
      {
        code: "GET_LIST_CARGOS_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const storeCargo = async (req, res) => {
  try {
    const { nombre, estado, centros } = req.body;

    // Validar que se envíen centros
    if (!centros || !Array.isArray(centros) || centros.length === 0) {
      return errorResponse(res, "Debes asociar al menos un centro al cargo", 400, [
        { code: "CENTROS_REQUIRED", detail: "El campo 'centros' es obligatorio y debe ser un array con al menos un centro." }
      ]);
    }

    const cargo = await storeCargoService({ nombre, estado, centros });

    return successResponse(
      res,
      {
        id: cargo.id,
        nombre: cargo.nombre,
        estado: cargo.estado,
        centros: cargo.centros
      },
      201
    );
  } catch (error) {
    // Validación específica para centros no existentes
    if (error.code === "CENTRO_NOT_FOUND") {
      return errorResponse(res, "Uno o más centros no existen.", 400, [
        { code: "CENTRO_NOT_FOUND", detail: "Verifica que los centros enviados existan." }
      ]);
    }
    // Otros errores
    return errorResponse(res, "Error al crear el cargo", 500, [
      { code: "CREATE_CARGO_ERROR", detail: error.message }
    ]);
  }
};

export const showCargo = async (req, res) => {
  try {
    const cargo = await showCargoService(req.params.id);

    if (!cargo) {
      return errorResponse(res, "No existe un cargo con el ID", 404, [
        {
          code: "CARGO_NOT_FOUND",
          detail: `No existe un cargo con ID ${req.params.id}`,
        },
      ]);
    }

    return successResponse(
      res,
      {
        id: cargo.id,
        nombre: cargo.nombre,
        estado: cargo.estado,
        centros: cargo.centros || []
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Error al obtener el cargo", 500, [
      {
        code: "SHOW_CARGO_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const updateCargo = async (req, res) => {
  try {
    const cargo = await updateCargoService(req.params.id, req.body);

    return successResponse(
      res,
      {
        id: cargo.id,
        nombre: cargo.nombre,
        estado: cargo.estado,
        centros: cargo.centros || []
      },
      200
    );
  } catch (error) {


    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Cargo no encontrado", 404, [
        {
          code: "CARGO_NOT_FOUND",
          detail: `No existe un cargo con ID ${req.params.id}`,
        },
      ]);
    }

    if (error.code === "DUPLICATE_CARGO_NAME") {
      return errorResponse(res, "El nombre ya está en uso", 409, [
        {
          code: error.code,
          detail: error.message,
          field: "nombre"
        },
      ]);
    }

    return errorResponse(res, "Error al actualizar el cargo", 500, [
      {
        code: "UPDATE_CARGO_ERROR",
        detail: error.message,
      },
    ]);
  }
};

export const changeCargoStatus = async (req, res) => {
  try {
    const cargo = await changeCargoStatusService(req.params.id, req.body.estado);

    return successResponse(
      res,
      {
        id: cargo.id,
        nombre: cargo.nombre,
        estado: cargo.estado,
      },
      200
    );
  } catch (error) {


    if (error.code === "NOT_FOUND") {
      return errorResponse(res, "Cargo no encontrado", 404, [
        {
          code: "CARGO_NOT_FOUND",
          detail: error.message,
        },
      ]);
    }

    if (error.code === "CARGO_HAS_CENTROS") {
      return errorResponse(res, "No se puede desactivar", 409, [
        {
          code: "CARGO_HAS_CENTROS",
          detail: error.message,
        },
      ]);
    }

    if (error.code === "CARGO_HAS_USERS") {
      return errorResponse(res, "No se puede desactivar", 409, [
        {
          code: "CARGO_HAS_USERS",
          detail: error.message,
        },
      ]);
    }

    return errorResponse(res, "Error al cambiar el estado del cargo", 500, [
      {
        code: "CHANGE_CARGO_STATUS_ERROR",
        detail: error.message,
      },
    ]);
  }
};