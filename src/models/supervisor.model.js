import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import Centro from './centro.model.js'; // Asegúrate de que la ruta sea correcta

const Supervisor = sequelize.define('Supervisor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  sexo: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  cargo: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },

}, {
  tableName: 'supervisores',
  timestamps: false,
});



export default Supervisor;
