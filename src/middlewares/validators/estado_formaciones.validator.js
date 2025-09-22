import { body, param } from 'express-validator';

const idestado_formacionesValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo.')
    .notEmpty()
    .withMessage('El ID es obligatorio.')
];

const cambiarEstadoValidator = [
  body('estado')
    .optional()
    .isBoolean()
    .withMessage('El estado debe ser un valor booleano (true o false).')
];

const createestado_formacionesValidator = [
  body('nombre')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre debe tener entre 3 y 50 caracteres.')
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .trim(),

  body('estado')
    .optional()
    .isBoolean()
    .withMessage('El estado debe ser true o false.'),
];

const updateestado_formacionesValidator = [
  body('nombre')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre debe tener entre 3 y 50 caracteres.'),

  body('estado')
    .optional()
    .isBoolean()
    .withMessage('El estado debe ser true o false.'),
];

export { createestado_formacionesValidator, updateestado_formacionesValidator, idestado_formacionesValidator, cambiarEstadoValidator };