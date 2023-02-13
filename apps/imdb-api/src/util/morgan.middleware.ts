import * as morgan from 'morgan';
import Logger from './logger';

const stream = {
  // Use the http severity
  write: (message: string) => Logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

const morganMiddleware = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);

export default morganMiddleware;
