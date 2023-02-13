import DBClient from '@util/database';
import { responseServerError } from '@util/errors';
import Logger from '@util/logger';
import { sanitizeMovie } from '@util/sanitizers';
import { Request, Response } from 'express';

const attachGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { genres } = req.body;

    const movie = await DBClient.instance.movie.update({
      where: { id: Number(id) },
      data: {
        genres: {
          set: genres,
        },
      },
      // include: { genres },
    });
    return res.status(200).json(sanitizeMovie(movie));
  } catch (e) {
    Logger.error(e);
    responseServerError(res);
  }
};

export default attachGenre;
