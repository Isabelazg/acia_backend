import { body, param } from 'express-validator';
import Autorizacion from '../../models/autorizacion.model.js';

const numeroParamValidator = [
  param('numero')
    .isString()
    .withMessage('El número de autorización debe ser una cadena de texto.')
    .isLength({ min: 1, max: 50 })
    .withMessage('El número de autorización debe tener entre 1 y 50 caracteres.')
    .notEmpty()
    .withMessage('El número de autorización es obligatorio.')
];

const createAutorizacionValidator = [
  body('numero_autorizacion')
    .isString()
    .withMessage('El número de autorización debe ser una cadena de texto.')
    .isLength({ max: 50 })
    .withMessage('El número de autorización no puede tener más de 50 caracteres.')
    .notEmpty()
    .withMessage('El número de autorización es obligatorio.')
    .custom(async (numero_autorizacion) => {
      const existingAutorizacion = await Autorizacion.findOne({ where: { numero_autorizacion } });
      if (existingAutorizacion) {
        throw new Error('El número de autorización ya está en uso.');
      }
    }),

  body('fecha')
    .isDate()
    .withMessage('La fecha debe ser una fecha válida.')
    .notEmpty()
    .withMessage('La fecha es obligatoria.'),

  body('vigencia')
    .isString()
    .withMessage('La vigencia debe ser una cadena de texto.')
    .isLength({ max: 5 })
    .withMessage('La vigencia no puede tener más de 5 caracteres.')
    .notEmpty()
    .withMessage('La vigencia es obligatoria.')
    .matches(/^\d{4}$/)
    .withMessage('La vigencia debe ser un año de 4 dígitos.')
    .custom((vigencia, { req }) => {
      // Validar que la vigencia coincida con el año de la fecha
      if (req.body.fecha) {
        const fechaAutorizacion = new Date(req.body.fecha);
        const yearFecha = fechaAutorizacion.getFullYear();
        const vigenciaYear = parseInt(vigencia);
        if (vigenciaYear !== yearFecha) {
          throw new Error('La vigencia debe coincidir con el año de la fecha de autorización.');
        }
      }
      return true;
    }),

  body('tipo_contratacion_id')
    .isInt({ min: 1 })
    .withMessage('El tipo de contratación debe ser un número entero válido.')
    .notEmpty()
    .withMessage('El tipo de contratación es obligatorio.'),

  body('fecha_estudios_previos')
    .optional()
    .isDate()
    .withMessage('La fecha de estudios previos debe ser una fecha válida.'),

  body('fecha_inexistencia')
    .optional()
    .isDate()
    .withMessage('La fecha de inexistencia debe ser una fecha válida.'),

  body('ordenador_id')
    .isInt({ min: 1 })
    .withMessage('El ordenador debe ser un número entero válido.')
    .notEmpty()
    .withMessage('El ordenador es obligatorio.'),

  body('objeto')
    .isString()
    .withMessage('El objeto debe ser una cadena de texto.')
    .notEmpty()
    .withMessage('El objeto es obligatorio.'),

  body('cantidad_autorizados')
    .isInt({ min: 1 })
    .withMessage('La cantidad de autorizados debe ser un número entero mayor a 0.')
    .notEmpty()
    .withMessage('La cantidad de autorizados es obligatoria.'),

  body('cdp_id')
    .isInt({ min: 1 })
    .withMessage('El CDP debe ser un número entero válido.')
    .notEmpty()
    .withMessage('El CDP es obligatorio.'),

  body('necesidad_contratacion_id')
    .isInt({ min: 1 })
    .withMessage('La necesidad de contratación debe ser un número entero válido.')
    .notEmpty()
    .withMessage('La necesidad de contratación es obligatoria.'),

  body('centro_id')
    .isInt({ min: 1 })
    .withMessage('El centro debe ser un número entero válido.')
    .notEmpty()
    .withMessage('El centro es obligatorio.'),

  body('descripcion')
    .optional()
    .isString()
    .withMessage('La descripción debe ser una cadena de texto.')
    .isLength({ max: 500 })
    .withMessage('La descripción no puede tener más de 500 caracteres.'),

  body('programa_acreditacion')
    .optional({ nullable: true })
    .isString()
    .withMessage('El programa de acreditación debe ser una cadena de texto.')
    .isLength({ max: 100 })
    .withMessage('El programa de acreditación no puede tener más de 100 caracteres.'),

  // Nuevo campo: numero_linea_PAA
  body('numero_linea_PAA')
    .optional()
    .isString()
    .withMessage('El número de línea PAA debe ser una cadena de texto.')
    .isLength({ max: 500 })
    .withMessage('El número de línea PAA no puede tener más de 500 caracteres.'),

  // Opcional: obligaciones asociadas a la autorización (array de ids)
  body('obligacion_ids')
    .optional()
    .isArray()
    .withMessage('obligacion_ids debe ser un array de identificadores.'),
  body('obligacion_ids.*')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Cada obligacion_id debe ser un entero válido.'),

  // Opcional: obligaciones nuevas proporcionadas como texto para crear
  body('obligaciones_texto')
    .optional()
    .isArray()
    .withMessage('obligaciones_texto debe ser un array de textos.'),
  body('obligaciones_texto.*')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Cada obligación de texto debe ser una cadena no vacía.')

];

