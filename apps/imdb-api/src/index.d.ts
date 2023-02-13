import { User } from '@prisma/client';
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: User;
    passwordResetCode?: string;
    userId?: number;
  }
}
