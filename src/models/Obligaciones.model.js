import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

/**
 * Modelo Sequelize para la tabla 'obligaciones'.
 * NOTA MUY IMPORTANTE: El nombre del modelo es 'Obligacion' (singular)
 * por convención de Sequelize, aunque la tabla en la DB sea 'obligaciones' (plural).
 */
const Obligacion = sequelize.define("Obligacion", { // ⭐⭐ CORRECCIÓN CLAVE: Nombre del modelo en singular ⭐⭐
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  numero_orden: {
    type: DataTypes.STRING(100), // Coincide con varchar(100) de tu DB
    allowNull: false,
    unique: true // Asumiendo que el numero_orden debe ser único
  },
  nombre: {
    type: DataTypes.TEXT, // Coincide con longtext de tu DB
    allowNull: true // Asumiendo que puede ser NULL
  },
}, {
  tableName: "obligaciones", // Nombre real de la tabla en la base de datos (esto sí es plural y es correcto)
  timestamps: true,
  underscored: true,
});

export default Obligacion; // ⭐⭐ CORRECCIÓN CLAVE: Exporta el modelo en singular ⭐⭐
