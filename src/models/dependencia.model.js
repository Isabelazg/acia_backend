import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import CentroDependencia from './centroDependencia.model.js';

const Dependencia = sequelize.define(
  'Dependencia',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(300),
      allowNull: false,
      unique: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    tableName: 'dependencias',
    timestamps: false,
  }
);

Dependencia.hasMany(CentroDependencia, {
  foreignKey: 'dependencia_id',
  as: 'centroDependencias'
});

export default Dependencia;