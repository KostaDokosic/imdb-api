import DBClient from '@util/database';
import { errorResponse, responseServerError } from '@util/errors';
import Logger from '@util/logger';
import sendEmail from '@util/mailer';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

export const requestEmailVerification = (req: Request, res: Response) => {
  if (req.session.user.emailVerification)
    return errorResponse(res, 'Email already verified!', 'verification');

  const code = randomUUID();
  sendEmail(req.session.user.email, 'Email verification', 'verification', {
    name: req.session.user.name,
    code,
  });
  return res.status(201).json({
    message: 'Verification code has been sent to your email address!',
  });
};

const verifyEmail = async (req: Request, res: Response) => {
  try {
    if (req.session.user.emailVerification)
      return errorResponse(res, 'Email already verified!', 'verification');

    const { code } = req.body;
    if (code !== req.session.user.verificationCode)
      return errorResponse(res, 'Invalid verification code', 'code');

    await DBClient.instance.user.update({
      where: { id: req.session.user.id },
      data: { emailVerification: true, verificationCode: '' },
    });
    req.session.user.emailVerification = true;
    req.session.user.verificationCode = '';

    return res.status(201).json({ success: true });
  } catch (e) {
    Logger.error(e);
    responseServerError(res);
  }
};

export default verifyEmail;
