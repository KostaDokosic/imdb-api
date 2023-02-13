import authMe from '@controllers/auth/authme.controller';
import verifyMfa, { requestMfa } from '@controllers/auth/mfa.controller';
import passwordReset, {
  requestPasswordReset,
} from '@controllers/auth/password.controller';
import signIn, { signInMfa } from '@controllers/auth/signin.controller';
import signOut from '@controllers/auth/signout.controller';
import signUp from '@controllers/auth/signup.controller';
import verifyEmail, {
  requestEmailVerification,
} from '@controllers/auth/verify.controller';
import mfaValidatorSchema from '@models/validators/auth/mfa.schema';
import resetPasswordSchema, {
  requestResetPasswordSchema,
} from '@models/validators/auth/passwords.schema';
import signInValidator from '@models/validators/auth/signin.schema';
import signUpValidator from '@models/validators/auth/signup.schema';
import verificationValidator from '@models/validators/auth/verify.schema';
import { isAuth, isNotAuth } from '@util/isAuth';
import schemaValidator from '@util/validator';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signup', isNotAuth, signUpValidator, schemaValidator, signUp);
authRouter.post('/signin', isNotAuth, signInValidator, schemaValidator, signIn);
authRouter.post(
  '/signin-mfa',
  isNotAuth,
  mfaValidatorSchema,
  schemaValidator,
  signInMfa
);
authRouter.post('/signout', isAuth, signOut);
authRouter.post('/requestVerify', isAuth, requestEmailVerification);
authRouter.post(
  '/verify',
  isAuth,
  verificationValidator,
  schemaValidator,
  verifyEmail
);
authRouter.get('/me', isAuth, authMe);
authRouter.post(
  '/password-request-reset',
  isNotAuth,
  requestResetPasswordSchema,
  schemaValidator,
  requestPasswordReset
);
authRouter.post(
  '/password-reset',
  isNotAuth,
  resetPasswordSchema,
  schemaValidator,
  passwordReset
);
authRouter.post('/mfa-request', isAuth, requestMfa);
authRouter.post(
  '/mfa-verify',
  isAuth,
  mfaValidatorSchema,
  schemaValidator,
  verifyMfa
);

export default authRouter;
