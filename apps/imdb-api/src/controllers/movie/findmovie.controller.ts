import DBClient from '@util/database';
import { responseServerError } from '@util/errors';
import Logger from '@util/logger';
import { Request, Response } from 'express';

const findMovies = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    const movies = await DBClient.instance.movie.findMany({
      where: { title: { search: name as string } },
      take: 5,
      skip: 0,
    });

    return res.json(movies);
  } catch (e) {
    Logger.error(e);
    responseServerError(res);
  }
};

export default findMovies;
