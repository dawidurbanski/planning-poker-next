import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize';

type VotingAttributes = {
  id: number;
  name: string;
}

class Voting extends Model<VotingAttributes, {}> implements VotingAttributes {
  public id!: number;
  public name!: string;
}

Voting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  },
  {
    tableName: 'voting',
    timestamps: false,
    sequelize
  }
);

export default Voting;
export type { VotingAttributes };