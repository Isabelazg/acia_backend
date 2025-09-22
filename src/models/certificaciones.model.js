import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Certificacion = sequelize.define("certificaciones", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  persona_id: { type: DataTypes.INTEGER, allowNull: false },
  nombre: { type: DataTypes.STRING(150), allowNull: false },
  entidad: { type: DataTypes.STRING(150), allowNull: false },
  fecha: { type: DataTypes.DATEONLY, allowNull: false },
}, {
  tableName: "certificaciones",
  timestamps: true,
  underscored: true,
});

export default Certificacion;
