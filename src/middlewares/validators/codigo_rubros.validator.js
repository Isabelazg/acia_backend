import { body, param } from 'express-validator';
import CodigoRubro from '../../models/codigo_rubro.model.js';

const idParamValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo.')
    .notEmpty()
    .withMessage('El ID es obligatorio.')
];

const createCodigoRubroValidator = [
  body('codigo')
    .isString()
    .withMessage('El código debe ser una cadena de texto.')
    .isLength({ max: 20 })
    .withMessage('El código no puede tener más de 20 caracteres.')
    .notEmpty()
    .withMessage('El código es obligatorio.')
    .custom(async (codigo) => {
      const existing = await CodigoRubro.findOne({ where: { codigo } });
      if (existing) {
        throw new Error('El código ya está en uso.');
      }
    }),

  body('dependencia_id')
    .isInt({ min: 1 })
    .withMessage('La dependencia es obligatoria.')
];

const updateCodigoRubroValidator = [
  body('codigo')
    .optional()
    .isString()
    .withMessage('El código debe ser una cadena de texto.')
    .isLength({ max: 20 })
    .withMessage('El código no puede tener más de 20 caracteres.'),

  body('dependencia_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La dependencia debe ser un número entero positivo.')
];

export { createCodigoRubroValidator, updateCodigoRubroValidator, idParamValidator };