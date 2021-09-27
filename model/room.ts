import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize';

type RoomAttributes = {
  id: number;
  owner_ID: number;
  voting_ID: number;
  name: string;
  key: string;
}

class Room extends Model<RoomAttributes, {}> implements RoomAttributes {
  public id!: number;
  public owner_ID!: number;
  public voting_ID!: number;
  public name!: string;
  public key!: string;
}

Room.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      owner_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      voting_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      tableName: 'room',
      timestamps: false,
      sequelize
    }
  );

export default Room;
export type { RoomAttributes };