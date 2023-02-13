import router from '@routes/router';
import * as express from 'express';
import * as session from 'express-session';
import * as compression from 'compression';
import * as cors from 'cors';
import * as connectRedis from 'connect-redis';
import redisClient from '@util/cache';
import morganMiddleware from '@util/morgan.middleware';

const createApp = () => {
  const app = express();
  const RedisStore = connectRedis(session);

  app.use(compression());
  app.use(
    cors({
      credentials: true,
      methods: ['POST', 'GET', 'PUT', 'PATCH'],
      origin: process.env.NX_CORS_ORIGIN,
    })
  );
  app.use(express.json());
  app.use(
    session({
      store: new RedisStore({ client: redisClient.getClient() }),
      saveUninitialized: false,
      resave: false,
      secret: process.env.NX_SESSION_SECRET || 'session-secret-key-default',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: !!process.env.NX_PRODUCTION,
      },
    })
  );
  app.use(morganMiddleware);
  app.use('/api', router);

  return app;
};

export default createApp;
