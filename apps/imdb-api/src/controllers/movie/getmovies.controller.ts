import { Movie, Prisma } from '@prisma/client';
import redisClient from '@util/cache';
import DBClient from '@util/database';
import paginate, { SortOrder } from '@util/pagination';
import { Request, Response } from 'express';

const getMovies = async (req: Request, res: Response) => {
  const { page = 1, sortBy = 'asc' } = req.query;

  const key = `movies?page=${page}&sortBy=${sortBy}`;
  const exists = await redisClient.exists(key);
  if (exists) {
    const moviesJson = await redisClient.getObject(key);
    return res.json(JSON.parse(moviesJson));
  }

  const movies = await paginate<Movie, Prisma.MovieFindManyArgs>(
    DBClient.instance.movie,
    {
      select: {
        id: true,
        title: true,
        views: true,
        year: true,
        runtime: true,
        image: true,
        description: false,
        genres: true,
      },
      orderBy: {
        id: sortBy as SortOrder,
      },
    },
    {
      page: Number(page) || 1,
    }
  );
  redisClient.setObject(key, movies);
  return res.json(movies);
};

export default getMovies;
