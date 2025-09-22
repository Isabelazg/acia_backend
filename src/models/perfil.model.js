import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Perfil = sequelize.define(
  'Perfil',
  {
    idPerfil: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombrePerfil: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN, // Se almacena como TINYINT(1) en MySQL
      allowNull: false,
      defaultValue: true, // Por defecto, el usuario está activo (1)
    },
  },
  {
    tableName: 'perfiles',
    timestamps: false, // Si la tabla no tiene createdAt/updatedAt
  }
);

export default Perfil;
