import { body, param } from "express-validator";

const idinformacion_personalValidator = [
  param("id").isInt({ min: 1 }).withMessage("El ID debe ser un número entero positivo."),
];

const createinformacion_personalValidator = [
  body("documento").isString().isLength({ min: 5, max: 20 }).notEmpty(),
  body("tipo_documentos_id").isInt({ min: 1 }).notEmpty(),
  body("ciudad_expedicion_id").isInt({ min: 1 }).notEmpty(),
  body("nombres").isString().isLength({ min: 3, max: 50 }).notEmpty(),
  body("apellidos").isString().isLength({ min: 3, max: 50 }).notEmpty(),
  body("sexo").isInt().notEmpty(),
  body("direccion_domicilio").isString().isLength({ min: 5, max: 100 }).notEmpty(),
  body("ciudad_domicilio_id").isInt({ min: 1 }).notEmpty(),
  body("celular_uno").isString().isLength({ min: 7, max: 15 }).notEmpty(),
  body("correo_personal").isEmail().isLength({ max: 100 }).notEmpty(),
];

const updateinformacion_personalValidator = [
  param("id").isInt({ min: 1 }),
  body("documento").optional().isString().isLength({ min: 5, max: 20 }),
  body("nombres").optional().isString().isLength({ min: 3, max: 50 }),
  body("apellidos").optional().isString().isLength({ min: 3, max: 50 }),
];

export {
  createinformacion_personalValidator,
  updateinformacion_personalValidator,
  idinformacion_personalValidator,
};