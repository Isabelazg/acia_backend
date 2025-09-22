import { body } from "express-validator";

export const createInformacionCompletaValidator = [
  // ===============================
  // 📌 INFORMACION PERSONAL
  // ===============================
  body("informacion_personal.documento")
    .isString().withMessage("El documento debe ser una cadena de texto.")
    .isLength({ min: 5, max: 20 }).withMessage("El documento debe tener entre 5 y 20 caracteres.")
    .notEmpty().withMessage("El documento es obligatorio."),

  body("informacion_personal.tipo_documentos_id")
    .isInt({ min: 1 }).withMessage("El tipo de documento ID debe ser un número entero positivo.")
    .notEmpty().withMessage("El tipo de documento ID es obligatorio."),

  body("informacion_personal.nombres")
    .isString().withMessage("Los nombres deben ser una cadena de texto.")
    .isLength({ min: 3, max: 50 }).withMessage("Los nombres deben tener entre 3 y 50 caracteres.")
    .notEmpty().withMessage("Los nombres son obligatorios."),

  body("informacion_personal.apellidos")
    .isString().withMessage("Los apellidos deben ser una cadena de texto.")
    .isLength({ min: 3, max: 50 }).withMessage("Los apellidos deben tener entre 3 y 50 caracteres.")
    .notEmpty().withMessage("Los apellidos son obligatorios."),

  body("informacion_personal.correo_personal")
    .isEmail().withMessage("Debe ser un correo válido.")
    .isLength({ max: 100 }).withMessage("El correo no puede exceder 100 caracteres.")
    .notEmpty().withMessage("El correo es obligatorio."),

  // ===============================
  // 📌 EDUCACION FORMAL
  // ===============================
  body("educacion_formal")
    .isArray().withMessage("La educación formal debe ser un arreglo."),
  // Validaciones condicionales: se aplican si el objeto del arreglo no está completamente vacío.
  body("educacion_formal.*.institucion")
    .if(body("educacion_formal.*.titulo").notEmpty())
    .notEmpty().withMessage("La institución es obligatoria para la educación formal."),
  body("educacion_formal.*.titulo")
    .if(body("educacion_formal.*.institucion").notEmpty())
    .notEmpty().withMessage("El título es obligatorio para la educación formal."),
  body("educacion_formal.*.nivel_formacion_id")
    .if(body("educacion_formal.*.titulo").notEmpty())
    .notEmpty().withMessage("El nivel de formación es obligatorio.").isInt({ min: 1 }),
  body("educacion_formal.*.fecha_inicio")
    .if(body("educacion_formal.*.titulo").notEmpty())
    .notEmpty().withMessage("La fecha de inicio es obligatoria.").isISO8601(),
  body("educacion_formal.*.estado_id")
    .if(body("educacion_formal.*.titulo").notEmpty())
    .notEmpty().withMessage("El estado de la formación es obligatorio.").isInt(),

  // ===============================
  // 📌 EDUCACION INFORMAL
  // ===============================
  body("educacion_informal")
    .isArray().withMessage("La educación informal debe ser un arreglo."),
  // Validaciones condicionales
  body("educacion_informal.*.tipo_formacion_id")
    .if(body("educacion_informal.*.titulo").notEmpty())
    .notEmpty().withMessage("El tipo de formación es obligatorio.").isInt({ min: 1 }),
  body("educacion_informal.*.titulo")
    .if(body("educacion_informal.*.tipo_formacion_id").notEmpty())
    .notEmpty().withMessage("El título es obligatorio para la educación informal."),
  body("educacion_informal.*.institucion")
    .if(body("educacion_informal.*.titulo").notEmpty())
    .notEmpty().withMessage("La institución es obligatoria para la educación informal."),

  // ===============================
  // 📌 CERTIFICACIONES
  // ===============================
  body("certificaciones")
    .isArray().withMessage("Las certificaciones deben ser un arreglo."),
  // Validaciones condicionales para certificaciones
  body("certificaciones.*.nombre_norma")
    .if(body("certificaciones.*.institucion").notEmpty())
    .notEmpty().withMessage("El nombre de la norma es obligatorio."),
  body("certificaciones.*.institucion")
    .if(body("certificaciones.*.nombre_norma").notEmpty())
    .notEmpty().withMessage("La institución de la certificación es obligatoria."),
  body("certificaciones.*.fecha_expedicion")
    .if(body("certificaciones.*.nombre_norma").notEmpty())
    .notEmpty().withMessage("La fecha de expedición es obligatoria.")
    .isISO8601().withMessage("El formato de la fecha de expedición debe ser YYYY-MM-DD."),

  // ===============================
  // 📌 EXPERIENCIA LABORAL
  // ===============================
  body("experiencia_laboral").isArray().withMessage("La experiencia laboral debe ser un arreglo."),
  body("experiencia_laboral.*.empresa")
    .notEmpty().withMessage("La empresa es obligatoria."),
  body("experiencia_laboral.*.cargo")
    .notEmpty().withMessage("El cargo es obligatorio."),
  body("experiencia_laboral.*.fecha_ingreso")
    .notEmpty().withMessage("La fecha de ingreso es obligatoria."),
  body("experiencia_laboral.*.experiencia_docente")
    .isBoolean().withMessage("El campo de experiencia docente debe ser un booleano."),

  // ===============================
  // 📌 INFORMACION PREVIA CONTRATO
  // ===============================
  body("informacion_previa_contrato")
    .isArray().withMessage("La información previa al contrato debe ser un arreglo."),

  // Validaciones condicionales: se aplican si el objeto del arreglo no está completamente vacío.
  // Usamos un campo clave como 'banco' o 'eps' para determinar si la sección fue llenada.
  body("informacion_previa_contrato.*.banco")
    .if(body("informacion_previa_contrato.*").custom(v => Object.values(v).some(field => field)))
    .notEmpty().withMessage("El banco es obligatorio."),
  body("informacion_previa_contrato.*.tipo_cuenta")
    .if(body("informacion_previa_contrato.*").custom(v => Object.values(v).some(field => field)))
    .notEmpty().withMessage("El tipo de cuenta es obligatorio."),
  body("informacion_previa_contrato.*.numero_cuenta")
    .if(body("informacion_previa_contrato.*").custom(v => Object.values(v).some(field => field)))
    .notEmpty().withMessage("El número de cuenta es obligatorio."),
  body("informacion_previa_contrato.*.eps")
    .if(body("informacion_previa_contrato.*").custom(v => Object.values(v).some(field => field)))
    .notEmpty().withMessage("La EPS es obligatoria."),
  body("informacion_previa_contrato.*.fondo_pensiones")
    .if(body("informacion_previa_contrato.*").custom(v => Object.values(v).some(field => field)))
    .notEmpty().withMessage("El fondo de pensiones es obligatorio."),
  body("informacion_previa_contrato.*.clasificacion_persona_natural_id")
    .if(body("informacion_previa_contrato.*").custom(v => Object.values(v).some(field => field)))
    .notEmpty().withMessage("La clasificación de persona natural es obligatoria.").isInt({ min: 1 }),

];