const updateAutorizacionValidator = [
  body('numero_autorizacion')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El número de autorización es obligatorio.')
    .isString()
    .withMessage('El número de autorización debe ser una cadena de texto.')
    .isLength({ max: 50 })
    .withMessage('El número de autorización no puede tener más de 50 caracteres.')
    .custom(async (numero_autorizacion, { req }) => {
      const numero = req.params.numero;
      const currentAutorizacion = await Autorizacion.findOne({ where: { numero_autorizacion: numero } });
      if (!currentAutorizacion) {
        throw new Error('La autorización a actualizar no existe.');
      }
      // Si el número es diferente al actual, verifica unicidad
      if (numero_autorizacion !== currentAutorizacion.numero_autorizacion) {
        const exists = await Autorizacion.findOne({ where: { numero_autorizacion } });
        if (exists) {
          throw new Error('Ya existe una autorización con ese número.');
        }
      }
      return true;
    }),

  body('fecha')
    .optional()
    .isDate()
    .withMessage('La fecha debe ser una fecha válida.'),

  body('vigencia')
    .optional()
    .isString()
    .withMessage('La vigencia debe ser una cadena de texto.')
    .isLength({ max: 5 })
    .withMessage('La vigencia no puede tener más de 5 caracteres.'),

  body('tipo_contratacion_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El tipo de contratación debe ser un número entero válido.'),

  body('fecha_estudios_previos')
    .optional()
    .isDate()
    .withMessage('La fecha de estudios previos debe ser una fecha válida.'),

  body('fecha_inexistencia')
    .optional()
    .isDate()
    .withMessage('La fecha de inexistencia debe ser una fecha válida.'),

  body('ordenador_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El ordenador debe ser un número entero válido.'),

  body('objeto')
    .optional()
    .isString()
    .withMessage('El objeto debe ser una cadena de texto.'),

  body('cantidad_autorizados')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La cantidad de autorizados debe ser un número entero mayor a 0.'),

  body('cdp_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El CDP debe ser un número entero válido.'),

  body('necesidad_contratacion_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La necesidad de contratación debe ser un número entero válido.'),

  body('centro_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El centro debe ser un número entero válido.'),

  body('descripcion')
    .optional()
    .isString()
    .withMessage('La descripción debe ser una cadena de texto.')
    .isLength({ max: 500 })
    .withMessage('La descripción no puede tener más de 500 caracteres.'),

  body('programa_acreditacion')
    .optional()
    .isString()
    .withMessage('El programa de acreditación debe ser una cadena de texto.')
    .isLength({ max: 100 })
    .withMessage('El programa de acreditación no puede tener más de 100 caracteres.'),

  // numero_linea_PAA en update
  body('numero_linea_PAA')
    .optional()
    .isString()
    .withMessage('El número de línea PAA debe ser una cadena de texto.')
    .isLength({ max: 500 })
    .withMessage('El número de línea PAA no puede tener más de 500 caracteres.'),

  // Opcional: obligaciones asociadas a la autorización (array de ids)
  body('obligacion_ids')
    .optional()
    .isArray()
    .withMessage('obligacion_ids debe ser un array de identificadores.'),
  body('obligacion_ids.*')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Cada obligacion_id debe ser un entero válido.'),

  // Opcional: obligaciones nuevas proporcionadas como texto para crear
  body('obligaciones_texto')
    .optional()
    .isArray()
    .withMessage('obligaciones_texto debe ser un array de textos.'),
  body('obligaciones_texto.*')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Cada obligación de texto debe ser una cadena no vacía.'),

];

export { createAutorizacionValidator, updateAutorizacionValidator, numeroParamValidator };
