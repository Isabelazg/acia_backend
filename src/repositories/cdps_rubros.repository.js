import CdpsRubros from '../models/cdps_rubros.model.js';

/**
 * Verifica si un rubro está asociado a algún CDP.
 * @param {number} rubroId - ID del rubro a verificar.
 * @returns {Promise<boolean>} - true si está asociado, false si no.
 */
export const checkRubroHasCdpsRepository = async (rubroId) => {
  const count = await CdpsRubros.count({ where: { rubros_id: rubroId } });
  return count > 0;
};
