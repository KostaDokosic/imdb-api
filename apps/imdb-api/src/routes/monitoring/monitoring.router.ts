import { healthCheck } from '@controllers/monitoring/health.controller';
import { Router } from 'express';

const monitoringRouter = Router();

monitoringRouter.get('/health', healthCheck);

export default monitoringRouter;
