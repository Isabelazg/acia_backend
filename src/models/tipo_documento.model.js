import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const tipo_documento = sequelize.define("tipo_documento", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false }, // ✅ SUGERENCIA: Cambiar a 50 para que coincida con DB
}, {
  tableName: "tipo_documento",
  timestamps: true,
  underscored: true, // ✅ AÑADIR: Para que Sequelize espere created_at y updated_at
});

export default tipo_documento;