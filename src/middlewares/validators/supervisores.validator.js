import { body, param } from 'express-validator';
import { Op } from 'sequelize';
import Supervisor from '../../models/supervisor.model.js';

const idParamValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo.')
    .notEmpty()
    .withMessage('El ID es obligatorio.')
];

const createSupervisorValidator = [
  body('documento')
    .isString()
    .withMessage('El documento debe ser una cadena de texto.')
    .isLength({ max: 25 })
    .withMessage('El documento no puede tener más de 25 caracteres.')
    .notEmpty()
    .withMessage('El documento es obligatorio.')
    .custom(async (documento) => {
      const existingSupervisor = await Supervisor.findOne({ where: { documento } });
      if (existingSupervisor) {
        throw new Error('El documento ya está en uso.');
      }
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

  body('sexo')
    .isInt({ min: 1, max: 2 })
    .withMessage('El sexo debe ser masculino (1) o femenino (2).')
    .notEmpty()
    .withMessage('El sexo es obligatorio.'),

  body('correo')
    .isEmail()
    .withMessage('El correo debe ser válido.')
    .notEmpty()
    .withMessage('El correo es obligatorio.')
    .custom(async (correo) => {
      const existingSupervisor = await Supervisor.findOne({ where: { correo } });
      if (existingSupervisor) {
        throw new Error('El correo ya está en uso.');
      }
    }),

  body('cargo')
    .isString()
    .withMessage('El cargo debe ser una cadena de texto.')
    .isLength({ max: 500 })
    .withMessage('El cargo no puede tener más de 500 caracteres.')
    .notEmpty()
    .withMessage('El cargo es obligatorio.')
];

const updateSupervisorValidator = [
  body('documento')
    .optional()
    .isString()
    .withMessage('El documento debe ser una cadena de texto.')
    .isLength({ max: 25 })
    .withMessage('El documento no puede tener más de 25 caracteres.')
    .notEmpty()
    .withMessage('El documento es obligatorio.')
    .custom(async (documento, { req }) => {
      if (documento) {
        const existingSupervisor = await Supervisor.findOne({
          where: {
            documento,
            id: { [Op.ne]: req.params.id }
          }
        });
        if (existingSupervisor) {
          throw new Error('El documento ya está en uso.');
        }
      }
    }),

  body('nombres')
    .optional()
    .isString()
    .withMessage('Los nombres deben ser una cadena de texto.')
    .isLength({ max: 50 })
    .withMessage('Los nombres no pueden tener más de 50 caracteres.')
    .notEmpty()
    .withMessage('Los nombres son obligatorios.'),

  body('apellidos')
    .optional()
    .isString()
    .withMessage('Los apellidos deben ser una cadena de texto.')
    .isLength({ max: 50 })
    .withMessage('Los apellidos no pueden tener más de 50 caracteres.')
    .notEmpty()
    .withMessage('Los apellidos son obligatorios.'),

  body('sexo')
    .optional()
    .isInt({ min: 1, max: 2 })
    .withMessage('El sexo debe ser masculino (1) o femenino (2).')
    .notEmpty()
    .withMessage('El sexo es obligatorio.'),

  body('correo')
    .optional()
    .isEmail()
    .withMessage('El correo debe ser válido.')
    .notEmpty()
    .withMessage('El correo es obligatorio.')
    .custom(async (correo, { req }) => {
      if (correo) {
        const existingSupervisor = await Supervisor.findOne({
          where: {
            correo,
            id: { [Op.ne]: req.params.id }
          }
        });
        if (existingSupervisor) {
          throw new Error('El correo ya está en uso.');
        }
      }
    }),

  body('cargo')
    .optional()
    .isString()
    .withMessage('El cargo debe ser una cadena de texto.')
    .isLength({ max: 500 })
    .withMessage('El cargo no puede tener más de 500 caracteres.')
    .notEmpty()
    .withMessage('El cargo es obligatorio.')
];

const cambiarEstadoValidator = [
  body('estado')
    .isBoolean()
    .withMessage('El estado debe ser un valor booleano.')
    .notEmpty()
    .withMessage('El estado es obligatorio.')
];

export { createSupervisorValidator, updateSupervisorValidator, idParamValidator, cambiarEstadoValidator };