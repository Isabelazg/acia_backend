import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Contrato = sequelize.define(
  'Contrato',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    supervisor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'supervisores',
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
    coordinador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'coordinadores',
        key: 'id'
      },
      onDelete: 'RESTRICT'
    },
    acta_seleccion: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    fecha_acta_seleccion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tiene_poliza: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    tipo_ejecucion_contrato: {
      type: DataTypes.ENUM('Meses', 'Horas'),
      allowNull: false,
    },
    valor_mensual: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    fecha_estimada_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_estimada_terminacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lugar_ejecucion: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    domicilio_contractual: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    // obligacion_id moved: obligations are now associated to Autorizacion via autorizacion_obligacion
    // but keep the field here as nullable for backward compatibility with existing DB schema
    obligacion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'obligaciones',
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
    centro_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'centros',
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
    informacion_personal_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'informacion_personales',
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
    tiene_plan_pagos: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: 'contratos',
    timestamps: false,
  }
);

export default Contrato;
