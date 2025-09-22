import { Op } from "sequelize";
import CDP from "../models/cdp.model.js";
import CoordinadorGrupoMixto from "../models/coordinadoresGrupoMixto.model.js";
import FuenteRecurso from "../models/fuenteRecurso.model.js";
import Centro from "../models/centro.model.js";
import Rubro from "../models/rubro.model.js";
import CodigoRubro from "../models/codigo_rubro.model.js";
import Dependencia from "../models/dependencia.model.js";
import CdpsRubros from "../models/cdps_rubros.model.js";

export const getCdpsRepository = async ({
  id,
  codigo,
  descripcion,
  vigencia,
  quien_expide_id,
  fuente_recurso_id,
  centro_id,
  centro_filtro,
  sortBy = "id",
  order = "ASC",
  page = 1,
  limit = 10
}) => {
  const whereClause = {};
  if (id) whereClause.id = { [Op.eq]: id };
  if (codigo) whereClause.codigo = { [Op.like]: `%${codigo}%` };
  if (descripcion) whereClause.descripcion = { [Op.like]: `%${descripcion}%` };
  if (vigencia) whereClause.vigencia = { [Op.eq]: vigencia };
  if (quien_expide_id) whereClause.quien_expide_id = { [Op.eq]: quien_expide_id };
  if (fuente_recurso_id) whereClause.fuente_recurso_id = { [Op.eq]: fuente_recurso_id };
  if (centro_id) whereClause.centro_id = { [Op.eq]: centro_id };
  // Aplicar filtro por centro si se proporciona
  if (centro_filtro) {
    whereClause.centro_id = { [Op.eq]: parseInt(centro_filtro) };
  }

  const offset = (page - 1) * limit;
  let count, rows;
  try {
    const result = await CDP.findAndCountAll({
      where: whereClause,
      order: [[sortBy, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes: [
        'id',
        'codigo',
        'descripcion',
        'fecha',
        'valor',
        'vigencia',
        'centro_id',
        'fuente_recurso_id',
        'quien_expide_id',
        'created_at',
        'updated_at'
      ],
      include: [
        { model: CoordinadorGrupoMixto, as: 'quien_expide', attributes: ['id', 'documento', 'nombres', 'apellidos', 'correo'] },
        { model: FuenteRecurso, as: 'fuente_recurso', attributes: ['id', 'nombre'] },
        { model: Centro, as: 'centro', attributes: ['id', 'nombre'] },
        {
          model: Rubro,
          as: 'rubros',
          through: { attributes: ['valor', 'fuente_recurso_id'] },
          attributes: ['id', 'descripcion', 'codigo_rubro_id'],
          include: [
            {
              model: CodigoRubro,
              as: 'codigoRubro',
              attributes: ['id', 'codigo', 'dependencia_id'],
              include: [
                {
                  model: Dependencia,
                  as: 'dependencia',
                  attributes: ['id', 'nombre']
                }
              ]
            }
          ]
        }
      ]
    });
    count = result.count;
    rows = result.rows;
  } catch (err) {
    console.error('Error en CDP.findAndCountAll:', err);
    throw err;
  }

  // Mapear los datos para asegurar que todos los campos estén presentes
  const data = rows.map(cdp => ({
    id: cdp.id,
    codigo: cdp.codigo,
    descripcion: cdp.descripcion,
    fecha: cdp.fecha,
    valor: cdp.valor,
    vigencia: cdp.vigencia,
    // IDs directos necesarios para edición
    centro_id: cdp.centro_id,
    fuente_recurso_id: cdp.fuente_recurso_id,
    quien_expide_id: cdp.quien_expide_id,
    // Relaciones completas para visualización
    centro: cdp.centro ? { id: cdp.centro.id, nombre: cdp.centro.nombre } : null,
    fuente_recurso: cdp.fuente_recurso ? { id: cdp.fuente_recurso.id, nombre: cdp.fuente_recurso.nombre } : null,
    quien_expide: cdp.quien_expide ? {
      id: cdp.quien_expide.id,
      documento: cdp.quien_expide.documento,
      nombres: cdp.quien_expide.nombres,
      apellidos: cdp.quien_expide.apellidos,
      correo: cdp.quien_expide.correo
    } : null,
    rubros: cdp.rubros ? cdp.rubros.map(rubro => ({
      id: rubro.id,
      descripcion: rubro.descripcion,
      codigo_rubro_id: rubro.codigo_rubro_id,
      // Incluir datos de la tabla intermedia
      CdpsRubros: rubro.CdpsRubros ? {
        valor: rubro.CdpsRubros.valor,
        fuente_recurso_id: rubro.CdpsRubros.fuente_recurso_id
      } : null,
      // Incluir relación con código de rubro
      codigoRubro: rubro.codigoRubro ? {
        id: rubro.codigoRubro.id,
        codigo: rubro.codigoRubro.codigo,
        dependencia_id: rubro.codigoRubro.dependencia_id,
        dependencia: rubro.codigoRubro.dependencia ? {
          id: rubro.codigoRubro.dependencia.id,
          nombre: rubro.codigoRubro.dependencia.nombre
        } : null
      } : null
    })) : [],
    created_at: cdp.created_at,
    updated_at: cdp.updated_at
  }));

  return { data, count };
};

export const getListCdpsRepository = async (vigencia, sortBy = "id", order = "ASC", centro_filtro = null) => {
  const whereClause = {};
  if (vigencia) whereClause.vigencia = { [Op.eq]: vigencia };

  // Aplicar filtro por centro si se proporciona
  if (centro_filtro) {
    whereClause.centro_id = { [Op.eq]: parseInt(centro_filtro) };
  }

  const { count, rows } = await CDP.findAndCountAll({
    where: whereClause,
    order: [[sortBy, order]],
  });
  return { data: rows, count };
};

export const showCdpRepository = async (codigo) => {
  return await CDP.findOne({
    where: { codigo },
    include: [
      {
        model: CoordinadorGrupoMixto,
        as: 'quien_expide',
        attributes: ['id', 'documento', 'nombres', 'apellidos', 'correo']
      },
      {
        model: FuenteRecurso,
        as: 'fuente_recurso',
        attributes: ['id', 'nombre']
      },
      {
        model: Centro,
        as: 'centro',
        attributes: ['id', 'nombre']
      },
      {
        model: Rubro,
        as: 'rubros',
        through: {
          attributes: ['valor', 'fuente_recurso_id']
        },
        attributes: ['id', 'descripcion', 'codigo_rubro_id'],
        include: [
          {
            model: CodigoRubro,
            as: 'codigoRubro',
            attributes: ['id', 'codigo', 'dependencia_id'],
            include: [
              {
                model: Dependencia,
                as: 'dependencia',
                attributes: ['id', 'nombre']
              }
            ]
          }
        ]
      }
    ]
  });
};

export const storeCdpRepository = async (data) => {
  return await CDP.create(data);
};

export const updateCdpRepository = async (codigo, data) => {
  const cdp = await CDP.findOne({ where: { codigo } });
  if (!cdp) return null;

  // Actualizar los campos básicos del CDP
  const cdpFields = {
    descripcion: data.descripcion,
    fecha: data.fecha,
    valor: data.valor,
    vigencia: data.vigencia,
    centro_id: data.centro_id,
    fuente_recurso_id: data.fuente_recurso_id,
    quien_expide_id: data.quien_expide_id,
    updated_at: new Date()
  };

  await cdp.update(cdpFields);

  // Si se proporcionan rubro_id, actualizar la relación de rubros
  if (data.rubro_id) {
    // Limpiar relaciones existentes
    await CdpsRubros.destroy({ where: { cdps_id: cdp.id } });

    // Crear nueva relación
    await CdpsRubros.create({
      cdps_id: cdp.id,
      rubros_id: data.rubro_id,
      valor: data.valor || 0,
      fuente_recurso_id: data.fuente_recurso_id
    });
  }

  await cdp.reload();
  return cdp;
};