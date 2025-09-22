import informacion_previa_contrato from "../models/informacion_previa_contrato.model.js";

/**
 * Crear nueva información previa al contrato.
 */
export const storeinformacion_previa_contratoRepository = async (data, options = {}) => {
  return await informacion_previa_contrato.create(data, options);
};
