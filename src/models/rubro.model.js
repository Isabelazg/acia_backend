import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Rubro = sequelize.define(
  'Rubro',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    codigo_rubro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(400),
      allowNull: false,
    },
  },
  {
    tableName: 'rubros',
    timestamps: false,
  }
);

export default Rubro;
