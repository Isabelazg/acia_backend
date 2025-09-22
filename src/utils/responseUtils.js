/**
 * Respuesta exitosa estándar
 * @param {Object} res - Objeto response de Express
 * @param {*} data - Datos a devolver
 * @param {string} message - Mensaje de éxito
 * @param {number} statusCode - Código de estado HTTP
 * @returns {Object} - Respuesta JSON
 */
export const successResponse = (res, data, message = 'Operación exitosa', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Respuesta de error estándar
 * @param {Object} res - Objeto response de Express
 * @param {string} message - Mensaje de error
 * @param {number} statusCode - Código de estado HTTP
 * @param {*} details - Detalles adicionales del error
 * @returns {Object} - Respuesta JSON de error
 */
export const errorResponse = (res, message = 'Error interno del servidor', statusCode = 500, details = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString(),
  };

  if (details) {
    response.details = details;
  }

  if (process.env.NODE_ENV === 'development' && statusCode >= 500) {
    response.stack = new Error(message).stack;
  }

  return res.status(statusCode).json(response);
};

/**
 * Respuesta de validación de errores
 * @param {Object} res - Objeto response de Express
 * @param {Array|Object} errors - Errores de validación
 * @param {string} message - Mensaje de error
 * @returns {Object} - Respuesta JSON de errores de validación
 */
export const validationErrorResponse = (res, errors, message = 'Errores de validación') => {
  return res.status(400).json({
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Respuesta paginada
 * @param {Object} res - Objeto response de Express
 * @param {*} data - Datos a devolver
 * @param {Object} pagination - Información de paginación
 * @param {string} message - Mensaje de éxito
 * @returns {Object} - Respuesta JSON paginada
 */
export const paginatedResponse = (res, data, pagination, message = 'Datos obtenidos exitosamente') => {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages: Math.ceil(pagination.total / pagination.limit),
      hasNext: pagination.page < Math.ceil(pagination.total / pagination.limit),
      hasPrev: pagination.page > 1,
    },
    timestamp: new Date().toISOString(),
  });
};

/**
 * Respuesta de recurso no encontrado
 * @param {Object} res - Objeto response de Express
 * @param {string} resource - Nombre del recurso
 * @returns {Object} - Respuesta JSON de recurso no encontrado
 */
export const notFoundResponse = (res, resource = 'Recurso') => {
  return errorResponse(res, `${resource} no encontrado`, 404);
};

/**
 * Respuesta de no autorizado
 * @param {Object} res - Objeto response de Express
 * @param {string} message - Mensaje personalizado
 * @returns {Object} - Respuesta JSON de no autorizado
 */
export const unauthorizedResponse = (res, message = 'No autorizado') => {
  return errorResponse(res, message, 401);
};

/**
 * Respuesta de prohibido/sin permisos
 * @param {Object} res - Objeto response de Express
 * @param {string} message - Mensaje personalizado
 * @returns {Object} - Respuesta JSON de prohibido
 */
export const forbiddenResponse = (res, message = 'No tienes permisos para realizar esta acción') => {
  return errorResponse(res, message, 403);
};

/**
 * Respuesta de conflicto
 * @param {Object} res - Objeto response de Express
 * @param {string} message - Mensaje de conflicto
 * @returns {Object} - Respuesta JSON de conflicto
 */
export const conflictResponse = (res, message = 'Conflicto con el estado actual del recurso') => {
  return errorResponse(res, message, 409);
};

/**
 * Respuesta de tipo de media no soportado
 * @param {Object} res - Objeto response de Express
 * @param {string} message - Mensaje personalizado
 * @returns {Object} - Respuesta JSON de tipo no soportado
 */
export const unsupportedMediaResponse = (res, message = 'Tipo de archivo no soportado') => {
  return errorResponse(res, message, 415);
};

/**
 * Respuesta de entidad demasiado grande
 * @param {Object} res - Objeto response de Express
 * @param {string} message - Mensaje personalizado
 * @returns {Object} - Respuesta JSON de entidad muy grande
 */
export const payloadTooLargeResponse = (res, message = 'El archivo es demasiado grande') => {
  return errorResponse(res, message, 413);
};

/**
 * Respuesta genérica para manejo de errores async
 * @param {Function} fn - Función async a ejecutar
 * @returns {Function} - Middleware de Express
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};