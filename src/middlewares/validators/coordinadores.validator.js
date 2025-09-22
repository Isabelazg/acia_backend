import { body, param } from 'express-validator';
import Coordinador from '../../models/coordinador.model.js';

const idParamValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El id debe ser un número entero positivo.')
    .notEmpty()
    .withMessage('El id es obligatorio.')
];

const createCoordinadorValidator = [
  body('nombre')
    .isString().withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ min: 3, max: 200 }).withMessage('El nombre debe tener entre 3 y 200 caracteres.')
    .notEmpty().withMessage('El nombre es obligatorio.'),
  body('descripcion')
    .optional()
    .isString().withMessage('La descripción debe ser una cadena de texto.')
    .isLength({ max: 1000 }).withMessage('La descripción no puede tener más de 1000 caracteres.'),
  body('centros_id')
    .isInt({ min: 1 }).withMessage('El centro es obligatorio y debe ser un número entero positivo.')
];

const updateCoordinadorValidator = [
  body('nombre')
    .optional()
    .isString().withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ min: 3, max: 200 }).withMessage('El nombre debe tener entre 3 y 200 caracteres.'),
  body('descripcion')
    .optional()
    .isString().withMessage('La descripción debe ser una cadena de texto.')
    .isLength({ max: 1000 }).withMessage('La descripción no puede tener más de 1000 caracteres.'),
  body('centros_id')
    .optional()
    .isInt({ min: 1 }).withMessage('El centro debe ser un número entero positivo.')
];

export { createCoordinadorValidator, updateCoordinadorValidator, idParamValidator };
