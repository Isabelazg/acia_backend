// src/models/informacion_previa_contrato.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const informaciones_previas_contratos = sequelize.define("informaciones_previas_contratos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  banco: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  tipo_cuenta: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  numero_cuenta: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  regimenes_ivas_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  servicios_excluidos_iva: {
    type: DataTypes.BOOLEAN, // 👈 tinyint(1) en MySQL → BOOLEAN en Sequelize
    allowNull: false,
    defaultValue: false,
  },
  eps: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  fondo_pensiones: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  informacion_personales_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clasificacion_persona_natural_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "informaciones_previas_contratos", // 👈 nombre real de la tabla
  timestamps: true,
  underscored: true,
});

export default informaciones_previas_contratos;
