import { body, param } from "express-validator";

const idinfo_previa_contratoValidator = [
  param("id").isInt({ min: 1 }).withMessage("El ID debe ser un número entero positivo."),
];

const createinfo_previa_contratoValidator = [
  body("persona_id").isInt({ min: 1 }).notEmpty(),
  body("eps").isString().isLength({ min: 3, max: 150 }).notEmpty(),
  body("fondo_pensiones").isString().isLength({ min: 3, max: 150 }).notEmpty(),
  body("fondo_cesantias").isString().isLength({ min: 3, max: 150 }).notEmpty(),
];

const updateinfo_previa_contratoValidator = [
  param("id").isInt({ min: 1 }),
  body("eps").optional().isString().isLength({ min: 3, max: 150 }),
  body("fondo_pensiones").optional().isString().isLength({ min: 3, max: 150 }),
];

export {
  createinfo_previa_contratoValidator,
  updateinfo_previa_contratoValidator,
  idinfo_previa_contratoValidator,
};
