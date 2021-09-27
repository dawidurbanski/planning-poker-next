import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize';

type UserAttributes = {
  id: number;
  username: string;
  email: string;
}

class User extends Model<UserAttributes, {}> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'user',
    timestamps: false,
    sequelize
  }
);

export default User;