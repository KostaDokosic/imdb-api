import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: 'OK',
    date: new Date(),
  };

  return res.json(data);
};
