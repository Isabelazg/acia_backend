import { body, param } from 'express-validator';
import Dependencia from '../../models/dependencia.model.js';

export const codigoParamValidator = [
  param('codigo')
    .isString()
    .withMessage('El código debe ser una cadena de texto.')
    .isLength({ min: 1, max: 50 })
    .withMessage('El código debe tener entre 1 y 50 caracteres.')
    .notEmpty()
    .withMessage('El código es obligatorio.')
];

export const createDependenciaValidator = [
  body('codigo')
    .isString()
    .withMessage('El código debe ser una cadena de texto.')
    .isLength({ max: 50 })
    .withMessage('El código no puede tener más de 50 caracteres.')
    .notEmpty()
    .withMessage('El código es obligatorio.')
    .custom(async (codigo) => {
      const existing = await Dependencia.findOne({ where: { codigo } });
      if (existing) throw new Error('El código ya está en uso.');
    }),
  body('nombre')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ max: 50 })
    .withMessage('El nombre no puede tener más de 50 caracteres.')
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .custom(async (nombre) => {
      const existing = await Dependencia.findOne({ where: { nombre } });
      if (existing) throw new Error('El nombre ya está en uso.');
    }),
  body('estado')
    .optional()
    .isBoolean()
    .withMessage('El estado debe ser true o false.')
];

export const updateDependenciaValidator = [
  body('codigo')
    .trim()
    .notEmpty()
    .withMessage('El código es obligatorio.')
    .isString()
    .withMessage('El código debe ser una cadena de texto.')
    .isLength({ max: 50 })
    .withMessage('El código no puede tener más de 50 caracteres.')
    .custom(async (codigo, { req }) => {
      const id = req.params.codigo;
      const current = await Dependencia.findOne({ where: { codigo: id } });
      if (!current) throw new Error('La dependencia a actualizar no existe.');
      if (codigo !== current.codigo) {
        const exists = await Dependencia.findOne({ where: { codigo } });
        if (exists) throw new Error('Ya existe una dependencia con ese código.');
      }
      return true;
    }),
  body('nombre')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ max: 50 })
    .withMessage('El nombre no puede tener más de 50 caracteres.')
    .custom(async (nombre, { req }) => {
      const id = req.params.codigo;
      const current = await Dependencia.findOne({ where: { codigo: id } });
      if (!current) throw new Error('La dependencia a actualizar no existe.');
      if (nombre !== current.nombre) {
        const exists = await Dependencia.findOne({ where: { nombre } });
        if (exists) throw new Error('Ya existe una dependencia con ese nombre.');
      }
      return true;
    }),
  body('estado')
    .optional()
    .isBoolean()
    .withMessage('El estado debe ser true o false.')
];