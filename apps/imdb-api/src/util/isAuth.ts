import { NextFunction, Request, Response } from 'express';
import { responseServerAuthentificationError } from './errors';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) return next();

  return responseServerAuthentificationError(res, 'Authentification required');
};

export const isNotAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) return next();

  return responseServerAuthentificationError(res, 'Already authentificated!');
};

export const mfaProtected = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.user.mfaEnabled) return next();

  return responseServerAuthentificationError(res, 'Please enable MFA first!');
};
