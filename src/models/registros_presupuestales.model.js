import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const RegistrosPresupuestales = sequelize.define("registros_presupuestales", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  numero_proceso_secop: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  link_proceso_secop: {
    type: DataTypes.STRING(500),
    allowNull: true, // porque en la BD aparece como NULL permitido
  },
  contratos_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "registros_presupuestales",
  timestamps: true,        // porque tienes created_at y updated_at
  underscored: true,       // para mapear created_at y updated_at
});

export default RegistrosPresupuestales;
