import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const clasificacion_persona_natural = sequelize.define("clasificacion_persona_natural", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombres: { type: DataTypes.STRING(50), allowNull: false }, // ✅ SUGERENCIA: Cambiar a 50 para que coincida con DB
  estado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
  tableName: "clasificacion_persona_natural",
  timestamps: true,
  underscored: true, // ✅ AÑADIR: Para que Sequelize espere created_at y updated_at
});

export default clasificacion_persona_natural;