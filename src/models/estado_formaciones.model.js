import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const EducacionFormal = sequelize.define("estado_formaciones", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  estado: { type: DataTypes.STRING(100), allowNull: false },
  nombre: { type: DataTypes.STRING(150), allowNull: false },
}, {
  tableName: "estado_formaciones",
  timestamps: true,
  underscored: true,
});

export default EducacionFormal;
