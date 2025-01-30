import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from './userModel.js'; // Assurez-vous d'importer le modèle User
import Commercial from './commercialModel.js';
class Supplier extends Model {}

Supplier.init(
{

    IdUsers: {
        type: DataTypes.INTEGER,
        references: {
        model: User,
        key: 'IdUsers'
        },
        onDelete: 'CASCADE' // Utilisez la suppression en cascade
    },
    IdCommercial: {
        type: DataTypes.INTEGER,
        references: {
        model: Commercial,
        key: 'IdCommercial'
        },
        onDelete: 'CASCADE' // Utilisez la suppression en cascade
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    NameMarque: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    NumberSiret: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    PostalCode: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'Supplier',
    tableName: 'Supplier'
}
);
export default Responsable;

