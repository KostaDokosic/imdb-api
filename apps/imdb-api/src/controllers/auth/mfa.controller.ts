import DBClient from '@util/database';
import { errorResponse, responseServerError } from '@util/errors';
import Logger from '@util/logger';
import { Request, Response } from 'express';
import { generateSecret, verifyToken } from 'node-2fa';

export const requestMfa = async (req: Request, res: Response) => {
  try {
    if (req.session.user.mfaEnabled)
      return errorResponse(res, 'MFA has already been enabled!', 'mfa');

    // const secret = process.env.MFA_SECRET;
    const { uri, secret, qr } = generateSecret({
      name: process.env.NX_APP_NAME,
      account: req.session.user.email,
    });

    await DBClient.instance.user.update({
      where: { id: req.session.user.id },
      data: { mfaCode: secret },
    });

    req.session.user.mfaCode = secret;

    res.status(201).send({ qr, secret, uri });
  } catch (e) {
    Logger.error(e);
    responseServerError(res);
  }
};

const verifyMfa = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const valid: null | { delta: number } = verifyToken(
      req.session.user.mfaCode,
      code
    );

    if (!valid || valid.delta !== 0)
      return errorResponse(res, 'Invalid code provided!', 'code');

    await DBClient.instance.user.update({
      where: { id: req.session.user.id },
      data: { mfaEnabled: true },
    });

    req.session.user.mfaEnabled = true;

    return res
      .status(200)
      .json({ success: true, message: 'MFA successfully enabled!' });
  } catch (e) {
    Logger.error(e);
    responseServerError(res);
  }
};

export default verifyMfa;
