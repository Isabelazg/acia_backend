import informacion_personal from "../models/hoja_de_vida.model.js";
import educacion_formal from "../models/educacion_formal.model.js";
import educacion_informal from "../models/educacion_informales.model.js";
import certificacion from "../models/certificacion.model.js";
import experiencia_laboral from "../models/experiencia_laboral.model.js";
import informacion_previa_contrato from "../models/informacion_previa_contrato.model.js";

/**
 * Guardar informacion personal
 */
export const storeInformacionPersonal = async (data, options = {}) => {
  return await informacion_personal.create(data, options);
};

/**
 * Guardar educación formal
 */
export const storeEducacionFormal = async (data, options = {}) => {
  return await educacion_formal.create(data, options);
};

/**
 * Guardar educación informal
 */
export const storeEducacionInformal = async (data, options = {}) => {
  return await educacion_informal.create(data, options);
};

/**
 * Guardar certificación
 */
export const storeCertificacion = async (data, options = {}) => {
  return await certificacion.create(data, options);
};

/**
 * Guardar experiencia laboral
 */
export const storeExperienciaLaboral = async (data, options = {}) => {
  return await experiencia_laboral.create(data, options);
};

/**
 * Guardar información previa al contrato
 */
export const storeInformacionPreviaContrato = async (data, options = {}) => {
  return await informacion_previa_contrato.create(data, options);
};
