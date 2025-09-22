import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const necesidad_contratacion = sequelize.define("necesidad_contratacion", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false }, // ✅ SUGERENCIA: Cambiar a 50 para que coincida con DB
  estado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
  tableName: "necesidad_contratacion",
  timestamps: true,
  underscored: true, // ✅ AÑADIR: Para que Sequelize espere created_at y updated_at
});

export default necesidad_contratacion;