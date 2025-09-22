import { body, param } from 'express-validator';
import Regional from '../../models/regional.model.js';

const codigoParamValidator = [
  param('codigo')
    .isString()
    .withMessage('El código debe ser una cadena de texto.')
    .isLength({ min: 1, max: 50 })
    .withMessage('El código debe tener entre 1 y 50 caracteres.')
    .notEmpty()
    .withMessage('El código es obligatorio.')
];

const cambiarEstadoValidator = [
  body('estado')
    .isBoolean()
    .withMessage('El estado debe ser un valor booleano.')
    .notEmpty()
    .withMessage('El estado es obligatorio.')
];

const createRegionalValidator = [
  body('codigo')
    .isString()
    .withMessage('El código debe ser una cadena de texto.')
    .isLength({ max: 20 })
    .withMessage('El código no puede tener más de 20 caracteres.')
    .notEmpty()
    .withMessage('El código es obligatorio.')
    .custom(async (codigo) => {
      const existingRegional = await Regional.findOne({ where: { codigo } });
      if (existingRegional) {
        throw new Error('El código ya está en uso.');
      }
    }),

  body('nombre')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ max: 300 })
    .withMessage('El nombre no puede tener más de 300 caracteres.')
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .custom(async (nombre) => {
      const existingRegional = await Regional.findOne({ where: { nombre } });
      if (existingRegional) {
        throw new Error('El nombre ya está en uso.');
      }
    }),
];

const updateRegionalValidator = [
  body('codigo')
    .trim()
    .notEmpty()
    .withMessage('El código es obligatorio.')
    .isString()
    .withMessage('El código debe ser una cadena de texto.')
    .isLength({ max: 20 })
    .withMessage('El código no puede tener más de 20 caracteres.')
    .custom(async (codigo, { req }) => {
      const id = req.params.codigo; // Se asume que `codigo` es el identificador único
      const currentRegional = await Regional.findOne({ where: { codigo: id } });
      if (!currentRegional) {
        throw new Error('La regional a actualizar no existe.');
      }
      // Si el código es diferente al actual, verifica unicidad
      if (codigo !== currentRegional.codigo) {
        const exists = await Regional.findOne({ where: { codigo } });
        if (exists) {
          throw new Error('Ya existe una regional con ese código.');
        }
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
    .isLength({ max: 300 })
    .withMessage('El nombre no puede tener más de 300 caracteres.')
    .custom(async (nombre, { req }) => {
      const id = req.params.codigo; // Se asume que `codigo` es el identificador único
      const currentRegional = await Regional.findOne({ where: { codigo: id } });
      if (!currentRegional) {
        throw new Error('La regional a actualizar no existe.');
      }
      // Si el nombre es diferente al actual, verifica unicidad
      if (nombre !== currentRegional.nombre) {
        const exists = await Regional.findOne({ where: { nombre } });
        if (exists) {
          throw new Error('Ya existe una regional con ese nombre.');
        }
      }
      return true;
    }),

];


export { createRegionalValidator, updateRegionalValidator, codigoParamValidator, cambiarEstadoValidator };