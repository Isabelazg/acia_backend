import { body, param } from 'express-validator';
import TipoContratacion from '../../models/tipo_contratacion.model.js';

/**
 * Validador para crear un tipo de contratación.
 */
const createTipoContratacionValidator = [
  body('nombre')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ max: 50 })
    .withMessage('El nombre no puede tener más de 50 caracteres.')
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .custom(async (nombre) => {
      const existingTipoContratacion = await TipoContratacion.findOne({ where: { nombre } });
      if (existingTipoContratacion) {
        throw new Error('El nombre ya está en uso.');
      }
    }),
];

/**
 * Validador para actualizar un tipo de contratación.
 */
const updateTipoContratacionValidator = [
  body('nombre')
    .optional()
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ max: 50 })
    .withMessage('El nombre no puede tener más de 50 caracteres.')
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .custom(async (nombre, { req }) => {
      const id = req.params.id;
      const currentTipoContratacion = await TipoContratacion.findByPk(id);
      if (!currentTipoContratacion) {
        throw new Error('El tipo de contratación a actualizar no existe.');
      }
      // Si el nombre es diferente al actual, verifica unicidad
      if (nombre !== currentTipoContratacion.nombre) {
        const exists = await TipoContratacion.findOne({ where: { nombre } });
        if (exists) {
          throw new Error('Ya existe un tipo de contratación con ese nombre.');
        }
      }
      return true;
    }),
];

/**
 * Validador para el parámetro ID.
 */
const idParamValidator = [
  param('id')
    .isInt()
    .withMessage('El ID debe ser un número entero.')
    .toInt()
    .custom(async (id) => {
      const tipoContratacion = await TipoContratacion.findByPk(id);
      if (!tipoContratacion) {
        throw new Error('El tipo de contratación no existe.');
      }
    }),
];

export { createTipoContratacionValidator, updateTipoContratacionValidator, idParamValidator };