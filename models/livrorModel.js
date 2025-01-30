import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from './userModel.js'; // Assurez-vous d'importer le modèle User

class Livror extends Model {}

Livror.init(
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
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Livror',
    tableName: 'Livror'
  }
);

export default Livror;