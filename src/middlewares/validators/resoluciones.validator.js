import { body, param } from 'express-validator';
import Resolucion from '../../models/resolucion.model.js';
import Centro from '../../models/centro.model.js';
import Ordenador from '../../models/ordenador.model.js';

const idParamValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo.')
    .notEmpty()
    .withMessage('El ID es obligatorio.')
];

const createResolucionValidator = [
  body('fecha')
    .isISO8601()
    .withMessage('La fecha debe ser una fecha válida en formato ISO 8601.')
    .notEmpty()
    .withMessage('La fecha es obligatoria.'),

  body('acta_posesion')
    .optional()
    .isString()
    .withMessage('El acta de posesión debe ser una cadena de texto.')
    .isLength({ max: 50 })
    .withMessage('El acta de posesión no puede tener más de 50 caracteres.'),

  body('fecha_posesion')
    .optional()
    .isISO8601()
    .withMessage('La fecha de posesión debe ser una fecha válida en formato ISO 8601.'),

  body('fecha_ingreso')
    .isISO8601()
    .withMessage('La fecha de ingreso debe ser una fecha válida en formato ISO 8601.')
    .notEmpty()
    .withMessage('La fecha de ingreso es obligatoria.'),

  body('fecha_retiro')
    .optional()
    .isISO8601()
    .withMessage('La fecha de retiro debe ser una fecha válida en formato ISO 8601.'),

  body('es_encargado')
    .isBoolean()
    .withMessage('El campo es_encargado debe ser un valor booleano.')
    .notEmpty()
    .withMessage('El campo es_encargado es obligatorio.'),

  body('centro_id')
    .isInt({ min: 1 })
    .withMessage('El centro_id debe ser un número entero positivo.')
    .notEmpty()
    .withMessage('El centro_id es obligatorio.')
    .custom(async (centro_id) => {
      const existingCentro = await Centro.findOne({ where: { id: centro_id } });
      if (!existingCentro) {
        throw new Error('El centro especificado no existe.');
      }
    }),

  body('ordenadores_id')
    .isInt({ min: 1 })
    .withMessage('El ordenadores_id debe ser un número entero positivo.')
    .notEmpty()
    .withMessage('El ordenadores_id es obligatorio.')
    .custom(async (ordenadores_id) => {
      const existingOrdenador = await Ordenador.findOne({ where: { id: ordenadores_id } });
      if (!existingOrdenador) {
        throw new Error('El ordenador especificado no existe.');
      }
    }),
];

const updateResolucionByIdValidator = [
  body('fecha')
    .optional()
    .isISO8601()
    .withMessage('La fecha debe ser una fecha válida en formato ISO 8601.'),

  body('acta_posesion')
    .optional()
    .isString()
    .withMessage('El acta de posesión debe ser una cadena de texto.')
    .isLength({ max: 50 })
    .withMessage('El acta de posesión no puede tener más de 50 caracteres.'),

  body('fecha_posesion')
    .optional()
    .isISO8601()
    .withMessage('La fecha de posesión debe ser una fecha válida en formato ISO 8601.'),

  body('fecha_ingreso')
    .optional()
    .isISO8601()
    .withMessage('La fecha de ingreso debe ser una fecha válida en formato ISO 8601.'),

  body('fecha_retiro')
    .optional()
    .isISO8601()
    .withMessage('La fecha de retiro debe ser una fecha válida en formato ISO 8601.'),

  body('es_encargado')
    .optional()
    .isBoolean()
    .withMessage('El campo es_encargado debe ser un valor booleano.'),

  body('centro_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El centro_id debe ser un número entero positivo.')
    .custom(async (centro_id) => {
      if (centro_id !== undefined) {
        const existingCentro = await Centro.findOne({ where: { id: centro_id } });
        if (!existingCentro) {
          throw new Error('El centro especificado no existe.');
        }
      }
    }),

  body('ordenadores_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El ordenadores_id debe ser un número entero positivo.')
    .custom(async (ordenadores_id) => {
      if (ordenadores_id !== undefined) {
        const existingOrdenador = await Ordenador.findOne({ where: { id: ordenadores_id } });
        if (!existingOrdenador) {
          throw new Error('El ordenador especificado no existe.');
        }
      }
    }),
];

export {
  createResolucionValidator,
  updateResolucionByIdValidator,
  idParamValidator
};
