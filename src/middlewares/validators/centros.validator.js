import { body, param } from 'express-validator';

const codigoParamValidator = [
    param('codigo')
        .isNumeric()
        .withMessage('El código debe ser numérico.')
        .isLength({ min: 1, max: 50 })
        .withMessage('El código debe tener entre 1 y 10 caracteres.')
        .notEmpty()
        .withMessage('El código es obligatorio.')
];

const cambiarEstadoValidator = [
    body('estado')
        .isBoolean()
        .withMessage('El estado debe ser un valor booleano (true o false).')
        .notEmpty()
        .withMessage('El estado es obligatorio.')
];

const createCentroValidator = [
    body('codigo')
        .isNumeric()
        .withMessage('El código debe contener solo números.')
        .isLength({ min: 1, max: 50 })
        .withMessage('El código debe tener entre 1 y 10 caracteres.')
        .notEmpty()
        .withMessage('El código es obligatorio.'),

    body('nombre')
        .isString()
        .withMessage('El nombre debe ser una cadena de texto.')
        .isLength({ min: 3, max: 300 })
        .withMessage('El nombre debe tener entre 3 y 300 caracteres.')
        .notEmpty()
        .withMessage('El nombre es obligatorio.')
        .trim(),

    body('direccion')
        .optional()
        .isString()
        .withMessage('La dirección debe ser una cadena de texto.')
        .isLength({ max: 255 })
        .withMessage('La dirección no puede tener más de 255 caracteres.')
        .trim(),

    body('ciudad_id')
        .isInt({ min: 1 })
        .withMessage('El ID de ciudad debe ser un número entero positivo.')
        .notEmpty()
        .withMessage('El ID de ciudad es obligatorio.'),

    body('regional_id')
        .isInt({ min: 1 })
        .withMessage('El ID de regional debe ser un número entero positivo.')
        .notEmpty()
        .withMessage('El ID de regional es obligatorio.'),

    body('supervisores_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El ID de supervisor debe ser un número entero positivo.'),

    body('estado')
        .optional()
        .isBoolean()
        .withMessage('El estado debe ser true o false.')
];

// Validador para actualización (NO valida el código porque ya existe)
const updateCentroValidator = [
    // Permitir cambio de código solo si es diferente al actual
    body('codigo')
        .optional()
        .isNumeric()
        .withMessage('El código debe contener solo números.')
        .isLength({ min: 1, max: 50 })
        .withMessage('El código debe tener entre 1 y 50 caracteres.'),

    body('nombre')
        .optional()
        .trim()
        .isString()
        .withMessage('El nombre debe ser una cadena de texto.')
        .isLength({ min: 3, max: 300 })
        .withMessage('El nombre debe tener entre 3 y 300 caracteres.'),

    body('direccion')
        .optional()
        .isString()
        .withMessage('La dirección debe ser una cadena de texto.')
        .isLength({ max: 255 })
        .withMessage('La dirección no puede tener más de 255 caracteres.')
        .trim(),

    body('ciudad_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El ID de ciudad debe ser un número entero positivo.'),

    body('regional_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El ID de regional debe ser un número entero positivo.'),

    body('supervisores_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El ID de supervisor debe ser un número entero positivo.'),

    body('estado')
        .optional()
        .isBoolean()
        .withMessage('El estado debe ser true o false.')
];

export { createCentroValidator, updateCentroValidator, codigoParamValidator, cambiarEstadoValidator };