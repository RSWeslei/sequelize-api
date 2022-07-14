import { DataTypes } from "sequelize";
import { sequelize } from "../config/config";

import Autor from "./Autor";
import Categoria from "./Categoria";
import Emprestimo from "./Emprestimo";

const Livro = sequelize.define(
    'livros',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        sinopse: {
            type: DataTypes.STRING(5000),
            allowNull: true
        }

    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);
Livro.belongsTo(Autor, {
    as: 'autor',
    foreignKey: {
        field: 'id_autor',
        name: 'idAutor',
        allowNull: false
    }
})

Livro.belongsTo(Categoria, {
    as: 'categoria',
    foreignKey: {
        field: 'id_categoria',
        name: 'idCategoria',
        allowNull: false
    }
})

export default Livro