import DBClient from '@util/database';
import { errorResponse, responseServerError } from '@util/errors';
import Logger from '@util/logger';
import { sanitizeMovie } from '@util/sanitizers';
import { Request, Response } from 'express';

const createMovie = async (req: Request, res: Response) => {
  const { title, description, runtime, year, image } = req.body;

  try {
    const movie = await DBClient.instance.movie.create({
      data: {
        title,
        description,
        runtime,
        year,
        image,
      },
    });
    if (movie) return res.status(201).json(sanitizeMovie(movie));
    return errorResponse(
      res,
      'Unable to create movie. Please try again...',
      'movie'
    );
  } catch (e) {
    Logger.error(e);
    responseServerError(res);
  }
};

export default createMovie;
