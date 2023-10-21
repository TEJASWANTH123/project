// src/models/user.ts (Create a separate model file for User)

import { Sequelize, DataTypes, Model } from 'sequelize';
import { connect } from '../config/db'; // Import your database connection function

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../mydatabase.sqlite', // Specify the path to your SQLite database file
  logging: console.log, // Enable query logging
});

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users', // Set the table name explicitly
    timestamps: false, // Disable timestamps
  }
);

export default User;
