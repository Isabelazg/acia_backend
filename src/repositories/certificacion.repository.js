import certificacion from "../models/certificacion.model.js";

/**
 * Crear nueva certificación.
 */
export const storecertificacionRepository = async (data, options = {}) => {
  return await certificacion.create(data, options);
};
