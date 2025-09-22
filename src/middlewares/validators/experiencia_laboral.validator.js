import { body, param } from "express-validator";

const idexperiencia_laboralValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo."),
];

const createexperiencia_laboralValidator = [
  body("informacion_personal_id")
    .isInt({ min: 1 })
    .withMessage("El ID de la información personal debe ser un número entero positivo.")
    .notEmpty()
    .withMessage("El ID de la información personal es obligatorio."),

  body("empresa")
    .isString()
    .withMessage("La empresa debe ser una cadena de texto.")
    .isLength({ min: 3, max: 150 })
    .withMessage("La empresa debe tener entre 3 y 150 caracteres.")
    .notEmpty()
    .withMessage("La empresa es obligatoria."),

  body("cargo")
    .isString()
    .withMessage("El cargo debe ser una cadena de texto.")
    .isLength({ min: 3, max: 100 })
    .withMessage("El cargo debe tener entre 3 y 100 caracteres.")
    .notEmpty()
    .withMessage("El cargo es obligatorio."),

  body("fecha_ingreso")
    .isISO8601()
    .withMessage("La fecha de ingreso debe tener un formato válido (YYYY-MM-DD).")
    .notEmpty()
    .withMessage("La fecha de inicio es obligatoria."),

  body("fecha_retiro")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("La fecha de retiro debe tener un formato válido (YYYY-MM-DD)."),
];

const updateexperiencia_laboralValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo."),
  
  body("informacion_personal_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID de la información personal debe ser un número entero positivo."),

  body("empresa")
    .optional()
    .isString()
    .isLength({ min: 3, max: 150 })
    .withMessage("La empresa debe tener entre 3 y 150 caracteres."),

  body("cargo")
    .optional()
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("El cargo debe tener entre 3 y 100 caracteres."),

  body("fecha_ingreso")
    .optional()
    .isISO8601()
    .withMessage("La fecha de ingreso debe tener un formato válido (YYYY-MM-DD)."),

  body("fecha_retiro")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("La fecha de retiro debe tener un formato válido (YYYY-MM-DD)."),
];

// Validador para crear múltiples experiencias laborales
const createMultipleexperienciasValidator = [
  body("experiencias")
    .isArray({ min: 1 })
    .withMessage("Debe enviar un array de experiencias laborales válido."),

  body("experiencias.*.informacion_personal_id")
    .isInt({ min: 1 })
    .withMessage("El ID de la información personal debe ser un número entero positivo.")
    .notEmpty()
    .withMessage("El ID de la información personal es obligatorio."),
    
  body("experiencias.*.empresa")
    .isString()
    .withMessage("La empresa debe ser una cadena de texto.")
    .isLength({ min: 3, max: 150 })
    .withMessage("La empresa debe tener entre 3 y 150 caracteres.")
    .notEmpty()
    .withMessage("La empresa es obligatoria."),

  body("experiencias.*.cargo")
    .isString()
    .withMessage("El cargo debe ser una cadena de texto.")
    .isLength({ min: 3, max: 100 })
    .withMessage("El cargo debe tener entre 3 y 100 caracteres.")
    .notEmpty()
    .withMessage("El cargo es obligatorio."),

  body("experiencias.*.fecha_ingreso")
    .isISO8601()
    .withMessage("La fecha de ingreso debe tener un formato válido (YYYY-MM-DD).")
    .notEmpty()
    .withMessage("La fecha de inicio es obligatoria."),
    
  body("experiencias.*.fecha_retiro")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("La fecha de retiro debe tener un formato válido (YYYY-MM-DD)."),
];

export {
  createexperiencia_laboralValidator,
  updateexperiencia_laboralValidator,
  idexperiencia_laboralValidator,
  createMultipleexperienciasValidator,
};