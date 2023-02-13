import { Genre, Prisma } from '@prisma/client';
import redisClient from '@util/cache';
import DBClient from '@util/database';
import paginate, { SortOrder } from '@util/pagination';
import { Request, Response } from 'express';

const getGenres = async (req: Request, res: Response) => {
  const { page = 1, sortBy = 'asc' } = req.query;

  const key = `genres?page=${page}&sortBy=${sortBy}`;
  const exists = await redisClient.exists(key);
  if (exists) {
    const genresJson = await redisClient.getObject(key);
    return res.json(JSON.parse(genresJson));
  }

  const genres = await paginate<Genre, Prisma.UserFindManyArgs>(
    DBClient.instance.genre,
    {
      orderBy: {
        id: sortBy as SortOrder,
      },
    },
    {
      page: Number(page) || 1,
    }
  );
  redisClient.setObject(key, genres);
  return res.json(genres);
};

export default getGenres;
