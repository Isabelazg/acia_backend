import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const nivel_formacion = sequelize.define("nivel_formacion", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false }, // ✅ SUGERENCIA: Cambiar a 50 para que coincida con DB
  estado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
  tableName: "nivel_formacion",
  timestamps: true,
  underscored: true, // ✅ AÑADIR: Para que Sequelize espere created_at y updated_at
});

export default nivel_formacion;