import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import Provincia from "./provincia.model.js";

const Ciudad = sequelize.define("Ciudad",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: { // Cambiado de "ciudad" a "nombre"
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        provincia_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'provincias', // Name of the referenced table
                key: 'id' // Key in the referenced table
            }
        }
    },
    {
        tableName: 'ciudades',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default Ciudad;