import { body } from 'express-validator';

const mfaValidatorSchema = [
  body('code')
    .exists({ checkFalsy: true })
    .withMessage('2FA code is required')
    .isString()
    .withMessage('2FA code must be string type'),
];

export default mfaValidatorSchema;
