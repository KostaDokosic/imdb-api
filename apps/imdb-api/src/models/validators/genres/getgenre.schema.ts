import DBClient from '@util/database';
import { param } from 'express-validator';

const getGenreSchema = [
  param('id')
    .exists({ checkFalsy: true })
    .withMessage('Genre id is required')
    .isInt()
    .withMessage('Invalid id provided')
    .customSanitizer((value) => Number(value))
    .custom(async (id: number) => {
      const genre = await DBClient.instance.genre.findUnique({
        where: { id },
      });
      if (genre) return true;
      throw new Error(`Genre ${id} does not exist!`);
    }),
];

export default getGenreSchema;
