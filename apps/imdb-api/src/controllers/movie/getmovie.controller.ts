import redisClient from '@util/cache';
import DBClient from '@util/database';
import { sanitizeMovie } from '@util/sanitizers';
import { Request, Response } from 'express';

const getMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  const key = `movie?id=${id}`;
  const exists = await redisClient.exists(key);
  if (exists) {
    const movieJson = await redisClient.getObject(key);
    return res.json(JSON.parse(movieJson));
  }

  const movie = await DBClient.instance.movie.findUnique({
    where: { id: Number(id) },
    include: { genres: true },
  });

  addMovieView(movie.id, movie.views);

  redisClient.setObject(key, movie);

  return res.json(sanitizeMovie(movie));
};

const addMovieView = async (id: number, currentViews: number) => {
  await DBClient.instance.movie.update({
    where: { id },
    data: { views: currentViews + 1 },
  });
};

export default getMovie;
