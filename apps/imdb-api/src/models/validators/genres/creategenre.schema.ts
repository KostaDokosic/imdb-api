import DBClient from '@util/database';
import { body } from 'express-validator';

const createGenreSchema = [
  body('name')
    .exists({ checkFalsy: true })
    .withMessage('Genre name is required')
    .isString()
    .withMessage('Invalid name provided')
    .isLength({ max: 255, min: 2 })
    .withMessage('Maximum genre name length is 255 and minimum is 2 characters')
    .custom(async (name: string) => {
      const genre = await DBClient.instance.genre.findUnique({
        where: { name },
      });
      if (genre) throw new Error('Genre with this name already exists!');
      return true;
    }),
];

export default createGenreSchema;
