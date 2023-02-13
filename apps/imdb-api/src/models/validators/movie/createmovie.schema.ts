import DBClient from '@util/database';
import { body } from 'express-validator';

const createMovieSchema = [
  body('title')
    .exists({ checkFalsy: true })
    .withMessage('Movie title is required')
    .isString()
    .withMessage('Invalid title provided')
    .isLength({ max: 255, min: 2 })
    .withMessage('Maximum title length is 255 and minimum is 2 characters')
    .custom(async (title: string) => {
      const movie = await DBClient.instance.movie.findUnique({
        where: { title },
      });
      if (movie) throw new Error('Movie with this title already exists!');
      return true;
    }),
  body('description')
    .exists({ checkFalsy: true })
    .withMessage('Movie description is required')
    .isString()
    .withMessage('Invalid description provided')
    .isLength({ max: 5000, min: 10 })
    .withMessage('Maximum title length is 5000 and minimum is 10 characters'),
  body('year')
    .exists({ checkFalsy: true })
    .withMessage('Movie year is required')
    .isInt({ max: new Date().getFullYear(), min: 1888 })
    .withMessage('Invalid year provided')
    .customSanitizer((value) => Number(value)),
  body('runtime')
    .exists({ checkFalsy: true })
    .withMessage('Movie runtime is required')
    .isInt({ max: 500, min: 10 })
    .withMessage('Invalid runtime provided')
    .customSanitizer((value) => Number(value)),
  body('image')
    .exists({ checkFalsy: true })
    .withMessage('Movie image is required')
    .isURL()
    .withMessage('Invalid image url provided'),
];

export default createMovieSchema;
