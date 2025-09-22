import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const FormacionesComplementarias = sequelize.define(
  "FormacionesComplementarias",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    informatica_basica: {
      type: DataTypes.BOOLEAN, // tinyint(1) en MySQL se mapea como BOOLEAN
      allowNull: false,
      defaultValue: 0,
    },
    tics: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    sve: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    formacion_pedagogica: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    formacion_competencias: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    formacion_proyectos: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "formaciones_complementarias",
    timestamps: true, // usa created_at y updated_at
    underscored: true, // para que Sequelize entienda los _
  }
);

export default FormacionesComplementarias;
