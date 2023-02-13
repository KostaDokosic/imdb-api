import { query } from 'express-validator';

const searchmovieSchema = [
  query('name')
    .exists({ checkFalsy: true })
    .withMessage('Name param is missing')
    .isString()
    .withMessage('Invalid name provided'),
];

export default searchmovieSchema;
