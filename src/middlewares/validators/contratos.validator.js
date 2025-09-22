import { body, param } from 'express-validator';
import Contrato from '../../models/contrato.model.js';
import { Coordinadores } from '../../models/index.js';

const numeroParamValidator = [
  param('numero')
    .trim()
    .notEmpty()
    .withMessage('El número es obligatorio.')
];

// Validación para creación de contratos acorde al payload del frontend
const createContratoValidator = [
  // acta_seleccion and fecha_acta_seleccion are required except when the selected
  // coordinacion is administrative. We check the coordinador record to decide.
  body('acta_seleccion')
    .custom(async (value, { req }) => {
      const coordId = req.body.coordinador_id;
      // If no coordinador provided yet, enforce presence (other validators will handle missing coordinator)
      if (!coordId) {
        if (!value || String(value).trim() === '') throw new Error('El acta de selección es obligatoria.');
        if (String(value).length > 50) throw new Error('El acta de selección debe tener máximo 50 caracteres.');
        return true;
      }
      try {
        const coord = await Coordinadores.findOne({ where: { id: coordId } });
        const nombre = String(coord?.nombre || coord?.descripcion || '').toLowerCase();
        const isAdmin = nombre.includes('administrativ') || nombre.includes('administrativa') || nombre.includes('admin');
        if (isAdmin) {
          // not required for administrative coordinations
          if (!value) return true;
          if (String(value).length > 50) throw new Error('El acta de selección debe tener máximo 50 caracteres.');
          return true;
        }
        // otherwise required
        if (!value || String(value).trim() === '') throw new Error('El acta de selección es obligatoria.');
        if (String(value).length > 50) throw new Error('El acta de selección debe tener máximo 50 caracteres.');
        return true;
      } catch (e) {
        // On DB lookup error, fallback to requiring the field
        if (!value || String(value).trim() === '') throw new Error('El acta de selección es obligatoria.');
        if (String(value).length > 50) throw new Error('El acta de selección debe tener máximo 50 caracteres.');
        return true;
      }
    }),

  body('fecha_acta_seleccion')
    .custom(async (value, { req }) => {
      const coordId = req.body.coordinador_id;
      if (!coordId) {
        if (!value) throw new Error('La fecha del acta es obligatoria.');
        const d = Date.parse(value);
        if (isNaN(d)) throw new Error('La fecha del acta debe tener un formato de fecha válido.');
        return true;
      }
      try {
        const coord = await Coordinadores.findOne({ where: { id: coordId } });
        const nombre = String(coord?.nombre || coord?.descripcion || '').toLowerCase();
        const isAdmin = nombre.includes('administrativ') || nombre.includes('administrativa') || nombre.includes('admin');
        if (isAdmin) {
          // optional for administrative coordinations
          if (!value) return true;
          const d = Date.parse(value);
          if (isNaN(d)) throw new Error('La fecha del acta debe tener un formato de fecha válido.');
          return true;
        }
        // otherwise required
        if (!value) throw new Error('La fecha del acta es obligatoria.');
        const d = Date.parse(value);
        if (isNaN(d)) throw new Error('La fecha del acta debe tener un formato de fecha válido.');
        return true;
      } catch (e) {
        if (!value) throw new Error('La fecha del acta es obligatoria.');
        const d = Date.parse(value);
        if (isNaN(d)) throw new Error('La fecha del acta debe tener un formato de fecha válido.');
        return true;
      }
    }),

  body('valor_mensual')
    .notEmpty()
    .withMessage('El valor mensual es obligatorio.')
    .isFloat({ min: 0 })
    .withMessage('El valor mensual debe ser un número válido.'),

  body('fecha_estimada_inicio')
    .notEmpty()
    .withMessage('La fecha estimada de inicio es obligatoria.')
    .isISO8601()
    .withMessage('Formato de fecha inválido.'),

  body('fecha_estimada_terminacion')
    .notEmpty()
    .withMessage('La fecha estimada de terminación es obligatoria.')
    .isISO8601()
    .withMessage('Formato de fecha inválido.'),

  body('lugar_ejecucion')
    .trim()
    .notEmpty()
    .withMessage('El lugar de ejecución es obligatorio.')
    .isLength({ max: 300 })
    .withMessage('El lugar de ejecución debe tener máximo 300 caracteres.'),

  body('domicilio_contractual')
    .trim()
    .notEmpty()
    .withMessage('El domicilio contractual es obligatorio.')
    .isLength({ max: 255 })
    .withMessage('El domicilio contractual debe tener máximo 255 caracteres.'),

  body('supervisor_id')
    .optional()
    .isInt()
    .withMessage('El supervisor debe ser un id válido.'),

  body('coordinador_id')
    .notEmpty()
    .withMessage('La coordinación es obligatoria.')
    .isInt()
    .withMessage('La coordinación debe ser un id válido.'),

  // obligacion_id removed: Obligaciones ahora se asocian a Autorizacion

  body('informacion_personal_id')
    .optional()
    .isInt()
    .withMessage('La información personal debe ser un id válido.'),

  body('autorizacion_id')
    .notEmpty()
    .withMessage('La autorización es obligatoria.')
    .isInt()
    .withMessage('La autorización debe ser un id válido.'),

  body('tipo_ejecucion_contrato')
    .notEmpty()
    .withMessage('El tipo de ejecución es obligatorio.')
    .isIn(['Meses', 'Horas'])
    .withMessage('Tipo de ejecución inválido.'),

  body('tiene_poliza')
    .optional()
    .isBoolean()
    .withMessage('tiene_poliza debe ser booleano.'),

  body('tiene_plan_pagos')
    .optional()
    .isBoolean()
    .withMessage('tiene_plan_pagos debe ser booleano.'),
];

