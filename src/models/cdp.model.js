import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const CDP = sequelize.define(
  'CDP',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    vigencia: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    quien_expide_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fuente_recurso_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    centro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'cdps',
    timestamps: false,
  }
);

export default CDP;