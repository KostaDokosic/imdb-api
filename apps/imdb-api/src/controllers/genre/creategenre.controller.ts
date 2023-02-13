import DBClient from '@util/database';
import { errorResponse, responseServerError } from '@util/errors';
import Logger from '@util/logger';
import { sanitizeGenre } from '@util/sanitizers';
import { Request, Response } from 'express';

const createGenre = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const genre = await DBClient.instance.genre.create({
      data: {
        name,
      },
    });
    if (genre) return res.status(201).json(sanitizeGenre(genre));
    return errorResponse(
      res,
      'Unable to create genre. Please try again...',
      'genre'
    );
  } catch (e) {
    Logger.error(e);
    responseServerError(res);
  }
};

export default createGenre;
