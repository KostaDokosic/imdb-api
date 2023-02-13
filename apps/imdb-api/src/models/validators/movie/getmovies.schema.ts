import { query } from 'express-validator';

const getMoviesSchema = [
  query('page')
    .optional()
    .isInt()
    .withMessage('Invalid page value provided!')
    .customSanitizer((value) => Number(value)),
  query('sortBy')
    .optional()
    .customSanitizer((value) => {
      return (value as string).toLowerCase().replace(' ', '');
    })
    .custom((value) => {
      if (value !== 'desc' && value !== 'asc')
        throw new Error(
          'Invalid sortyBy value provided! (asc or desc is only available)'
        );

      return true;
    }),
];

export default getMoviesSchema;
