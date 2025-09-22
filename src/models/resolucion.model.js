import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Resolucion = sequelize.define(
  'Resolucion',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    acta_posesion: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    fecha_posesion: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fecha_ingreso: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fecha_retiro: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    es_encargado: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
    },
    centro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'centros',
        key: 'id',
      },
    },
    ordenadores_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ordenadores',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'resoluciones',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Resolucion;
