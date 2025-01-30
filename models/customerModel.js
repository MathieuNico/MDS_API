import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from './userModel.js'; // Assurez-vous d'importer le modèle User

class Customer extends Model {}

Customer.init(
  {
    // Définissez les autres champs de votre modèle
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
    Address: {
      type: DataTypes.STRING,
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
    modelName: 'Customer',
    tableName: 'Customer'
  }
);

export default Customer;