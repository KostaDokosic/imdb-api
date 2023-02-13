import { body } from 'express-validator';

const verificationValidator = [
  body('code')
    .exists({ checkFalsy: true })
    .withMessage('Verification code is required')
    .isString()
    .withMessage('Verification code must be string type'),
];

export default verificationValidator;
