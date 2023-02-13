import DBClient from '@util/database';
import { errorResponse, responseServerError } from '@util/errors';
import { Request, Response } from 'express';
import { verify } from 'argon2';
import { sanitizeUser } from '@util/sanitizers';
import Logger from '@util/logger';
import { verifyToken } from 'node-2fa';

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await DBClient.instance.user.findUnique({
      where: { email },
    });

    if (!user)
      return errorResponse(res, 'Invalid Credentials!', 'email or password');

    const passwordVerify = await verify(user.password, password);
    if (!passwordVerify)
      return errorResponse(res, 'Invalid Credentials!', 'email or password');

    if (user.mfaEnabled) {
      req.session.userId = user.id;
      return res
        .status(200)
        .json({ message: '2FA is enabled. Please provide verification code.' });
    }

    req.session.user = user;
    return res.status(200).json(sanitizeUser(user));
  } catch (e) {
    Logger.error(e);
    responseServerError(res);
  }
};

export const signInMfa = async (req: Request, res: Response) => {
  const { code } = req.body;

  try {
    if (!req.session.userId)
      return errorResponse(res, 'Please login first', 'login');

    const user = await DBClient.instance.user.findUnique({
      where: { id: req.session.userId },
    });

    const valid: null | { delta: number } = verifyToken(user.mfaCode, code);

    if (!valid || valid.delta !== 0)
      return errorResponse(res, 'Invalid code provided!', 'code');

    req.session.user = user;
    req.session.userId = undefined;
    return res.status(200).json(sanitizeUser(user));
  } catch (e) {
    Logger.error(e);
    responseServerError(res);
  }
};

export default signIn;
