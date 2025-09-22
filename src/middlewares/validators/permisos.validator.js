import { body, param } from "express-validator";

// Validador para el parámetro id
const idParamValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo.")
    .notEmpty()
    .withMessage("El ID es obligatorio."),
];

// Validador para cambio de estado
const cambiarEstadoValidator = [
  body("estado")
    .isBoolean()
    .withMessage('El estado debe ser true o false.')
    .notEmpty()
    .withMessage("El estado es obligatorio."),
];

// Validador para crear permisos
const permisosValidator = [
  body("nombre")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto.")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("El nombre solo puede contener letras, números y guiones bajos.")
    .notEmpty()
    .withMessage("El nombre es obligatorio."),
  body("descripcion")
    .optional()
    .isString()
    .withMessage("La descripción debe ser una cadena de texto.")
    .trim()
    .isLength({ max: 500 })
    .withMessage("La descripción no puede tener más de 500 caracteres."),
  body("estado")
    .optional()
    .isBoolean()
    .withMessage('El estado debe ser true o false.'),
];

// Validador específico para edición
const permisosEditValidator = [
  body("nombre")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto.")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("El nombre solo puede contener letras, números y guiones bajos.")
    .custom((value) => {
      if (value === '') {
        throw new Error('El nombre no puede estar vacío');
      }
      return true;
    }),
  body("descripcion")
    .optional()
    .isString()
    .withMessage("La descripción debe ser una cadena de texto.")
    .trim()
    .isLength({ max: 500 })
    .withMessage("La descripción no puede tener más de 500 caracteres."),
];

export {
  permisosValidator,
  permisosEditValidator,
  idParamValidator,
  cambiarEstadoValidator,
};

