// src/utils/response.util.js
/**
 * Envía una respuesta JSON de éxito bajo el estándar JSON:API,
 * permitiendo datos directos y links/metadatos opcionales.
 * @param {Response} res - Objeto response de Express.
 * @param {any} data - Datos a retornar (array u objeto).
 * @param {number} [code=200] - Código de estado HTTP.
 * @param {object} [meta] - Información adicional opcional.
 * @param {object} [links] - Links de paginación u otros (opcional).
 */
export const successResponse = (res, data, code = 200, meta = undefined, links = undefined) => {
  const response = { data };
  if (meta) response.meta = meta;
  if (links) response.links = links;
  return res.status(code).json(response);
};

/**
 * Envía una respuesta JSON de error bajo el estándar JSON:API.
 * @param {Response} res - Objeto response de Express.
 * @param {string} [title='Error'] - Título del error.
 * @param {number} [code=500] - Código de estado HTTP.
 * @param {object|array} [errors=null] - Detalles adicionales del error.
 */
export const errorResponse = (res, title = 'Error', code = 500, errors = null) => {
  const formatEntry = (e) => {
    // e puede ser null, string, Error u objeto con propiedades detail/code/field
    let detail;
    if (typeof e === 'string') {
      detail = e;
    } else if (!e) {
      detail = '';
    } else if (typeof e === 'object') {
      detail = e.detail ?? e.message ?? e.msg ?? null;
      // Si viene de express-validator (path/msg), construir un detalle legible
      if (!detail && (e.path || e.param) && e.msg) {
        detail = `${e.path || e.param}: ${e.msg}`;
      }
      if (!detail) {
        try {
          detail = JSON.stringify(e);
        } catch (err) {
          detail = String(e);
        }
      }
    } else {
      detail = String(e);
    }

    const entry = {
      status: String(code),
      title,
      detail,
    };

    if (e && typeof e === 'object') {
      if (e.code) entry.code = e.code;
      // Exponer campo cuando venga como 'field' o 'path'/'param' del validador
      if (e.field) entry.field = e.field;
      else if (e.path) entry.field = e.path;
      else if (e.param) entry.field = e.param;
    }

    return entry;
  };

  const response = {
    errors: Array.isArray(errors)
      ? errors.map(formatEntry)
      : [formatEntry(errors)],
  };

  return res.status(code).json(response);
};