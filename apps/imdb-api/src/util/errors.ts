import { Response } from 'express';
import { sanitizeError } from './sanitizers';

export const errorResponse = (
  res: Response,
  message: string,
  value: string
) => {
  return res.status(400).json(sanitizeError(new Error(message), value));
};

export const responseServerError = (res: Response) => {
  return res
    .status(500)
    .json(
      sanitizeError(
        new Error('Something bad happen. Please try again...'),
        'unknown'
      )
    );
};

export const responseServerAuthentificationError = (
  res: Response,
  message: string
) => {
  return res
    .status(401)
    .json(sanitizeError(new Error(message), 'authentification'));
};
