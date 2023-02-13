import DBClient from '@util/database';
import { body, param } from 'express-validator';

const attachGenreSchema = [
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
  body('genres')
    .exists({ checkFalsy: true })
    .withMessage('Property Genres is required')
    .custom(async (genres: { id: number }[], { req }) => {
      if (!Array.isArray(genres)) throw new Error('Genres must be type array');
      if (genres.length === 0) throw new Error('Genre array must not be empty');

      let notExistingOne = -1;
      for (let i = 0; i < genres.length; i++) {
        const genre = await DBClient.instance.genre.findUnique({
          where: { id: genres[i].id },
        });
        if (genre) continue;
        notExistingOne = genres[i].id;
        break;
      }

      if (notExistingOne >= 0)
        throw new Error(`Genre id ${notExistingOne} does not exists!`);

      let existingOne = -1;
      for (let i = 0; i < genres.length; i++) {
        const existing = await DBClient.instance.movie.findFirst({
          where: { id: req.params.id, genres: { some: { id: genres[i].id } } },
        });

        if (!existing) continue;
        existingOne = genres[i].id;
        break;
      }

      if (existingOne > 0)
        throw new Error(
          `Genre id ${existingOne} is already attached to this movie!`
        );
      return true;
    }),
];

export default attachGenreSchema;
