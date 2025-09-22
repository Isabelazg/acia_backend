import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import Ciudad from "./ciudad.model.js";

const Provincia = sequelize.define("Provincia",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    },
    {
        tableName: 'provincias',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);


// Asociación definida en index.js para evitar error de inicialización circular.

export default Provincia;