import { Op } from "sequelize";
import registros_presupuestales from "../models/registros_presupuestales.model.js";

/**
 * Obtener todos los registros presupuestales con filtros, orden y paginación.
 */
export const getRegistrosPresupuestalesRepository = async ({
  id,
  numero_rp,
  fecha_rp,
  objeto_contrato,
  valor_total,
  saldo_disponible,
  estado_id,
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  const whereClause = {};
  if (id) whereClause.id = id;
  if (numero_rp) whereClause.numero_rp = { [Op.like]: `%${numero_rp}%` };
  if (fecha_rp) whereClause.fecha_rp = fecha_rp;
  if (objeto_contrato) whereClause.objeto_contrato = { [Op.like]: `%${objeto_contrato}%` };
  if (valor_total) whereClause.valor_total = valor_total;
  if (saldo_disponible) whereClause.saldo_disponible = saldo_disponible;
  if (estado_id !== undefined) whereClause.estado_id = estado_id;

  const offset = (page - 1) * limit;

  const { count, rows } = await registros_presupuestales.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return { data: rows, count };
};

/**
 * Obtener lista de registros presupuestales (sin paginación).
 */
export const getListRegistrosPresupuestalesRepository = async (estado_id, sortBy = "id", order = "ASC") => {
  const whereClause = {};
  if (estado_id !== undefined) whereClause.estado_id = estado_id;

  const { count, rows } = await registros_presupuestales.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return { data: rows, count };
};

/**
 * Buscar un registro presupuestal por ID.
 */
export const showRegistroPresupuestalRepository = async (id) => {
  return await registros_presupuestales.findOne({ where: { id } });
};

/**
 * Crear un nuevo registro presupuestal.
 */
export const storeRegistroPresupuestalRepository = async (data) => {
  return await registros_presupuestales.create(data);
};

/**
 * Crear múltiples registros presupuestales a la vez.
 */
export const storeMultipleRegistrosPresupuestalesRepository = async (registros) => {
  return await registros_presupuestales.bulkCreate(registros);
};

/**
 * Actualizar un registro presupuestal por ID.
 */
export const updateRegistroPresupuestalRepository = async (id, data) => {
  const registro = await registros_presupuestales.findOne({ where: { id } });
  if (!registro) return null;
  await registro.update(data);
  await registro.reload();
  return registro;
};

/**
 * Eliminar un registro presupuestal por ID.
 */
export const deleteRegistroPresupuestalRepository = async (id) => {
  const registro = await registros_presupuestales.findOne({ where: { id } });
  if (!registro) return null;
  await registro.destroy();
  return true;
};

/**
 * Buscar un registro presupuestal por número RP, excluyendo un ID específico.
 * (Evita duplicados al actualizar).
 */
export const findRegistroPresupuestalByNumeroExcludingIdRepository = async (numero_rp, idToExclude) => {
  return await registros_presupuestales.findOne({
    where: {
      numero_rp,
      id: {
        [Op.ne]: idToExclude
      }
    }
  });
};

/**
 * Buscar un registro presupuestal por número RP exacto.
 */
export const findRegistroPresupuestalByNumeroRepository = async (numero_rp) => {
  return await registros_presupuestales.findOne({
    where: { numero_rp }
  });
};

/**
 * Buscar múltiples registros repetidos por número RP.
 */
export const findDuplicatedRegistrosPresupuestalesRepository = async (registros) => {
  const orConditions = registros.map(r => ({
    numero_rp: r.numero_rp
  }));

  return await registros_presupuestales.findAll({
    where: {
      [Op.or]: orConditions
    }
  });
};
