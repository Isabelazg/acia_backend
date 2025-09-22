import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import bcrypt from 'bcryptjs';

const Usuario = sequelize.define(
  'Usuario',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    documento: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    nombres: {
      type: DataTypes.STRING(50),
      allowNull: false,
      set(value) {
        // Guarda con la primera letra de cada palabra en mayúscula
        this.setDataValue(
          'nombres',
          value
            .toLowerCase()
            .replace(/\b\w/g, l => l.toUpperCase())
        );
      },
      get() {
        // Devuelve con la primera letra de cada palabra en mayúscula
        const rawValue = this.getDataValue('nombres');
        return rawValue
          ? rawValue
            .toLowerCase()
            .replace(/\b\w/g, l => l.toUpperCase())
          : rawValue;
      }
    },
    apellidos: {
      type: DataTypes.STRING(50),
      allowNull: false,
      set(value) {
        this.setDataValue(
          'apellidos',
          value
            .toLowerCase()
            .replace(/\b\w/g, l => l.toUpperCase())
        );
      },
      get() {
        const rawValue = this.getDataValue('apellidos');
        return rawValue
          ? rawValue
            .toLowerCase()
            .replace(/\b\w/g, l => l.toUpperCase())
          : rawValue;
      }
    },
    nombre_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      get() {
        const rawValue = this.getDataValue('nombre_usuario');
        return rawValue ? rawValue.toLowerCase() : rawValue;
      }
    },
    correo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      get() {
        const rawValue = this.getDataValue('correo');
        return rawValue ? rawValue.toLowerCase() : rawValue;
      }
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    contrasena: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    // NUEVAS PROPIEDADES PARA RESET PASSWORD
    reset_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reset_token_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'id',
      },
    },
  },
  {
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// Método estático para comparar contraseñas
Usuario.comparePassword = async function (plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Método estático para generar una nueva contraseña encriptada
Usuario.generatePassword = async function (plainPassword) {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};

export default Usuario;