import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '../../db/sequelize';
import Session from '../../model/session';

type Data = {
  id: number
}

type Error = {
  message: string;
}

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data|Error>
) {
  const { body } = req;
  const { room_id } = body;

  const session = getSession(req, res);
  const userId = session?.user["https://planning-poker.poc/claims/db/id"];

  try {
    await sequelize.authenticate();

    try {
      await Session.destroy({
        where: {
          user_ID: userId,
          room_ID: room_id
        }
      });

      res.status(200).json({ message: 'User left the session' });
    } catch (error: any) {    
      res.status(422).json({ message: error.errors[0].message });
    }
  } catch (error) {
    res.status(403).json({ message: 'Unable to connect to database' });
  }
});