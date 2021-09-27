import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '../../db/sequelize';
import Session from '../../model/session';
import User from '../../model/user';

type Data = Array<Session>;

type Error = {
  message: string;
}

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data|Error>
) {
  const { body } = req;
  const { room_id } = body;

  await sequelize.authenticate();

  try {
    await sequelize.authenticate();

    try {
      const sessions = await Session.findAll({
        where: {
          room_ID: room_id
        },
        include: User
      });

      res.status(200).json(sessions);
    } catch (error: any) {      
      res.status(422).json({ message: error.errors[0].message });
    }
  } catch (error) {
    res.status(403).json({ message: 'Unable to connect to database' });
  }
});