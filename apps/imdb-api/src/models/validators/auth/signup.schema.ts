import DBClient from '@util/database';
import { body } from 'express-validator';

const signUpValidator = [
  body('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be string type'),
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required')
    .isEmail()
    .normalizeEmail()
    .custom(async (email) => {
      const user = await DBClient.instance.user.findUnique({
        where: { email },
      });
      if (user) throw new Error('Email already in use');
      return true;
    }),
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required')
    .isStrongPassword({
      minLength: 5,
      minSymbols: 0,
      minNumbers: 0,
      minLowercase: 0,
      minUppercase: 0,
    })
    .withMessage('Password is too weak'),
  body('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Password confirmation is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('Passwords dont match');
      return true;
    }),
];

export default signUpValidator;
