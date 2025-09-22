import { body, param } from 'express-validator';

const idParamValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El id debe ser un número entero positivo.')
    .notEmpty()
    .withMessage('El id es obligatorio.')
];

const areasValidator = [
  body('nombre')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ max: 100 })
    .withMessage('El nombre no puede tener más de 100 caracteres.')
    .notEmpty()
    .withMessage('El nombre es obligatorio.'),
  body('estado')
    .optional()
    .isBoolean()
    .withMessage('El estado debe ser booleano.')
];

const areasEditValidator = [
  body('nombre')
    .optional()
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ max: 100 })
    .withMessage('El nombre no puede tener más de 100 caracteres.'),
  body('estado')
    .optional()
    .isBoolean()
    .withMessage('El estado debe ser booleano.')
];

export { areasValidator, areasEditValidator, idParamValidator };

export const cambiarEstadoAreaValidator = [
  body('estado')
    .notEmpty()
    .withMessage('El estado es obligatorio.')
    .isBoolean()
    .withMessage('El estado debe ser un valor booleano.')
];