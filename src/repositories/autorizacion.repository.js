import { Op, fn, col, where } from "sequelize";
import Autorizacion from "../models/autorizacion.model.js";
import Centro from "../models/centro.model.js";
import Ordenador from "../models/ordenador.model.js";
import TipoContratacion from "../models/tipo_contratacion.model.js";
import CDP from "../models/cdp.model.js";
import necesidad_contratacion from "../models/necesidad_contratacion.model.js";
import CdpsRubros from "../models/cdps_rubros.model.js";
import Rubro from "../models/rubro.model.js";
import CodigoRubro from "../models/codigo_rubro.model.js";
import Dependencia from "../models/dependencia.model.js";
import Obligacion from "../models/obligaciones.model.js";

/**
 * Repositorio para obtener autorizaciones con filtros, orden y paginación.
 */
export const getAutorizacionesRepository = async ({
  id,
  numero_autorizacion,
  fecha,
  vigencia,
  ordenador_id,
  centro_id,
  tipo_contratacion_id,
  cdp_id, // Agregamos el parámetro cdp_id
  search, // Nuevo parámetro para búsqueda global
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  const whereClause = {};

  if (id) {
    whereClause.id = { [Op.eq]: id };
  }

  if (ordenador_id) {
    whereClause.ordenador_id = { [Op.eq]: ordenador_id };
  }

  if (centro_id) {
    whereClause.centro_id = { [Op.eq]: centro_id };
  }

  if (tipo_contratacion_id) {
    whereClause.tipo_contratacion_id = { [Op.eq]: tipo_contratacion_id };
  }

  if (cdp_id) {
    whereClause.cdp_id = { [Op.eq]: cdp_id };
  }

  if (vigencia) {
    whereClause.vigencia = { [Op.eq]: vigencia };
  }

  if (fecha) {
    whereClause.fecha = { [Op.eq]: fecha };
  }

  // Búsqueda global: buscar en múltiples campos
  if (search) {
    whereClause[Op.or] = [
      { numero_autorizacion: { [Op.like]: `%${search}%` } },
      { numero_linea_PAA: { [Op.like]: `%${search}%` } },
      { objeto: { [Op.like]: `%${search}%` } },
      { descripcion: { [Op.like]: `%${search}%` } },
      { programa_acreditacion: { [Op.like]: `%${search}%` } }
    ];
  } else {
    // Solo aplicar filtros específicos si no hay búsqueda global
    if (numero_autorizacion) {
      whereClause.numero_autorizacion = { [Op.like]: `%${numero_autorizacion}%` };
    }
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Autorizacion.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: Centro,
        as: 'centro',
        attributes: ['id', 'nombre', 'codigo']
      },
      {
        model: Ordenador,
        as: 'ordenador',
        attributes: ['id', 'nombres', 'apellidos', 'documento']
      },
      {
        model: TipoContratacion,
        as: 'tipoContratacion',
        attributes: ['id', 'nombre']
      },
      {
        model: CDP,
        as: 'cdp',
        attributes: ['id', 'codigo', 'descripcion']
      },
      {
        model: necesidad_contratacion,
        as: 'necesidadContratacion',
        attributes: ['id', 'nombre']
      }
      ,
      // Incluir obligaciones asociadas (N:M)
      {
        model: Obligacion,
        as: 'obligaciones',
        attributes: ['id', 'numero_orden', 'nombre'],
        through: { attributes: [] },
        required: false
      }
    ],
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
 * Repositorio para la lista de autorizaciones.
 */
export const getListAutorizacionesRepository = async (centro_id, ordenador_id, sortBy = "id", order = "ASC") => {
  const whereClause = {};

  if (centro_id !== undefined) {
    whereClause.centro_id = { [Op.eq]: centro_id };
  }

  if (ordenador_id !== undefined) {
    whereClause.ordenador_id = { [Op.eq]: ordenador_id };
  }

  const { count, rows } = await Autorizacion.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: Centro,
        as: 'centro',
        attributes: ['id', 'nombre', 'codigo']
      },
      {
        model: Ordenador,
        as: 'ordenador',
        attributes: ['id', 'nombres', 'apellidos', 'documento']
      },
      {
        model: TipoContratacion,
        as: 'tipoContratacion',
        attributes: ['id', 'nombre']
      },
      {
        model: CDP,
        as: 'cdp',
        attributes: ['id', 'codigo', 'descripcion']
      },
      {
        model: necesidad_contratacion,
        as: 'necesidadContratacion',
        attributes: ['id', 'nombre']
      }
      ,
      {
        model: Obligacion,
        as: 'obligaciones',
        attributes: ['id', 'numero_orden', 'nombre'],
        through: { attributes: [] },
        required: false
      }
    ],
    order: [[sortBy, order]],
  });

  return {
    data: rows,
    count,
  };
};

