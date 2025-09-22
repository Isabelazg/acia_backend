// src/models/certificacion.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Certificaciones = sequelize.define("Certificaciones", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  codigo_norma: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  nombre_norma: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  institucion: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  fecha_expedicion: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fecha_vigencia: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  informacion_personal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "certificaciones", // 👈 nombre exacto de la tabla
  timestamps: true,
  underscored: true,
});

export default Certificaciones;
