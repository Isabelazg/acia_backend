import { body, param } from 'express-validator';
import CoordinadorGrupoMixto from '../../models/coordinadoresGrupoMixto.model.js';

const documentoParamValidator = [
  param('documento')
    .isString()
    .withMessage('El documento debe ser una cadena de texto.')
    .isLength({ min: 1, max: 20 })
    .withMessage('El documento debe tener entre 1 y 20 caracteres.')
    .notEmpty()
    .withMessage('El documento es obligatorio.')
];

const cambiarEstadoValidator = [
  body('estado')
    .isBoolean()
    .withMessage('El estado debe ser un valor booleano.')
    .notEmpty()
    .withMessage('El estado es obligatorio.')
];

const createCoordinadorGrupoMixtoValidator = [
  body('documento')
    .isString()
    .withMessage('El documento debe ser una cadena de texto.')
    .isLength({ max: 20 })
    .withMessage('El documento no puede tener más de 20 caracteres.')
    .notEmpty()
    .withMessage('El documento es obligatorio.')
    .custom(async (documento) => {
      const existing = await CoordinadorGrupoMixto.findOne({ where: { documento } });
      if (existing) throw new Error('El documento ya está en uso.');
    }),
  body('correo')
    .isEmail()
    .withMessage('El correo debe ser válido.')
    .isLength({ max: 100 })
    .withMessage('El correo no puede tener más de 100 caracteres.')
    .notEmpty()
    .withMessage('El correo es obligatorio.')
    .custom(async (correo) => {
      const existing = await CoordinadorGrupoMixto.findOne({ where: { correo } });
      if (existing) throw new Error('El correo ya está en uso.');
    }),
  body('nombres')
    .isString()
    .withMessage('Los nombres deben ser una cadena de texto.')
    .isLength({ max: 50 })
    .withMessage('Los nombres no pueden tener más de 50 caracteres.')
    .notEmpty()
    .withMessage('Los nombres son obligatorios.'),
  body('apellidos')
    .isString()
    .withMessage('Los apellidos deben ser una cadena de texto.')
    .isLength({ max: 50 })
    .withMessage('Los apellidos no pueden tener más de 50 caracteres.')
    .notEmpty()
    .withMessage('Los apellidos son obligatorios.'),
  body('telefono')
    .optional()
    .isString()
    .withMessage('El teléfono debe ser una cadena de texto.')
    .isLength({ max: 20 })
    .withMessage('El teléfono no puede tener más de 20 caracteres.')
];

const updateCoordinadorGrupoMixtoValidator = [
  body('documento')
    .optional()
    .isString()
    .withMessage('El documento debe ser una cadena de texto.')
    .isLength({ max: 20 })
    .withMessage('El documento no puede tener más de 20 caracteres.')
    .custom(async (documento, { req }) => {
      if (!documento) return true;
      const actual = await CoordinadorGrupoMixto.findOne({ where: { documento: req.params.documento } });
      if (!actual) throw new Error('El coordinador grupo mixto a actualizar no existe.');
      if (documento !== req.params.documento) {
        const existe = await CoordinadorGrupoMixto.findOne({ where: { documento } });
        if (existe) throw new Error('Ya existe un coordinador grupo mixto con ese documento.');
      }
      return true;
    }),
  body('correo')
    .optional()
    .isEmail()
    .withMessage('El correo debe ser válido.')
    .isLength({ max: 100 })
    .withMessage('El correo no puede tener más de 100 caracteres.')
    .custom(async (correo, { req }) => {
      if (!correo) return true;
      const actual = await CoordinadorGrupoMixto.findOne({ where: { documento: req.params.documento } });
      if (!actual) throw new Error('El coordinador grupo mixto a actualizar no existe.');
      if (correo !== actual.correo) {
        const existe = await CoordinadorGrupoMixto.findOne({ where: { correo } });
        if (existe) throw new Error('Ya existe un coordinador grupo mixto con ese correo.');
      }
      return true;
    }),
  body('nombres')
    .optional()
    .isString()
    .withMessage('Los nombres deben ser una cadena de texto.')
    .isLength({ max: 50 })
    .withMessage('Los nombres no pueden tener más de 50 caracteres.'),
  body('apellidos')
    .optional()
    .isString()
    .withMessage('Los apellidos deben ser una cadena de texto.')
    .isLength({ max: 50 })
    .withMessage('Los apellidos no pueden tener más de 50 caracteres.'),
  body('telefono')
    .optional()
    .isString()
    .withMessage('El teléfono debe ser una cadena de texto.')
    .isLength({ max: 20 })
    .withMessage('El teléfono no puede tener más de 20 caracteres.')
];

export {
  createCoordinadorGrupoMixtoValidator,
  updateCoordinadorGrupoMixtoValidator,
  documentoParamValidator,
  cambiarEstadoValidator
};