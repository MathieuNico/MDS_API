import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from './userModel.js'; // Assurez-vous d'importer le modèle User

class Responsable extends Model {}

Responsable.init(
{

    IdUsers: {
        type: DataTypes.INTEGER,
        references: {
        model: User,
        key: 'IdUsers'
        },
        onDelete: 'CASCADE' // Utilisez la suppression en cascade
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PostalCode: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'Responsable',
    tableName: 'Responsable'
}
);

User.hasMany(Responsable, { foreignKey: 'IdUsers', onDelete: 'CASCADE' });
Responsable.belongsTo(User, { foreignKey: 'IdUsers', onDelete: 'CASCADE' });

export default Responsable;

