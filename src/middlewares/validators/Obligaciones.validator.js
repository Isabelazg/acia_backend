import { body, param } from 'express-validator';

const idObligacionesValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo.')
    .notEmpty()
    .withMessage('El ID es obligatorio.')
];


const createObligacionesValidator = [
  body('nombre')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre debe tener entre 3 y 50 caracteres.')
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .trim(),
];

const updateObligacionesValidator = [
  body('nombre')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre debe tener entre 3 y 50 caracteres.'),
];

export { createObligacionesValidator, updateObligacionesValidator, idObligacionesValidator };