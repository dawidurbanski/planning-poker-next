import type { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '../../db/sequelize';
import User from '../../model/user';

type Data = {
  id: number
}

type Error = {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data|Error>
) {
  const { body } = req;
  const { name, email } = body;

  try {
    await sequelize.authenticate();

    try {
      const createdUser = await User.create({
        username: name,
        email
      });

      res.status(200).json({ id: createdUser.id });
    } catch (error: any) {
      res.status(422).json({ message: error.errors[0].message });
    }
  } catch (error) {
    res.status(403).json({ message: 'Unable to connect to database' });
  }
}