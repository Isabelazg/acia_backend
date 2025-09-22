import { Op } from "sequelize";
import Ordenador from "../models/ordenador.model.js";
import Resolucion from "../models/resolucion.model.js";
import { Cargo, Ciudad } from "../models/index.js";

/**
 * Helper function para obtener los includes comunes de ordenador
 */
const getOrdenadorIncludes = () => [
  {
    model: Cargo,
    as: 'cargo',
    attributes: ['id', 'nombre', 'estado']
  },
  {
    model: Ciudad,
    as: 'lugar_expedicion',
    attributes: ['id', 'nombre']
  },
  {
    model: Ciudad,
    as: 'lugar_domicilio',
    attributes: ['id', 'nombre']
  },
  {
    model: Resolucion,
    as: 'resoluciones',
    attributes: ['id', 'fecha', 'acta_posesion', 'es_encargado', 'fecha_posesion', 'fecha_ingreso', 'fecha_retiro'],
    required: false
  }
];

/**
 * Repositorio para obtener ordenadores con filtros, orden y paginación.
 */
export const getOrdenadoresRepository = async ({
  id,
  documento,
  nombres,
  apellidos,
  lugar_expedicion_id,
  lugar_domicilio_id,
  sexo,
  correo,
  telefono,
  estado,
  cargo_id,
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  const whereClause = {};

  if (id) {
    whereClause.id = { [Op.eq]: id };
  }
  if (documento) {
    whereClause.documento = { [Op.like]: `%${documento}%` };
  }
  if (nombres) {
    whereClause.nombres = { [Op.like]: `%${nombres}%` };
  }
  if (apellidos) {
    whereClause.apellidos = { [Op.like]: `%${apellidos}%` };
  }
  if (lugar_expedicion_id) {
    whereClause.lugar_expedicion_id = { [Op.eq]: lugar_expedicion_id };
  }
  if (lugar_domicilio_id) {
    whereClause.lugar_domicilio_id = { [Op.eq]: lugar_domicilio_id };
  }
  if (sexo !== undefined) {
    whereClause.sexo = { [Op.eq]: sexo };
  }
  if (correo) {
    whereClause.correo = { [Op.like]: `%${correo}%` };
  }
  if (telefono) {
    whereClause.telefono = { [Op.like]: `%${telefono}%` };
  }
  if (estado !== undefined) {
    whereClause.estado = { [Op.eq]: estado };
  }
  if (cargo_id) {
    whereClause.cargo_id = { [Op.eq]: cargo_id };
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Ordenador.findAndCountAll({
    where: whereClause,
    include: getOrdenadorIncludes(),
    order: [[sortBy, order]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return {
    data: rows,
    count,
  };
};

/**
 * Repositorio para la lista de ordenadores.
 */
export const getListOrdenadoresRepository = async (estado, sortBy = "id", order = "ASC") => {
  const whereClause = {};

  if (estado !== undefined) {
    whereClause.estado = { [Op.eq]: estado };
  }

  const { count, rows } = await Ordenador.findAndCountAll({
    where: whereClause,
    include: getOrdenadorIncludes(),
    order: [[sortBy, order]],
  });

  return {
    data: rows,
    count,
  };
};

/**
 * Buscar un ordenador por documento.
 */
export const showOrdenadorRepository = async (documento) => {
  return await Ordenador.findOne({
    where: { documento: documento },
    include: getOrdenadorIncludes()
  });
};

/**
 * Buscar un ordenador por ID.
 */
export const showOrdenadorByIdRepository = async (id) => {
  return await Ordenador.findOne({
    where: { id: id },
    include: getOrdenadorIncludes()
  });
};

/**
 * Actualizar un ordenador por ID.
 */
export const updateOrdenadorByIdRepository = async (id, data) => {
  const ordenador = await Ordenador.findOne({
    where: { id: id },
    include: getOrdenadorIncludes()
  });
  if (!ordenador) return null;

  // Agregar timestamp de actualización
  const updateData = {
    ...data,
    updated_at: new Date()
  };

  await ordenador.update(updateData);
  await ordenador.reload({
    include: getOrdenadorIncludes()
  });
  return ordenador;
};

/**
 * Crear un nuevo ordenador.
 */
export const storeOrdenadorRepository = async (data) => {
  const nuevoOrdenador = await Ordenador.create(data);

  // Recargar el ordenador con la relación del cargo
  await nuevoOrdenador.reload({
    include: getOrdenadorIncludes()
  });

  return nuevoOrdenador;
};

/**
 * Actualizar un ordenador por documento.
 */
export const updateOrdenadorRepository = async (documento, data) => {
  const ordenador = await Ordenador.findOne({
    where: { documento: documento },
    include: getOrdenadorIncludes()
  });
  if (!ordenador) return null;

  // Agregar timestamp de actualización
  const updateData = {
    ...data,
    updated_at: new Date()
  };

  await ordenador.update(updateData);
  await ordenador.reload({
    include: getOrdenadorIncludes()
  });
  return ordenador;
};

/**
 * Cambiar el estado de un ordenador por documento.
 */
export const changeOrdenadorStatusRepository = async (documento, estado) => {
  const ordenador = await Ordenador.findOne({
    where: { documento: documento },
    include: getOrdenadorIncludes()
  });
  if (!ordenador) return null;

  const updateData = {
    estado: estado,
    updated_at: new Date()
  };

  await ordenador.update(updateData);
  await ordenador.reload({
    include: getOrdenadorIncludes()
  });
  return ordenador;
};

/**
 * Cambiar el estado de un ordenador por ID.
 */
export const changeOrdenadorStatusByIdRepository = async (id, estado) => {
  const ordenador = await Ordenador.findOne({
    where: { id: id },
    include: getOrdenadorIncludes()
  });
  if (!ordenador) return null;

  const updateData = {
    estado: estado,
    updated_at: new Date()
  };

  await ordenador.update(updateData);
  await ordenador.reload({
    include: getOrdenadorIncludes()
  });
  return ordenador;
};

