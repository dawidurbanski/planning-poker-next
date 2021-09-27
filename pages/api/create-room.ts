import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import sequelize from '../../db/sequelize';
import Voting from '../../model/voting';
import Room from '../../model/room';
import type { RoomAttributes } from '../../model/room';

type Error = {
  message: string;
}

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RoomAttributes|Error>
) {
  const { body } = req;
  const { name } = body;

  const session = getSession(req, res);
  const userId = session?.user["https://planning-poker.poc/claims/db/id"];

  try {
    await sequelize.authenticate();

    try {
      const createdVoting = await Voting.create({ name: 'voting' });

      const key = nanoid();
      const createdRoom = await Room.create({
        name,
        key,
        owner_ID: userId,
        voting_ID: createdVoting.id
      });

      res.status(200).json({
        id: createdRoom.id,
        owner_ID: createdRoom.owner_ID,
        voting_ID: createdVoting.id,
        key,
        name
      });
    } catch (error: any) {
      res.status(422).json({ message: error.errors[0].message });
    }
  } catch (error) {
    res.status(403).json({ message: 'Unable to connect to database' });
  }
});