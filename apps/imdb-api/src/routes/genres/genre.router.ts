import createGenre from '@controllers/genre/creategenre.controller';
import getGenre from '@controllers/genre/getgenre.controller';
import getGenres from '@controllers/genre/getgenres.controller';
import createGenreSchema from '@models/validators/genres/creategenre.schema';
import getGenreSchema from '@models/validators/genres/getgenre.schema';
import getGenresSchema from '@models/validators/genres/getgenres.schema';
import { isAuth } from '@util/isAuth';
import schemaValidator from '@util/validator';
import { Router } from 'express';

const genreRouter = Router();

genreRouter.get('/', isAuth, getGenresSchema, schemaValidator, getGenres);
genreRouter.get('/:id', isAuth, getGenreSchema, schemaValidator, getGenre);
genreRouter.post(
  '/create',
  isAuth,
  createGenreSchema,
  schemaValidator,
  createGenre
);

export default genreRouter;
