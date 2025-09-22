import { body, param } from 'express-validator';
import Ordenador from '../../models/ordenador.model.js';

// ===================== VALIDACIONES REUTILIZABLES =====================

// Validaciones de parámetros
const documentoParamValidator = [
  param('documento')
    .isString()
    .withMessage('El documento debe ser una cadena de texto válida.')
    .notEmpty()
    .withMessage('El documento es obligatorio.')
];

const idParamValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero válido.')
    .notEmpty()
    .withMessage('El ID es obligatorio.')
];

// Validaciones de campos reutilizables
const documentoValidation = (isRequired = true, isUpdate = false) => {
  let validation = body('documento')
    .isString()
    .withMessage('El documento debe ser una cadena de texto.')
    .isLength({ min: 7, max: 25 })
    .withMessage('El documento debe tener entre 7 y 25 caracteres.')
    .matches(/^\d+$/)
    .withMessage('El documento solo puede contener números.');

  if (isRequired) {
    validation = validation.notEmpty().withMessage('El documento es obligatorio.');
  } else {
    validation = validation.optional();
  }

  return validation.custom(async (documento, { req }) => {
    if (!documento) return; // Si es opcional y no se proporciona, skip validation

    if (isUpdate) {
      // Para updates, verificar si el documento cambió
      const currentId = req.params.id;
      const currentDocumento = req.params.documento;

      let currentOrdenador;
      if (currentId) {
        currentOrdenador = await Ordenador.findOne({ where: { id: currentId } });
      } else if (currentDocumento) {
        currentOrdenador = await Ordenador.findOne({ where: { documento: currentDocumento } });
      }

      if (!currentOrdenador) {
        throw new Error('El ordenador a actualizar no existe.');
      }

      // Si el documento es diferente al actual, verifica unicidad
      if (documento !== currentOrdenador.documento) {
        const exists = await Ordenador.findOne({ where: { documento } });
        if (exists) {
          throw new Error('Ya existe un ordenador con ese documento.');
        }
      }
    } else {
      // Para crear, solo verificar que no exista
      const existingOrdenador = await Ordenador.findOne({ where: { documento } });
      if (existingOrdenador) {
        throw new Error('Ya existe un ordenador con ese documento.');
      }
    }
  });
};

const nombresValidation = (isRequired = true) => {
  let validation = body('nombres')
    .isString()
    .withMessage('Los nombres deben ser una cadena de texto.')
    .isLength({ min: 2, max: 50 })
    .withMessage('Los nombres deben tener entre 2 y 50 caracteres.')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('Los nombres solo pueden contener letras y espacios.');

  if (isRequired) {
    validation = validation.notEmpty().withMessage('Los nombres son obligatorios.');
  } else {
    validation = validation.optional().trim().notEmpty().withMessage('Los nombres son obligatorios.');
  }

  return validation;
};

const apellidosValidation = (isRequired = true) => {
  let validation = body('apellidos')
    .isString()
    .withMessage('Los apellidos deben ser una cadena de texto.')
    .isLength({ min: 2, max: 50 })
    .withMessage('Los apellidos deben tener entre 2 y 50 caracteres.')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('Los apellidos solo pueden contener letras y espacios.');

  if (isRequired) {
    validation = validation.notEmpty().withMessage('Los apellidos son obligatorios.');
  } else {
    validation = validation.optional().trim().notEmpty().withMessage('Los apellidos son obligatorios.');
  }

  return validation;
};

const lugarExpedicionValidation = (isRequired = true) => {
  let validation = body('lugar_expedicion_id')
    .isInt({ min: 1 })
    .withMessage('El lugar de expedición debe ser un número entero válido.');

  if (isRequired) {
    validation = validation.notEmpty().withMessage('El lugar de expedición es obligatorio.');
  } else {
    validation = validation.optional();
  }

  return validation;
};

const lugarDomicilioValidation = (isRequired = true) => {
  let validation = body('lugar_domicilio_id')
    .isInt({ min: 1 })
    .withMessage('El lugar de domicilio debe ser un número entero válido.');

  if (isRequired) {
    validation = validation.notEmpty().withMessage('El lugar de domicilio es obligatorio.');
  } else {
    validation = validation.optional();
  }

  return validation;
};

const sexoValidation = () => {
  return body('sexo')
    .optional()
    .isInt({ min: 0, max: 1 })
    .withMessage('El sexo debe ser 0 (femenino) o 1 (masculino).')
    .toInt();
};

const correoValidation = () => {
  return body('correo')
    .optional()
    .isEmail()
    .withMessage('El correo debe tener un formato válido.')
    .isLength({ max: 100 })
    .withMessage('El correo no puede tener más de 100 caracteres.');
};