const updateContratoValidator = [
  // Verificar que el parámetro :numero exista y sea un entero
  param('numero')
    .isInt()
    .withMessage('El id del contrato debe ser un número entero.')
    .custom(async (numero) => {
      const contrato = await Contrato.findOne({ where: { id: numero } });
      if (!contrato) {
        throw new Error('El contrato a actualizar no existe.');
      }
      return true;
    }),

  // Campos opcionales con mismas reglas que en creación
  body('acta_seleccion')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('El acta de selección debe tener máximo 50 caracteres.'),

  body('fecha_acta_seleccion')
    .optional()
    .isISO8601()
    .withMessage('La fecha del acta debe tener un formato de fecha válido.'),

  body('valor_mensual')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El valor mensual debe ser un número válido.'),

  body('fecha_estimada_inicio')
    .optional()
    .isISO8601()
    .withMessage('Formato de fecha inválido.'),

  body('fecha_estimada_terminacion')
    .optional()
    .isISO8601()
    .withMessage('Formato de fecha inválido.'),

  body('lugar_ejecucion')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('El lugar de ejecución debe tener máximo 300 caracteres.'),

  body('domicilio_contractual')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('El domicilio contractual debe tener máximo 255 caracteres.'),

  body('supervisor_id')
    .optional()
    .isInt()
    .withMessage('El supervisor debe ser un id válido.'),

  body('coordinador_id')
    .optional()
    .isInt()
    .withMessage('La coordinación debe ser un id válido.'),

  // obligacion_id removed: Obligaciones ahora se asocian a Autorizacion

  body('informacion_personal_id')
    .optional()
    .isInt()
    .withMessage('La información personal debe ser un id válido.'),

  body('autorizacion_id')
    .optional()
    .isInt()
    .withMessage('La autorización debe ser un id válido.'),

  body('tipo_ejecucion_contrato')
    .optional()
    .isIn(['Meses', 'Horas'])
    .withMessage('Tipo de ejecución inválido.'),

  body('tiene_poliza')
    .optional()
    .isBoolean()
    .withMessage('tiene_poliza debe ser booleano.'),

  body('tiene_plan_pagos')
    .optional()
    .isBoolean()
    .withMessage('tiene_plan_pagos debe ser booleano.'),
];

export { createContratoValidator, updateContratoValidator, numeroParamValidator };
