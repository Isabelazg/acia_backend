import { body, param } from 'express-validator';
import Cargo from '../../models/cargo.model.js';

const idParamValidator = [
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

const createCargoValidator = [
  body('nombre')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres.')
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .trim(),

  body('estado')
    .optional()
    .isBoolean()
    .withMessage('El estado debe ser true o false.'),

  body('centros')
    .isArray({ min: 1 })
    .withMessage('Debes asociar al menos un centro.')
    .custom((centros) => {
      return centros.every(id => {
        const numId = parseInt(id, 10);
        return !isNaN(numId) && numId > 0;
      });
    })
    .withMessage('Todos los IDs de centros deben ser enteros positivos.')
];

const updateCargoValidator = [
  body('nombre')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres.'),

  body('estado')
    .optional()
    .isBoolean()
    .withMessage('El estado debe ser true o false.'),

  body('centros')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Debes asociar al menos un centro.')
    .custom((centros) => {
      return centros.every(id => {
        const numId = parseInt(id, 10);
        return !isNaN(numId) && numId > 0;
      });
    })
    .withMessage('Todos los IDs de centros deben ser enteros positivos.')
];

export { createCargoValidator, updateCargoValidator, idParamValidator, cambiarEstadoValidator };