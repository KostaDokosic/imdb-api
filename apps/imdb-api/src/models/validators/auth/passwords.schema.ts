import { body } from 'express-validator';

export const requestResetPasswordSchema = [
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required')
    .isEmail()
    .normalizeEmail(),
];

export const resetPasswordSchema = [
  body('code')
    .exists({ checkFalsy: true })
    .withMessage('Password verification code is required'),

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

export default resetPasswordSchema;
