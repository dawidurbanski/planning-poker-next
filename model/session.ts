import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize';
import User from './user';

type SessionAttributes = {
  ID: number;
  user_ID: number;
  room_ID: number;
}

class Session extends Model<SessionAttributes, {}> implements SessionAttributes {
  public ID!: number;
  public user_ID!: number;
  public room_ID!: number;
  public User!: User;
}

Session.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    room_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'session',
    timestamps: false,
    sequelize
  }
);

Session.belongsTo(User, { foreignKey: 'user_ID' });
User.hasMany(Session, { foreignKey: 'user_ID' });

export default Session;