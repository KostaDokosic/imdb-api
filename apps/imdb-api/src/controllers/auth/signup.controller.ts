import DBClient from '@util/database';
import { Request, Response } from 'express';
import { hash } from 'argon2';
import { sanitizeUser } from '@util/sanitizers';
import { responseServerError } from '@util/errors';
import sendEmail from '@util/mailer';
import { randomUUID } from 'crypto';
import Logger from '@util/logger';

const signUp = async (req: Request, res: Response) => {
  const { name, password, email } = req.body;

  try {
    const hashedPassword = await hash(password);
    const code = randomUUID();
    const user = await DBClient.instance.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
        verificationCode: code,
      },
    });
    req.session.user = user;
    sendEmail(user.email, 'Email verification', 'verification', {
      name: user.name,
      code,
    });
    return res.status(201).json(sanitizeUser(user));
  } catch (e) {
    Logger.error(e);
    return responseServerError(res);
  }
};

export default signUp;
