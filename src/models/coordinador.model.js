import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';



const Coordinador = sequelize.define(
  'Coordinador',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    // estado removed from model because DB no longer contains this column
    // If you need a logical active/inactive flag, reintroduce the column in the database schema first.
    centros_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'centros',
        key: 'id',
      },
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
    tableName: 'coordinadores',
    timestamps: false,
  }
);


export default Coordinador;
