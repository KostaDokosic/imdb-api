import { Router } from 'express';
import authRouter from './auth/auth.router';
import genreRouter from './genres/genre.router';
import monitoringRouter from './monitoring/monitoring.router';
import movieRouter from './movies/movie.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/movies', movieRouter);
router.use('/genres', genreRouter);
router.use('/monitor', monitoringRouter);

export default router;
