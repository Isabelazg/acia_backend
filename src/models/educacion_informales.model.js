// src/models/educacion_informal.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const EducacionInformal = sequelize.define("EducacionInformal", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
tipo_formacion_id: {
  type: DataTypes.INTEGER,
  allowNull: false
},
  institucion: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  fecha_inicio: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fecha_terminacion: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  intensidad_horaria: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  estado_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  informacion_personal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  titulo:{
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: "educacion_informales", 
  timestamps: true,
  underscored: true,
});

export default EducacionInformal;
