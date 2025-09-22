import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const educacion_formal = sequelize.define("educacion_formales", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nivel_formacion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { isInt: true, min: 1 },
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: { notEmpty: true, len: [3, 255] },
  },
  institucion: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { notEmpty: true, len: [2, 100] },
  },
  numero_semestres: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fecha_inicio: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  fecha_terminacion: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  estado_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { isInt: true, min: 1 },
  },
  informacion_personal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { isInt: true, min: 1 },
  },
}, {
  tableName: "educacion_formales",
  timestamps: true,
  underscored: true,
});

export default educacion_formal;
