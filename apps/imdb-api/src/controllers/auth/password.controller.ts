import DBClient from '@util/database';
import { errorResponse, responseServerError } from '@util/errors';
import Logger from '@util/logger';
import sendEmail from '@util/mailer';
import { hash } from 'argon2';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    if (req.session.passwordResetCode)
      return errorResponse(
        res,
        'Password reset code has already been send to your email!',
        'email'
      );
    const { email } = req.body;
    const user = await DBClient.instance.user.findUnique({ where: { email } });
    if (!user)
      return errorResponse(
        res,
        'Account with this email was not found!',
        'email'
      );
    const code = randomUUID();
    req.session.passwordResetCode = code;
    req.session.userId = user.id;
    sendEmail(user.email, 'Password Reset', 'passwordReset', { code });
    return res.status(201).json({
      message: `Verification code has been send to ${user.email}`,
    });
  } catch (e) {
    Logger.error(e);
    responseServerError(res);
  }
};
export const passwordReset = async (req: Request, res: Response) => {
  try {
    if (!req.session.passwordResetCode || !req.session.userId)
      return errorResponse(
        res,
        'Verification code has not been requested yet!',
        'code'
      );
    const { code, password } = req.body;
    if (req.session.passwordResetCode !== code)
      return errorResponse(res, 'Invalid verification code provided', 'code');

    const hashedPassword = await hash(password);
    await DBClient.instance.user.update({
      where: { id: req.session.userId },
      data: { password: hashedPassword },
    });

    req.session.passwordResetCode = undefined;
    req.session.userId = undefined;
    return res.status(201).json({ message: 'Password successfully reset!' });
  } catch (e) {
    Logger.error(e);
    responseServerError(res);
  }
};

export default passwordReset;
