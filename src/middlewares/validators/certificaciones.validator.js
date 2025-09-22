import { body, param } from "express-validator";

const idcertificacionValidator = [
  param("id").isInt({ min: 1 }).withMessage("El ID debe ser un número entero positivo."),
];

const createcertificacionValidator = [
  body("persona_id").isInt({ min: 1 }).notEmpty(),
  body("nombre").isString().isLength({ min: 3, max: 150 }).notEmpty(),
  body("entidad").isString().isLength({ min: 3, max: 150 }).notEmpty(),
  body("fecha").isDate().notEmpty(),
];

const updatecertificacionValidator = [
  param("id").isInt({ min: 1 }),
  body("nombre").optional().isString().isLength({ min: 3, max: 150 }),
  body("entidad").optional().isString().isLength({ min: 3, max: 150 }),
];

export {
  createcertificacionValidator,
  updatecertificacionValidator,
  idcertificacionValidator,
};
