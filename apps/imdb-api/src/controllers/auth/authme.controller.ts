import { sanitizeUser } from '@util/sanitizers';
import { Request, Response } from 'express';

const authMe = (req: Request, res: Response) => {
  return res.status(200).json(sanitizeUser(req.session.user));
};

export default authMe;