const telefonoValidation = () => {
  return body('telefono')
    .optional()
    .isString()
    .withMessage('El teléfono debe ser una cadena de texto.')
    .isLength({ min: 7, max: 20 })
    .withMessage('El teléfono debe tener entre 7 y 20 caracteres.')
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('El teléfono solo puede contener números, espacios, paréntesis, guiones y el signo +.');
};

// Validaciones para campos relacionados con resoluciones
const fechaIsoOptional = (fieldName) => {
  return body(fieldName)
    .optional()
    .isISO8601()
    .withMessage(`${fieldName} debe ser una fecha con formato ISO (YYYY-MM-DD).`);
};

const actaPosesionValidation = () => {
  return body('acta_posesion')
    .optional()
    .isString()
    .withMessage('El acta de posesión debe ser una cadena de texto.')
    .isLength({ max: 100 })
    .withMessage('El acta de posesión no puede tener más de 100 caracteres.');
};

const esEncargadoValidation = () => {
  return body('es_encargado')
    .optional()
    .isIn([0, 1, '0', '1'])
    .withMessage('El campo es_encargado debe ser 0 o 1.');
};

const estadoValidation = (isRequired = false) => {
  let validation = body('estado')
    .isBoolean()
    .withMessage('El estado debe ser true (activo) o false (inactivo).');

  if (isRequired) {
    validation = validation.notEmpty().withMessage('El estado es obligatorio.');
  } else {
    validation = validation.optional();
  }

  return validation;
};

const cargoValidation = (isRequired = true) => {
  let validation = body('cargo_id')
    .isInt({ min: 1 })
    .withMessage('El cargo debe ser un número entero válido.');

  if (isRequired) {
    validation = validation.notEmpty().withMessage('El cargo es obligatorio.');
  } else {
    validation = validation.optional();
  }

  return validation;
};

// ===================== VALIDADORES PRINCIPALES =====================

// ===================== VALIDADORES PRINCIPALES =====================

const createOrdenadorValidator = [
  documentoValidation(true, false), // requerido, no es update
  nombresValidation(true),          // requerido
  apellidosValidation(true),        // requerido
  lugarExpedicionValidation(true),  // requerido
  lugarDomicilioValidation(true),   // requerido
  sexoValidation(),                 // opcional
  correoValidation(),               // opcional
  telefonoValidation(),             // opcional
  actaPosesionValidation(),         // opcional
  fechaIsoOptional('fecha_resolucion'),
  fechaIsoOptional('fecha_posesion'),
  fechaIsoOptional('fecha_ingreso'),
  fechaIsoOptional('fecha_retiro'),
  esEncargadoValidation(),
  estadoValidation(false),          // opcional
  cargoValidation(true)             // requerido
];

const updateOrdenadorByIdValidator = [
  documentoValidation(false, true), // opcional, es update
  nombresValidation(false),         // opcional pero si se envía debe ser válido
  apellidosValidation(false),       // opcional pero si se envía debe ser válido
  lugarExpedicionValidation(false), // opcional
  lugarDomicilioValidation(false),  // opcional
  sexoValidation(),                 // opcional
  correoValidation(),               // opcional
  telefonoValidation(),             // opcional
  actaPosesionValidation(),         // opcional
  fechaIsoOptional('fecha_resolucion'),
  fechaIsoOptional('fecha_posesion'),
  fechaIsoOptional('fecha_ingreso'),
  fechaIsoOptional('fecha_retiro'),
  esEncargadoValidation(),
  estadoValidation(false),          // opcional
  cargoValidation(false)            // opcional
];

const updateOrdenadorValidator = [
  documentoValidation(false, true), // opcional, es update
  nombresValidation(false),         // opcional pero si se envía debe ser válido
  apellidosValidation(false),       // opcional pero si se envía debe ser válido
  lugarExpedicionValidation(false), // opcional
  lugarDomicilioValidation(false),  // opcional
  sexoValidation(),                 // opcional
  correoValidation(),               // opcional
  telefonoValidation(),             // opcional
  actaPosesionValidation(),
  fechaIsoOptional('fecha_resolucion'),
  fechaIsoOptional('fecha_posesion'),
  fechaIsoOptional('fecha_ingreso'),
  fechaIsoOptional('fecha_retiro'),
  esEncargadoValidation(),
  estadoValidation(false),          // opcional
  cargoValidation(false)            // opcional
];

const statusOrdenadorValidator = [
  estadoValidation(true)            // requerido para cambio de estado
];

export {
  createOrdenadorValidator,
  updateOrdenadorValidator,
  updateOrdenadorByIdValidator,
  documentoParamValidator,
  idParamValidator,
  statusOrdenadorValidator
};
