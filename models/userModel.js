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
        }

    },
    {
    sequelize, // We need to pass the connection instance
    modelName: 'User',
    timestamps:false // We need to choose the model name
    },
);

export default User;