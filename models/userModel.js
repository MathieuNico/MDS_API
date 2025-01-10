import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
class User extends Model {}
User.init(
    {
        IdUsers: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        Login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
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

    },
    {
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
    },
);

export default User;