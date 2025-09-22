import { body, param } from "express-validator";

// Validador para ID en parámetros (ruta)
const ideducacion_formalValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo."),
];

// Validador para crear una sola educación formal
const createeducacion_formalValidator = [
  // ELIMINADO: No se valida 'id' en la creación. La base de datos lo genera.
  // ELIMINADO: Se cambia 'nivel' por 'titulo' y 'nivel_formacion_id'.

  body("titulo")
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("El título debe tener entre 3 y 100 caracteres.")
    .notEmpty().withMessage("El título no puede estar vacío."),

  body("nivel_formacion_id")
    .isInt({ min: 1 })
    .withMessage("El ID del nivel de formación debe ser un número entero positivo.")
    .notEmpty().withMessage("El ID del nivel de formación no puede estar vacío."),

  body("institucion")
    .isString()
    .isLength({ min: 3, max: 150 })
    .withMessage("La institución debe tener entre 3 y 150 caracteres.")
    .notEmpty().withMessage("La institución no puede estar vacía."),

  body("numero_semestres")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage("El número de semestres debe ser un número entero positivo."),

  body("fecha_inicio")
    .isISO8601().toDate()
    .withMessage("La fecha de inicio debe ser una fecha válida (YYYY-MM-DD).")
    .notEmpty().withMessage("La fecha de inicio es obligatoria."),

  body("fecha_terminacion")
    .optional({ nullable: true })
    .isISO8601().toDate()
    .withMessage("La fecha de terminación debe ser una fecha válida (YYYY-MM-DD)."),

  body("estado_id")
    .isInt({ min: 0 })
    .withMessage("El ID del estado debe ser un número entero."),

  body("informacion_personal_id")
    .isInt({ min: 1 })
    .withMessage("El ID de la información personal debe ser un número entero positivo."),
];

// Validador para actualizar una educación formal
const updateeducacion_formalValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo."),

  // 'optional()' permite que los campos no se envíen en la solicitud PUT
  body("titulo")
    .optional()
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("El título debe tener entre 3 y 100 caracteres."),

  body("nivel_formacion_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID del nivel de formación debe ser un número entero positivo."),

  body("institucion")
    .optional()
    .isString()
    .isLength({ min: 3, max: 150 })
    .withMessage("La institución debe tener entre 3 y 150 caracteres."),

  body("numero_semestres")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage("El número de semestres debe ser un número entero positivo."),

  body("fecha_inicio")
    .optional()
    .isISO8601().toDate()
    .withMessage("La fecha de inicio debe ser una fecha válida (YYYY-MM-DD)."),

  body("fecha_terminacion")
    .optional({ nullable: true })
    .isISO8601().toDate()
    .withMessage("La fecha de terminación debe ser una fecha válida (YYYY-MM-DD)."),

  body("estado_id")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El ID del estado debe ser un número entero."),
  
  body("informacion_personal_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID de la información personal debe ser un número entero positivo."),
];

// Validador para crear múltiples educaciones formales
const createMultipleEducacionesValidator = [
  body("educaciones")
    .isArray({ min: 1 })
    .withMessage("Debe enviar al menos una educación formal."),
  
  // ELIMINADO: No se valida 'id' para la creación
  // CORREGIDO: Se cambia 'nivel' por 'nivel_formacion_id' y 'titulo'
  
  body("educaciones.*.nivel_formacion_id")
    .isInt({ min: 1 })
    .withMessage("El ID del nivel de formación debe ser un número entero positivo."),

  body("educaciones.*.titulo")
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("El título debe tener entre 3 y 100 caracteres.")
    .notEmpty().withMessage("El título no puede estar vacío."),

  body("educaciones.*.institucion")
    .isString()
    .isLength({ min: 3, max: 150 })
    .withMessage("La institución debe tener entre 3 y 150 caracteres.")
    .notEmpty().withMessage("La institución no puede estar vacía."),

  body("educaciones.*.numero_semestres")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage("El número de semestres debe ser un número entero positivo."),

  body("educaciones.*.fecha_inicio")
    .isISO8601().toDate()
    .withMessage("La fecha de inicio debe ser una fecha válida (YYYY-MM-DD).")
    .notEmpty().withMessage("La fecha de inicio es obligatoria."),

  body("educaciones.*.fecha_terminacion")
    .optional({ nullable: true })
    .isISO8601().toDate()
    .withMessage("La fecha de terminación debe ser una fecha válida (YYYY-MM-DD)."),

  body("educaciones.*.estado_id")
    .isInt({ min: 0 })
    .withMessage("El ID del estado debe ser un número entero."),

  body("educaciones.*.informacion_personal_id")
    .isInt({ min: 1 })
    .withMessage("El ID de la información personal debe ser un número entero positivo."),
];

export {
  createeducacion_formalValidator,
  updateeducacion_formalValidator,
  ideducacion_formalValidator,
  createMultipleEducacionesValidator,
};