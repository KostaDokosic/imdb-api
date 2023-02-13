import attachGenre from '@controllers/movie/attachgenre.controller';
import createMovie from '@controllers/movie/createmovie.controller';
import findMovies from '@controllers/movie/findmovie.controller';
import getMovie from '@controllers/movie/getmovie.controller';
import getMovies from '@controllers/movie/getmovies.controller';
import attachGenreSchema from '@models/validators/movie/attachgenre.schema';
import createMovieSchema from '@models/validators/movie/createmovie.schema';
import getMovieSchema from '@models/validators/movie/getmovie.schema';
import getMoviesSchema from '@models/validators/movie/getmovies.schema';
import searchmovieSchema from '@models/validators/movie/searchmovie.schema';
import { isAuth } from '@util/isAuth';
import schemaValidator from '@util/validator';
import { Router } from 'express';

const movieRouter = Router();

movieRouter.get('/', isAuth, getMoviesSchema, schemaValidator, getMovies);
movieRouter.get(
  '/search',
  isAuth,
  searchmovieSchema,
  schemaValidator,
  findMovies
);
movieRouter.get('/:id', isAuth, getMovieSchema, schemaValidator, getMovie);
movieRouter.post(
  '/create',
  isAuth,
  createMovieSchema,
  schemaValidator,
  createMovie
);
movieRouter.put(
  '/:id',
  isAuth,
  attachGenreSchema,
  schemaValidator,
  attachGenre
);
export default movieRouter;
