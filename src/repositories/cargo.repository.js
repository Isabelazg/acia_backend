import { Op } from "sequelize";
import sequelize from "../config/db.config.js";
import Cargo from "../models/cargo.model.js";
import Centro from "../models/centro.model.js";
import CargoCentro from "../models/cargoCentro.model.js";
// Importar las asociaciones
import "../models/index.js";

/**
 * Repositorio para obtener cargos con filtros, orden y paginación.
 */
export const getCargosRepository = async ({
  id,
  nombre,
  estado,
  centro_filtro,
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  const whereClause = {};

  if (id) {
    whereClause.id = { [Op.eq]: id };
  }
  if (nombre) {
    whereClause.nombre = { [Op.like]: `%${nombre}%` };
  }
  if (estado !== undefined) {
    whereClause.estado = { [Op.eq]: estado };
  }

  // Aplicar filtro por centro si se proporciona (mostrar cargos del centro + cargos sin centro)
  if (centro_filtro) {
    whereClause.id = {
      [Op.or]: [
        // Cargos asignados al centro específico
        {
          [Op.in]: sequelize.literal(`
            (SELECT cargo_id FROM cargo_centro WHERE centro_id = ${parseInt(centro_filtro)})
          `)
        },
        // Cargos que NO están asignados a ningún centro (globales)
        {
          [Op.notIn]: sequelize.literal(`
            (SELECT DISTINCT cargo_id FROM cargo_centro)
          `)
        }
      ]
    };
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Cargo.findAndCountAll({
    where: whereClause,
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
 * Repositorio para la lista de cargos.
 */
export const getListCargosRepository = async (estado, sortBy = "id", order = "ASC", centro_filtro = null) => {
  const whereClause = {};

  if (estado !== undefined) {
    whereClause.estado = { [Op.eq]: estado };
  }

  // Aplicar filtro por centro si se proporciona (mostrar cargos del centro + cargos sin centro)
  if (centro_filtro) {
    whereClause.id = {
      [Op.or]: [
        // Cargos asignados al centro específico
        {
          [Op.in]: sequelize.literal(`
            (SELECT cargo_id FROM cargo_centro WHERE centro_id = ${parseInt(centro_filtro)})
          `)
        },
        // Cargos que NO están asignados a ningún centro (globales)
        {
          [Op.notIn]: sequelize.literal(`
            (SELECT DISTINCT cargo_id FROM cargo_centro)
          `)
        }
      ]
    };
  }

  const { count, rows } = await Cargo.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });

  return {
    data: rows,
    count,
  };
};

/**
 * Buscar un cargo por id con sus centros asociados.
 */
export const showCargoRepository = async (id) => {
  return await Cargo.findOne({
    where: { id },
    include: [
      {
        model: Centro,
        as: 'centros',
        through: {
          attributes: []
        }
      }
    ]
  });
};

/**
 * Crear un nuevo cargo.
 */
export const storeCargoRepository = async (data) => {
  return await Cargo.create(data);
};

/**
 * Actualizar un cargo por id.
 */
export const updateCargoRepository = async (id, data) => {
  const cargo = await Cargo.findOne({ where: { id } });
  if (!cargo) return null;

  const updateData = {
    ...data,
    updated_at: new Date()
  };

  await cargo.update(updateData);
  // Si vienen centros en la actualización, actualizar la tabla intermedia
  if (data.centros && Array.isArray(data.centros)) {
    try {
      // Eliminar relaciones existentes
      await CargoCentro.destroy({ where: { cargo_id: id } });

      // Crear nuevas relaciones
      const relaciones = data.centros.map(centro_id => ({
        cargo_id: id,
        centro_id
      }));
      if (relaciones.length > 0) {
        await CargoCentro.bulkCreate(relaciones);
      }

      // Recargar cargo incluyendo centros asociados
      await cargo.reload({
        include: [
          {
            model: Centro,
            as: 'centros',
            through: { attributes: [] }
          }
        ]
      });
    } catch (err) {
      console.error('Error actualizando relaciones cargo-centro:', err);
      // No detener la ejecución: retornar cargo actualizado sin relaciones
      await cargo.reload();
    }
  } else {
    await cargo.reload();
  }

  return cargo;
};

/**
 * Repositorio para obtener centros asociados a un cargo específico usando Sequelize ORM.
 */
export const getCentrosByCargoRepository = async (cargoId, estado, sortBy = "id", order = "ASC") => {
  try {
    const whereClause = {};

    if (estado !== undefined) {
      whereClause.estado = estado;
    }

    const { count, rows } = await Centro.findAndCountAll({
      where: whereClause,
      include: [{
        model: Cargo,
        as: 'cargos',
        where: { id: cargoId },
        attributes: [], // No necesitamos los datos del cargo
        through: { attributes: [] }, // No necesitamos los datos de la tabla intermedia
        required: true // INNER JOIN
      }],
      order: [[sortBy, order]],
      distinct: true, // Para evitar duplicados
    });

    return {
      data: rows,
      count,
    };
  } catch (error) {
    console.error("Error en getCentrosByCargoRepository:", error);
    throw error;
  }
};

/**
 * Verificar si un cargo tiene centros asociados usando Sequelize ORM.
 */
export const checkCargoHasCentrosRepository = async (id) => {
  try {
    const centro = await Centro.findOne({
      include: [{
        model: Cargo,
        as: 'cargos',
        where: { id },
        attributes: [],
        through: { attributes: [] },
        required: true
      }],
      limit: 1,
    });

    return !!centro;
  } catch (error) {
    console.error("Error en checkCargoHasCentrosRepository:", error);
    return false;
  }
};

/**
 * Verificar si un cargo tiene usuarios asociados.
 */
export const checkCargoHasUsersRepository = async (id) => {
  return await checkCargoHasCentrosRepository(id);
};

/**
 * Verificar si existe un cargo con el mismo nombre.
 */
export const findCargoByNombreRepository = async (nombre) => {
  return await Cargo.findOne({
    where: {
      nombre: {
        [Op.like]: nombre
      }
    },
    attributes: ['id', 'nombre']
  });
};

/**
 * Verificar si existe un cargo con el mismo nombre, excluyendo un ID específico.
 */
export const findCargoByNombreExcludingIdRepository = async (nombre, idExcluir) => {
  return await Cargo.findOne({
    where: {
      nombre: {
        [Op.like]: nombre
      },
      id: {
        [Op.ne]: idExcluir
      }
    },
    attributes: ['id', 'nombre']
  });
};