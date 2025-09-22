import { Op } from 'sequelize';
import Contrato from '../models/contrato.model.js';
import { informacion_personal, Centro, Autorizacion, Obligacion } from '../models/index.js';
import { logError } from '../config/logger.config.js';

export const getContratosRepository = async ({ id, search, sortBy = 'id', order = 'ASC', page = 1, limit = 10 }) => {
  const whereClause = {};

  if (id) whereClause.id = { [Op.eq]: id };

  if (search) {
    const searchSnakeCase = String(search).toLowerCase().trim().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    whereClause[Op.or] = [
      { acta_seleccion: { [Op.like]: `%${search}%` } },
      { acta_seleccion: { [Op.like]: `%${searchSnakeCase}%` } },
      { lugar_ejecucion: { [Op.like]: `%${search}%` } },
      { domicilio_contractual: { [Op.like]: `%${search}%` } }
    ];
  }

  const offset = (page - 1) * limit;
  const normalizeSortBy = (value) => {
    if (!value) return 'id';
    const cleaned = String(value).trim().replace(/\s+/g, '_').toLowerCase();
    const allowed = new Set(['id', 'created_at', 'updated_at', 'acta_seleccion', 'fecha_acta_seleccion', 'lugar_ejecucion', 'domicilio_contractual', 'valor_mensual']);
    return allowed.has(cleaned) ? cleaned : 'id';
  };
  const normalizeOrder = (v) => { const o = String(v || 'ASC').toUpperCase(); return o === 'DESC' ? 'DESC' : 'ASC'; };
  const safeSortBy = normalizeSortBy(sortBy);
  const safeOrder = normalizeOrder(order);

  try {
    const { count, rows } = await Contrato.findAndCountAll({
      where: whereClause,
      // Evitar seleccionar columnas que pueden no existir en esquemas heterogéneos
      attributes: { exclude: ['obligacion_id'] },
      order: [[safeSortBy, safeOrder]],
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        { model: informacion_personal, as: 'informacion_personal' },
        {
          model: Centro,
          as: 'centro',
          required: false,
          include: [
            {
              model: Autorizacion,
              as: 'autorizaciones',
              required: false,
              include: [
                { model: Obligacion, as: 'obligaciones', required: false, through: { attributes: [] } }
              ]
            }
          ]
        }
      ]
    });

    return { data: rows, count };
  } catch (err) {
    try { logError('Error en getContratosRepository', { message: err.message, stack: err.stack, whereClause, sortBy: safeSortBy, order: safeOrder, page, limit }); } catch (logErr) { console.error('No se pudo escribir log interno:', logErr); }
    throw err;
  }
};

export const getListContratosRepository = async (sortBy = 'id', order = 'ASC') => {
  const whereClause = {};
  const normalizeSortBy = (value) => { if (!value) return 'id'; const cleaned = String(value).trim().replace(/\s+/g, '_').toLowerCase(); const allowed = new Set(['id', 'created_at', 'updated_at', 'acta_seleccion', 'fecha_acta_seleccion', 'lugar_ejecucion', 'domicilio_contractual', 'valor_mensual']); return allowed.has(cleaned) ? cleaned : 'id'; };
  const normalizeOrder = (v) => { const o = String(v || 'ASC').toUpperCase(); return o === 'DESC' ? 'DESC' : 'ASC'; };
  const safeSortBy = normalizeSortBy(sortBy);
  const safeOrder = normalizeOrder(order);

  try {
    const { count, rows } = await Contrato.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['obligacion_id'] },
      order: [[safeSortBy, safeOrder]],
      include: [
        { model: informacion_personal, as: 'informacion_personal' },
        {
          model: Centro,
          as: 'centro',
          required: false,
          include: [
            {
              model: Autorizacion,
              as: 'autorizaciones',
              required: false,
              include: [
                { model: Obligacion, as: 'obligaciones', required: false, through: { attributes: [] } }
              ]
            }
          ]
        }
      ]
    });

    return { data: rows, count };
  } catch (err) {
    try { logError('Error en getListContratosRepository', { message: err.message, stack: err.stack, sortBy: safeSortBy, order: safeOrder }); } catch (logErr) { console.error('No se pudo escribir log interno:', logErr); }
    throw err;
  }
};

export const showContratoRepository = async (numero) => {
  return await Contrato.findOne({
    where: { id: numero },
    attributes: { exclude: ['obligacion_id'] },
    include: [
      { model: informacion_personal, as: 'informacion_personal' },
      {
        model: Centro,
        as: 'centro',
        required: false,
        include: [
          {
            model: Autorizacion,
            as: 'autorizaciones',
            required: false,
            include: [
              { model: Obligacion, as: 'obligaciones', required: false, through: { attributes: [] } }
            ]
          }
        ]
      }
    ]
  });
};

