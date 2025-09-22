import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const CargoCentro = sequelize.define(
  'CargoCentro',
  {
    id: {
      type: DataTypes.TINYINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cargo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cargos',
        key: 'id',
      },
    },
    centro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'centros',
        key: 'id',
      },
    },
  },
  {
    tableName: 'cargo_centro',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  }
);

export default CargoCentro;