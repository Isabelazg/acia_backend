import { body, param } from 'express-validator';

const idtipo_documentoValidator = [
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

const creattipo_documentoValidator = [
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

const updatetipo_documentoValidator = [
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

export { creattipo_documentoValidator, updatetipo_documentoValidator, idtipo_documentoValidator, cambiarEstadoValidator };