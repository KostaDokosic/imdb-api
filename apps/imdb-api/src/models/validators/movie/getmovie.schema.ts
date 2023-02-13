import DBClient from '@util/database';
import { param } from 'express-validator';

const getMovieSchema = [
  param('id')
    .exists({ checkFalsy: true })
    .withMessage('Movie id is required')
    .isInt()
    .withMessage('Invalid id provided')
    .customSanitizer((value) => Number(value))
    .custom(async (id: number) => {
      const movie = await DBClient.instance.movie.findUnique({
        where: { id },
      });
      if (movie) return true;
      throw new Error(`Movie ${id} does not exist!`);
    }),
];

export default getMovieSchema;
