import { body, param } from "express-validator";

// Validador para ID en parámetros (ruta)
const ideducacion_informalValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo."),
];

// Validador para crear una sola educación informal
const createeducacion_informalValidator = [
  body("tipo_formacion_id")
    .isInt({ min: 1 })
    .withMessage("El ID del título de formación debe ser un número entero positivo.")
    .notEmpty().withMessage("El ID del título de formación no puede estar vacío."),

  body("institucion")
    .isString()
    .isLength({ min: 3, max: 150 })
    .withMessage("La institución debe tener entre 3 y 150 caracteres.")
    .notEmpty().withMessage("La institución no puede estar vacía."),

  body("fecha_inicio")
    .isISO8601().toDate()
    .withMessage("La fecha de inicio debe ser una fecha válida (YYYY-MM-DD).")
    .notEmpty().withMessage("La fecha de inicio es obligatoria."),

  body("fecha_terminacion")
    .isISO8601().toDate()
    .withMessage("La fecha de terminación debe ser una fecha válida (YYYY-MM-DD).")
    .optional({ nullable: true }),

  body("intensidad_horaria")
    .isInt({ min: 1 })
    .withMessage("La intensidad horaria debe ser un número entero positivo.")
    .optional({ nullable: true }),

  body("estado_id")
    .isInt({ min: 0 })
    .withMessage("El ID del estado debe ser un número entero."),

  body("informacion_personal_id")
    .isInt({ min: 1 })
    .withMessage("El ID de la información personal debe ser un número entero positivo.")
    .notEmpty().withMessage("El ID de información personal es obligatorio."),
];

// Validador para actualizar una educación informal
const updateeducacion_informalValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo."),

  body("titulo_formacion_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID del título de formación debe ser un número entero positivo."),

  body("institucion")
    .optional()
    .isString()
    .isLength({ min: 3, max: 150 })
    .withMessage("La institución debe tener entre 3 y 150 caracteres."),

  body("fecha_inicio")
    .optional()
    .isISO8601().toDate()
    .withMessage("La fecha de inicio debe ser una fecha válida (YYYY-MM-DD)."),

  body("fecha_terminacion")
    .optional({ nullable: true })
    .isISO8601().toDate()
    .withMessage("La fecha de terminación debe ser una fecha válida (YYYY-MM-DD)."),

  body("intensidad_horaria")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage("La intensidad horaria debe ser un número entero positivo."),

  body("estado_id")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El ID del estado debe ser un número entero."),

  body("informacion_personal_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID de la información personal debe ser un número entero positivo."),
];

// Validador para crear múltiples educaciones informales
const createMultipleEducacionesInformalesValidator = [
  body("educaciones")
    .isArray({ min: 1 })
    .withMessage("Debe enviar al menos una educación informal."),

  body("educaciones.*.titulo_formacion_id")
    .isInt({ min: 1 })
    .withMessage("El ID del título de formación debe ser un número entero positivo.")
    .notEmpty().withMessage("El ID del título de formación es obligatorio."),

  body("educaciones.*.institucion")
    .isString()
    .isLength({ min: 3, max: 150 })
    .withMessage("La institución debe tener entre 3 y 150 caracteres.")
    .notEmpty().withMessage("La institución no puede estar vacía."),

  body("educaciones.*.fecha_inicio")
    .isISO8601().toDate()
    .withMessage("La fecha de inicio debe ser una fecha válida (YYYY-MM-DD).")
    .notEmpty().withMessage("La fecha de inicio es obligatoria."),

  body("educaciones.*.fecha_terminacion")
    .optional({ nullable: true })
    .isISO8601().toDate()
    .withMessage("La fecha de terminación debe ser una fecha válida (YYYY-MM-DD)."),

  body("educaciones.*.intensidad_horaria")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage("La intensidad horaria debe ser un número entero positivo."),

  body("educaciones.*.estado_id")
    .isInt({ min: 0 })
    .withMessage("El ID del estado debe ser un número entero."),

  body("educaciones.*.informacion_personal_id")
    .isInt({ min: 1 })
    .withMessage("El ID de la información personal debe ser un número entero positivo.")
    .notEmpty().withMessage("El ID de información personal es obligatorio."),
];

export {
  createeducacion_informalValidator,
  updateeducacion_informalValidator,
  ideducacion_informalValidator,
  createMultipleEducacionesInformalesValidator,
};