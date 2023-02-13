import { body } from 'express-validator';

const signInValidator = [
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required')
    .isEmail()
    .normalizeEmail(),
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
];

export default signInValidator;
