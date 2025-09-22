import { getListCoordinadoresRepository } from "../../repositories/coordinador.repository.js";

export const getCoordinadoresByCentroService = async (centros_id, estado, sortBy = "id", order = "ASC") => {
  let estadoFinal = estado;
  if (estado === 'true' || estado === 'activo' || estado === '1') estadoFinal = 1;
  if (estado === 'false' || estado === 'inactivo' || estado === '0') estadoFinal = 0;
  if (estado === undefined || estado === null || estado === 'todos') estadoFinal = undefined;

  return await getListCoordinadoresRepository(estadoFinal, sortBy, order, centros_id);
};
