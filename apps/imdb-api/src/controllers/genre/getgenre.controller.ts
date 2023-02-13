import redisClient from '@util/cache';
import DBClient from '@util/database';
import { sanitizeGenre } from '@util/sanitizers';
import { Request, Response } from 'express';

const getGenre = async (req: Request, res: Response) => {
  const { id } = req.params;

  const key = `genre?id=${id}`;
  const exists = await redisClient.exists(key);
  if (exists) {
    const genreJson = await redisClient.getObject(key);
    return res.json(JSON.parse(genreJson));
  }

  const genre = await DBClient.instance.genre.findUnique({
    where: { id: Number(id) },
  });

  redisClient.setObject(key, genre);

  return res.json(sanitizeGenre(genre));
};

export default getGenre;
