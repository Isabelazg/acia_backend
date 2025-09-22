import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const regimenes_ivas = sequelize.define("regimenes_ivas", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombres: { type: DataTypes.STRING(50), allowNull: false }, // 👈 debe coincidir con la DB
  estado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
  tableName: "regimenes_ivas",
  timestamps: true,
  underscored: true, // usa created_at y updated_at, que sí existen en tu tabla
});

export default regimenes_ivas;
