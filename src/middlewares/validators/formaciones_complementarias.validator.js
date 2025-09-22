import { body, param } from "express-validator";

const idformacionescomplementariasValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo.")
    .notEmpty()
    .withMessage("El ID es obligatorio."),
];

const createformacionescomplementariasValidator = [
  body("informatica_basica")
    .isBoolean()
    .withMessage("El campo 'informatica_basica' debe ser true o false."),
  body("tics")
    .isBoolean()
    .withMessage("El campo 'tics' debe ser true o false."),
  body("sve")
    .isBoolean()
    .withMessage("El campo 'sve' debe ser true o false."),
  body("formacion_pedagogica")
    .isBoolean()
    .withMessage("El campo 'formacion_pedagogica' debe ser true o false."),
  body("formacion_competencias")
    .isBoolean()
    .withMessage("El campo 'formacion_competencias' debe ser true o false."),
  body("formacion_proyectos")
    .isBoolean()
    .withMessage("El campo 'formacion_proyectos' debe ser true o false."),
];

const updateformacionescomplementariasValidator = [
  body("informatica_basica")
    .optional()
    .isBoolean()
    .withMessage("El campo 'informatica_basica' debe ser true o false."),
  body("tics")
    .optional()
    .isBoolean()
    .withMessage("El campo 'tics' debe ser true o false."),
  body("sve")
    .optional()
    .isBoolean()
    .withMessage("El campo 'sve' debe ser true o false."),
  body("formacion_pedagogica")
    .optional()
    .isBoolean()
    .withMessage("El campo 'formacion_pedagogica' debe ser true o false."),
  body("formacion_competencias")
    .optional()
    .isBoolean()
    .withMessage("El campo 'formacion_competencias' debe ser true o false."),
  body("formacion_proyectos")
    .optional()
    .isBoolean()
    .withMessage("El campo 'formacion_proyectos' debe ser true o false."),
];

export {
  createformacionescomplementariasValidator,
  updateformacionescomplementariasValidator,
  idformacionescomplementariasValidator,
};
