import { body, param } from 'express-validator';
import FuenteRecurso from '../../models/fuenteRecurso.model.js';

const idParamValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo.')
    .notEmpty()
    .withMessage('El ID es obligatorio.')
];

const createFuenteRecursoValidator = [
  body('nombre')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre es obligatorio y no puede tener más de 100 caracteres.')
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .custom(async (nombre) => {
      const existing = await FuenteRecurso.findOne({ where: { nombre } });
      if (existing) {
        throw new Error('El nombre ya está en uso.');
      }
    }),
  body('descripcion')
    .optional()
    .isString()
    .withMessage('La descripción debe ser una cadena de texto.')
    .isLength({ max: 255 })
    .withMessage('La descripción no puede tener más de 255 caracteres.')
];

// El nombre es obligatorio al editar
const updateFuenteRecursoValidator = [
  body('nombre')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre es obligatorio y no puede tener más de 100 caracteres.')
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .custom(async (nombre, { req }) => {
      const id = req.params.id;
      const current = await FuenteRecurso.findByPk(id);
      if (!current) {
        throw new Error('La fuente de recurso a actualizar no existe.');
      }
      if (nombre && nombre !== current.nombre) {
        const exists = await FuenteRecurso.findOne({ where: { nombre } });
        if (exists) {
          throw new Error('Ya existe una fuente de recurso con ese nombre.');
        }
      }
      return true;
    }),
  body('descripcion')
    .optional()
    .isString()
    .withMessage('La descripción debe ser una cadena de texto.')
    .isLength({ max: 255 })
    .withMessage('La descripción no puede tener más de 255 caracteres.')
];

export { createFuenteRecursoValidator, updateFuenteRecursoValidator, idParamValidator };