export const storeContratoRepository = async (data) => {
  logError('storeContratoRepository payload', { payload: data });
  const { obligacion_id, ...toCreate } = data;
  const fields = Object.keys(toCreate);

  try {
    // Fallback lookup: try to resolve one obligacion from autorizacion if present
    if (!('obligacion_id' in toCreate) && toCreate.autorizacion_id) {
      try {
        const foundOblig = await Obligacion.findOne({
          include: [{ model: Autorizacion, as: 'autorizaciones', where: { id: toCreate.autorizacion_id }, attributes: [] }],
          attributes: ['id']
        });
        if (foundOblig && foundOblig.id) {
          toCreate.obligacion_id = foundOblig.id;
          if (!fields.includes('obligacion_id')) fields.push('obligacion_id');
          logError('storeContratoRepository: applied fallback obligacion_id from autorizacion', { autorizacion_id: toCreate.autorizacion_id, obligacion_id: foundOblig.id });
        } else {
          logError('storeContratoRepository: no obligacion found for autorizacion (fallback not applied)', { autorizacion_id: toCreate.autorizacion_id });
        }
      } catch (fkLookupErr) {
        logError('storeContratoRepository: error lookup obligacion fallback', { error: fkLookupErr, autorizacion_id: toCreate.autorizacion_id });
      }
    }

    const contrato = await Contrato.create(toCreate, { fields });
    return contrato;
  } catch (err) {
    // On error, examine message and attempt safe retries in specific cases
    try {
      const msg = err?.parent?.sqlMessage || err?.message || String(err);

      // If column doesn't exist in this DB schema, try again without the field
      if (msg && /unknown column .*obligacion_id/i.test(msg)) {
        try {
          const stripped = { ...toCreate };
          delete stripped.obligacion_id;
          const strippedFields = fields.filter(f => f !== 'obligacion_id');
          logError('storeContratoRepository: retrying create without obligacion_id because column missing', { payload: stripped });
          const contratoRetry = await Contrato.create(stripped, { fields: strippedFields });
          return contratoRetry;
        } catch (retryErr) {
          logError('storeContratoRepository: retry without obligacion_id failed', { error: retryErr });
        }
      }

      // If DB enforced NOT NULL/FK, try to resolve an obligacion from autorizacion and retry
      if (toCreate?.autorizacion_id && /cannot be null|foreign key constraint fails/i.test(msg)) {
        try {
          const autoriz = await Autorizacion.findOne({
            where: { id: toCreate.autorizacion_id },
            include: [{ model: Obligacion, as: 'obligaciones', attributes: ['id'], through: { attributes: [] } }]
          });
          const foundId = autoriz?.obligaciones?.[0]?.id;
          if (foundId) {
            toCreate.obligacion_id = foundId;
            if (!fields.includes('obligacion_id')) fields.push('obligacion_id');
            logError('storeContratoRepository: retrying create with obligacion_id from autorizacion after DB error', { autorizacion_id: toCreate.autorizacion_id, obligacion_id: foundId, originalError: msg });
            const contratoRetry = await Contrato.create(toCreate, { fields });
            return contratoRetry;
          } else {
            logError('storeContratoRepository: retry lookup found no obligaciones for autorizacion', { autorizacion_id: toCreate.autorizacion_id });
          }
        } catch (retryErr) {
          logError('storeContratoRepository: error during retry lookup/create', { error: retryErr });
        }
      }
    } catch (preRetryErr) {
      logError('storeContratoRepository: error evaluating retry conditions', { error: preRetryErr });
    }

    // Log and translate common DB errors for callers
    try { logError('Error en storeContratoRepository', { message: err.message, stack: err.stack, payload: data }); } catch (logErr) { console.error('No se pudo escribir log interno:', logErr); }

    const message = err?.parent?.sqlMessage || err?.message || String(err);
    if (message && /foreign key constraint fails/i.test(message)) {
      const fkErr = new Error('Violación de restricción de clave foránea: compruebe que las relaciones (por ejemplo obligacion/autorizacion) existen o aplique la migración para permitir valores nulos.');
      fkErr.code = 'FK_VIOLATION'; fkErr.original = err; throw fkErr;
    }
    if (message && /cannot be null/i.test(message)) {
      const nullErr = new Error('Columna requerida es NULL en la inserción: probablemente obligacion_id en la tabla contratos. Aplicar la migración para hacerlo NULLable o enviar un valor válido.');
      nullErr.code = 'NOT_NULL_VIOLATION'; nullErr.original = err; throw nullErr;
    }

    throw err;
  }
};

export const updateContratoRepository = async (numero, data) => {
  const contrato = await Contrato.findOne({ where: { id: numero } });
  if (!contrato) return null;
  const updateData = { ...data, updated_at: new Date() };
  await contrato.update(updateData);
  await contrato.reload();
  return contrato;
};
