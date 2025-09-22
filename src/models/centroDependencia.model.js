import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const CentroDependencia = sequelize.define('CentroDependencia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  centro_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dependencia_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'centro_dependencia',
  timestamps: false,
});

export default CentroDependencia;