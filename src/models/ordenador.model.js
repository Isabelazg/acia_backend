import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Ordenador = sequelize.define(
  'Ordenador',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    documento: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true,
    },
    nombres: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lugar_expedicion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lugar_domicilio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sexo: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: null,
    },
    correo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    cargo_id: {
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
    }
  },
  {
    tableName: 'ordenadores',
    timestamps: false,
  }
);

export default Ordenador;