/**
 * Buscar una autorización por número de autorización.
 */
export const showAutorizacionRepository = async (numero) => {
  return await Autorizacion.findOne({
    where: { numero_autorizacion: numero },
    include: [
      {
        model: Centro,
        as: 'centro',
        attributes: ['id', 'nombre', 'codigo']
      },
      {
        model: Ordenador,
        as: 'ordenador',
        attributes: ['id', 'nombres', 'apellidos', 'documento']
      },
      {
        model: Obligacion,
        as: 'obligaciones',
        attributes: ['id', 'numero_orden', 'nombre'],
        through: { attributes: [] },
        required: false
      },
      {
        model: TipoContratacion,
        as: 'tipoContratacion',
        attributes: ['id', 'nombre']
      },
      {
        model: CDP,
        as: 'cdp',
        attributes: ['id', 'codigo', 'descripcion'],
        include: [
          {
            model: CdpsRubros,
            as: 'cdps_rubros',
            include: [
              {
                model: Rubro,
                as: 'rubro',
                include: [
                  {
                    model: CodigoRubro,
                    as: 'codigoRubro',
                    include: [
                      {
                        model: Dependencia,
                        as: 'dependencia',
                        attributes: ['id', 'codigo', 'nombre']
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        model: necesidad_contratacion,
        as: 'necesidadContratacion',
        attributes: ['id', 'nombre']
      }
    ],
  });
};

/**
 * Crear una nueva autorización.
 */
export const storeAutorizacionRepository = async (data) => {
  // Support optional obligations: data.obligacion_ids (array of ints) and data.obligaciones_texto (array of strings)
  const { obligacion_ids, obligaciones_texto, ...rest } = data;

  // Allow numero_linea_PAA to be stored if present in rest
  const created = await Autorizacion.create(rest);

  // If there are obligation ids to associate, attach them
  if (Array.isArray(obligacion_ids) && obligacion_ids.length > 0) {
    await created.setObligaciones(obligacion_ids);
  }

  // If there are obligation texts, try to reuse existing obligaciones (case-insensitive)
  if (Array.isArray(obligaciones_texto) && obligaciones_texto.length > 0) {
    // Normalize and dedupe incoming texts
    const normalizedTexts = Array.from(new Set(obligaciones_texto
      .map(t => String(t || '').trim())
      .filter(Boolean)
      .map(t => t.replace(/\s+/g, ' '))
    ));

    if (normalizedTexts.length > 0) {
      // Buscar obligaciones existentes por nombre (case-insensitive)
      // Buscar obligaciones existentes por nombre (case-insensitive)
      const existing = await Obligacion.findAll({
        where: where(fn('lower', col('nombre')), { [Op.in]: normalizedTexts.map(t => t.toLowerCase()) })
      });

      // Mapear por nombre en minúsculas para comparación
      const existingMap = new Map(existing.map(o => [String(o.nombre).trim().toLowerCase(), o]));

      const toCreate = [];
      const toAssociateIds = [];

      // Reusar existentes y preparar creación de los que faltan
      for (const text of normalizedTexts) {
        const key = text.trim().toLowerCase();
        if (existingMap.has(key)) {
          toAssociateIds.push(existingMap.get(key).id);
        } else {
          toCreate.push(text);
        }
      }

      // Crear los que no existen
      if (toCreate.length > 0) {
        const createdObligaciones = await Promise.all(toCreate.map(async (nombre) => {
          try {
            const numeroOrden = `auto-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
            const oblig = await Obligacion.create({ nombre, numero_orden: numeroOrden });
            return oblig;
          } catch (err) {
            console.error('Error creando obligación desde texto en storeAutorizacionRepository:', err.message || err);
            return null;
          }
        }));
        toAssociateIds.push(...createdObligaciones.filter(Boolean).map(o => o.id));
      }

      // Finalmente asociar sin duplicados
      if (toAssociateIds.length > 0) {
        const uniqueIds = Array.from(new Set(toAssociateIds));
        await created.addObligaciones(uniqueIds);
      }
    }
  }

  // Reload with includes
  await created.reload({
    include: [
      { model: Obligacion, as: 'obligaciones' }
    ]
  });

  return created;
};

/**
 * Actualizar una autorización por número de autorización.
 */
export const updateAutorizacionRepository = async (numero, data) => {
  const autorizacion = await Autorizacion.findOne({ where: { numero_autorizacion: numero } });
  if (!autorizacion) return null;

  // Agregar timestamp de actualización
  const updateData = {
    ...data,
    updated_at: new Date()
  };

  await autorizacion.update(updateData);
  // Handle obligation associations if provided in updateData
  const { obligacion_ids, obligaciones_texto } = data;
  if (Array.isArray(obligacion_ids)) {
    // Set provided ids (this replaces previous associations)
    await autorizacion.setObligaciones(obligacion_ids.filter(id => !!id));
  }

  // If there are obligation texts, try to reuse existing obligaciones (case-insensitive)
  if (Array.isArray(obligaciones_texto) && obligaciones_texto.length > 0) {
    const normalizedTexts = Array.from(new Set(obligaciones_texto
      .map(t => String(t || '').trim())
      .filter(Boolean)
      .map(t => t.replace(/\s+/g, ' '))
    ));

    if (normalizedTexts.length > 0) {
      const existing = await Obligacion.findAll({
        where: where(fn('lower', col('nombre')), { [Op.in]: normalizedTexts.map(t => t.toLowerCase()) })
      });

      const existingMap = new Map(existing.map(o => [String(o.nombre).trim().toLowerCase(), o]));

      const toCreate = [];
      const toAssociateIds = [];

      for (const text of normalizedTexts) {
        const key = text.trim().toLowerCase();
        if (existingMap.has(key)) {
          toAssociateIds.push(existingMap.get(key).id);
        } else {
          toCreate.push(text);
        }
      }

      if (toCreate.length > 0) {
        const createdObligaciones = await Promise.all(toCreate.map(async (nombre) => {
          try {
            const numeroOrden = `auto-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
            const oblig = await Obligacion.create({ nombre, numero_orden: numeroOrden });
            return oblig;
          } catch (err) {
            console.error('Error creando obligación desde texto en updateAutorizacionRepository:', err.message || err);
            return null;
          }
        }));
        toAssociateIds.push(...createdObligaciones.filter(Boolean).map(o => o.id));
      }

      if (toAssociateIds.length > 0) {
        const uniqueIds = Array.from(new Set(toAssociateIds));
        // Añadir sin reemplazar las asociaciones existentes
        await autorizacion.addObligaciones(uniqueIds);
      }
    }
  }

  await autorizacion.reload({
    include: [
      {
        model: Centro,
        as: 'centro',
        attributes: ['id', 'nombre', 'codigo']
      },
      {
        model: Ordenador,
        as: 'ordenador',
        attributes: ['id', 'nombres', 'apellidos', 'documento']
      },
      {
        model: TipoContratacion,
        as: 'tipoContratacion',
        attributes: ['id', 'nombre']
      },
      {
        model: CDP,
        as: 'cdp',
        attributes: ['id', 'codigo', 'descripcion']
      },
      {
        model: necesidad_contratacion,
        as: 'necesidadContratacion',
        attributes: ['id', 'nombre']
      },
      {
        model: Obligacion,
        as: 'obligaciones',
        attributes: ['id', 'numero_orden', 'nombre']
      }
    ]
  });
  return autorizacion;
};

/**
 * Eliminar una autorización por número de autorización.
 */
export const deleteAutorizacionRepository = async (numero) => {
  const autorizacion = await Autorizacion.findOne({ where: { numero_autorizacion: numero } });
  if (!autorizacion) return null;

  await autorizacion.destroy();
  return autorizacion;
};
