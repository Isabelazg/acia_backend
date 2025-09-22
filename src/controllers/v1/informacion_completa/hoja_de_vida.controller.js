import { errorResponse, successResponse } from "../../../utils/response.util.js";
import { formatJsonApiData } from "../../../utils/formatJsonData.util.js";
import {
  storeInformacionCompletaService,
  obtenerInformacionCompletaService,
  getListinformacion_completaService,
  getListpageinformacion_completaService,
} from "../../../services/v1/hoja_de_vida.service.js";

/**
 * 🔹 Controlador para crear información completa.
 */
export const storeInformacionCompleta = async (req, res) => {
  try {
    const data = await storeInformacionCompletaService(req.body);
    return successResponse(res, data, 201);
  } catch (error) {
    console.error("Error completo en storeInformacionCompleta:", error);

    // 🔹 Error de duplicado (Unique)
    if (error.code === "DUPLICATE_DOCUMENTO") {
      return errorResponse(res, "El documento ya está en uso", 409, [
        { code: error.code, detail: error.message, field: "documento" }
      ]);
    }

    // 🔹 Errores de validación de Sequelize
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
      const errors = error.errors.map((err) => ({
        code: "VALIDATION_ERROR",
        field: err.path,
        message: err.message,
        value: err.value
      }));
      return errorResponse(res, "Error de validación", 422, errors);
    }

    // 🔹 Violación de clave foránea
    if (error.name === "SequelizeForeignKeyConstraintError") {
      const fieldName = error.fields?.[0] || "un campo";
      const tableName = error.table || "una tabla";
      const detailMessage = `El valor para '${fieldName}' no existe en la tabla de referencia '${tableName}'.`;
      return errorResponse(res, "Violación de clave foránea", 409, [
        { code: "FOREIGN_KEY_VIOLATION", detail: detailMessage, field: fieldName }
      ]);
    }

    // 🔹 Otros errores
    return errorResponse(res, "Error al crear la información completa", 500, [
      { code: "CREATE_INFORMACION_COMPLETA_ERROR", detail: error.message }
    ]);
  }
};

/**
 * 🔹 Controlador para obtener una lista COMPLETA sin paginación.
 */
export const getListinformacion_completa = async (req, res) => {
  try {
    const { data, count } = await getListinformacion_completaService();
    return successResponse(
      res,
      formatJsonApiData(data, [
        "id", "documento", "tipo_documentos_id", "ciudad_expedicion_id", "fecha_nacimiento",
        "nombres", "apellidos", "sexo", "direccion_domicilio", "ciudad_domicilio_id",
        "celular_uno", "celular_dos", "correo_personal", "correo_institucional",
        "cargo_actual_id", "tiempo_cargo", "area_id", "foto",
        "centro_id", "created_at", "updated_at",
      ]),
      200, { count }
    );
  } catch (error) {
    console.error("Error en getListinformacion_completa:", error);
    return errorResponse(res, "Error al obtener la lista de informacion completa", 500, [
      { code: "GET_LIST_INFORMACION_COMPLETA_ERROR", detail: error.message }
    ]);
  }
};

/**
 * 🔹 Controlador para obtener una lista PAGINADA con filtros.
 */
export const getListpageinformacion_completa = async (req, res) => {
  try {
    const { data, count } = await getListpageinformacion_completaService(req.query);
    return successResponse(
      res,
      formatJsonApiData(data, [
        "id",
        "documento",
        "tipo_documento", // Objeto con {nombre}
        "ciudad_expedicion", // Objeto con {nombre}
        "fecha_nacimiento",
        "nombres",
        "apellidos",
        "sexo",
        "direccion_domicilio",
        "ciudad_domicilio", // Objeto con {nombre}
        "celular_uno",
        "celular_dos",
        "correo_personal",
        "correo_institucional",
        "cargo_actual", // Objeto con {nombre}
        "tiempo_cargo",
        "area", // Objeto con {nombre}
        "foto",
        "centro", // Objeto con {nombre}
        "formaciones_complementarias", // Objeto con sus campos
        "created_at",
        "updated_at",
      ]),
      200, {
      count,
      page: parseInt(req.query.page),
      limit: parseInt(req.query.limit),
    }
    );
  } catch (error) {
    console.error("Error en getListpageinformacion_completa:", error);
    return errorResponse(res, "Error al obtener la lista paginada de informacion completa", 500, [
      { code: "GET_LIST_PAGINATED_ERROR", detail: error.message }
    ]);
  }
};

/**
 * 🔹 Controlador para obtener información completa por ID.
 */
export const obtenerInformacionCompleta = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await obtenerInformacionCompletaService(id);
    if (!data) {
      return errorResponse(res, "Usuario no encontrado", 404, [
        { code: "NOT_FOUND", detail: `No existe usuario con id ${id}` }
      ]);
    }
    return successResponse(res, data, 200);
  } catch (error) {
    console.error("Error en obtenerInformacionCompleta:", error);
    return errorResponse(res, "Error al obtener la información completa", 500, [
      { code: "GET_ERROR", detail: error.message }
    ]);
  }
};
