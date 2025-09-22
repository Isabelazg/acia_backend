import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const CdpsRubros = sequelize.define(
  'CdpsRubros',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cdps_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rubros_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    fuente_recurso_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'cdps_rubros',
    timestamps: false,
  }
);

export default CdpsRubros;