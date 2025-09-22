import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const ExperienciaLaboral = sequelize.define("experiencia_laboral", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  empresa: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  cargo: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  fecha_ingreso: { 
    type: DataTypes.DATEONLY, 
    allowNull: false 
  },
  fecha_retiro: { 
    type: DataTypes.DATEONLY, 
    allowNull: true 
  },
  experiencia_docente: { 
    type: DataTypes.BOOLEAN, 
    allowNull: false, 
    defaultValue: false 
  },
  informacion_personal_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
}, {
  tableName: "experiencias_laboral", 
  timestamps: true,
  underscored: true,
});

export default ExperienciaLaboral;
