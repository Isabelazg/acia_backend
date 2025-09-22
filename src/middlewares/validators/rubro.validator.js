import { body, param } from 'express-validator';
import Rubro from '../../models/rubro.model.js';

const idParamValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo.')
    .notEmpty()
    .withMessage('El ID es obligatorio.')
];

const createRubroValidator = [
  body('codigo_rubro_id')
    .isInt({ min: 1 })
    .withMessage('El código de rubro debe ser un número entero positivo.')
    .notEmpty()
    .withMessage('El código de rubro es obligatorio.')
    .custom(async (codigo_rubro_id) => {
      const existingRubro = await Rubro.findOne({ where: { codigo_rubro_id } });
      if (existingRubro) {
        throw new Error('El código de rubro ya está en uso.');
      }
    }),

  body('descripcion')
    .isString()
    .withMessage('La descripción debe ser una cadena de texto.')
    .isLength({ max: 400 })
    .withMessage('La descripción no puede tener más de 400 caracteres.')
    .notEmpty()
    .withMessage('La descripción es obligatoria.')
];

const updateRubroValidator = [
  body('codigo_rubro_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El código de rubro debe ser un número entero positivo.')
    .custom(async (codigo_rubro_id, { req }) => {
      const id = req.params.id;
      const currentRubro = await Rubro.findByPk(id);
      if (!currentRubro) {
        throw new Error('El rubro a actualizar no existe.');
      }
      // Si el código de rubro es diferente al actual, verifica unicidad
      if (codigo_rubro_id !== currentRubro.codigo_rubro_id) {
        const exists = await Rubro.findOne({ where: { codigo_rubro_id } });
        if (exists) {
          throw new Error('Ya existe un rubro con ese código de rubro.');
        }
      }
      return true;
    }),

  body('descripcion')
    .optional()
    .isString()
    .withMessage('La descripción debe ser una cadena de texto.')
    .isLength({ max: 400 })
    .withMessage('La descripción no puede tener más de 400 caracteres.')
    .notEmpty()
    .withMessage('La descripción es obligatoria.')
];

export { createRubroValidator, updateRubroValidator, idParamValidator };