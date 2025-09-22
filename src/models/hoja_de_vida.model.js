import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const informacion_personal = sequelize.define("informacion_personales", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  documento: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [5, 20],
    },
  },
  tipo_documentos_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { isInt: true, min: 1 },
  },
  ciudad_expedicion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { isInt: true, min: 1 },
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  nombres: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: { notEmpty: true, len: [3, 50] },
  },
  apellidos: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: { notEmpty: true, len: [3, 50] },
  },
  sexo: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { isInt: true },
  },
  direccion_domicilio: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { notEmpty: true },
  },
  ciudad_domicilio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { isInt: true },
  },
  celular_uno: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: { notEmpty: true },
  },
  celular_dos: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  correo_personal: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { isEmail: true, notEmpty: true },
  },
  correo_institucional: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  cargo_actual_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tiempo_cargo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  area_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  foto: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  formaciones_complementarias_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  centro_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: "informacion_personales",
  timestamps: true,
  underscored: true,
});

export default informacion_personal;
