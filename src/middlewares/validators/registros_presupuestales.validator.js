import { body, param } from "express-validator";

// Validador para ID en parámetros (ruta)
const idRegistroPresupuestalValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo."),
];

// Validador para crear un registro presupuestal
const createRegistroPresupuestalValidator = [
  body("numero_proceso_secop")
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("El número de proceso SECOP debe tener entre 3 y 100 caracteres.")
    .notEmpty()
    .withMessage("El número de proceso SECOP no puede estar vacío."),

  body("link_proceso_secop")
    .optional({ nullable: true })
    .isString()
    .isLength({ max: 500 })
    .withMessage("El link de proceso SECOP no debe exceder 500 caracteres."),

  body("contratos_id")
    .isInt({ min: 1 })
    .withMessage("El ID del contrato debe ser un número entero positivo.")
    .notEmpty()
    .withMessage("El ID del contrato es obligatorio."),
];

// Validador para actualizar un registro presupuestal
const updateRegistroPresupuestalValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo."),

  body("numero_proceso_secop")
    .optional()
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("El número de proceso SECOP debe tener entre 3 y 100 caracteres."),

  body("link_proceso_secop")
    .optional({ nullable: true })
    .isString()
    .isLength({ max: 500 })
    .withMessage("El link de proceso SECOP no debe exceder 500 caracteres."),

  body("contratos_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID del contrato debe ser un número entero positivo."),
];

// Validador para crear múltiples registros presupuestales
const createMultipleRegistrosPresupuestalesValidator = [
  body("registros")
    .isArray({ min: 1 })
    .withMessage("Debe enviar al menos un registro presupuestal."),

  body("registros.*.numero_proceso_secop")
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("El número de proceso SECOP debe tener entre 3 y 100 caracteres.")
    .notEmpty()
    .withMessage("El número de proceso SECOP no puede estar vacío."),

  body("registros.*.link_proceso_secop")
    .optional({ nullable: true })
    .isString()
    .isLength({ max: 500 })
    .withMessage("El link de proceso SECOP no debe exceder 500 caracteres."),

  body("registros.*.contratos_id")
    .isInt({ min: 1 })
    .withMessage("El ID del contrato debe ser un número entero positivo.")
    .notEmpty()
    .withMessage("El ID del contrato es obligatorio."),
];

export {
  createRegistroPresupuestalValidator,
  updateRegistroPresupuestalValidator,
  idRegistroPresupuestalValidator,
  createMultipleRegistrosPresupuestalesValidator,
};
