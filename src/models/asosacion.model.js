// src/models/associations.js
import informacion_personal from "./informacion_personal.model.js";
import informacion_previa_contrato from "./informacion_previa_contrato.model.js";

// Asociación de uno a uno (One-to-One)
// Un registro de informacion_personal tiene un registro de informacion_previa_contrato
informacion_personal.hasOne(informacion_previa_contrato, {
  foreignKey: 'informacion_personales_id',
  as: 'informacionPreviaContrato'
});

// Un registro de informacion_previa_contrato pertenece a un registro de informacion_personal
informacion_previa_contrato.belongsTo(informacion_personal, {
  foreignKey: 'informacion_personales_id',
  as: 'informacionPreviaContrato'
});