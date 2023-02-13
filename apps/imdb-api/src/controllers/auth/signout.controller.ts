import { responseServerError } from '@util/errors';
import { Request, Response } from 'express';

const signOut = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return responseServerError(res);
    return res.status(200).json({ success: true });
  });
};

export default signOut;
