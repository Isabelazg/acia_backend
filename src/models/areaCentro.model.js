import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const AreaCentro = sequelize.define('AreaCentro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  area_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  centro_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'area_centro',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
});

export default AreaCentro;