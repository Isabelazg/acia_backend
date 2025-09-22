import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Autorizacion = sequelize.define(
    'Autorizacion',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        numero_autorizacion: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        vigencia: {
            type: DataTypes.STRING(5),
            allowNull: false,
        },
        tipo_contratacion_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fecha_estudios_previos: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        fecha_inexistencia: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        ordenador_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        objeto: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        cantidad_autorizados: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        numero_linea_PAA: {
            type: DataTypes.STRING(500),
            allowNull: true, // allowNull true for backward compatibility; DB has NOT NULL - ensure migrations handled separately
        },
        cdp_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        necesidad_contratacion_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        centro_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        programa_acreditacion: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        tableName: 'autorizaciones',
        timestamps: false,
    }
);

export default Autorizacion;