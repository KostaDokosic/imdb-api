import Logger from '@util/logger';
import * as notReallyCluster from 'cluster';
import { cpus } from 'os';
import createApp from './app/app';

const cluster = notReallyCluster as unknown as notReallyCluster.Cluster;

const port = process.env.NX_API_PORT || 3333;
const totalCPUs = cpus().length;

(() => {
  if (cluster.isPrimary) {
    Logger.info(`Number of CPUs is ${totalCPUs}`);
    Logger.info(`Master ${process.pid} is running`);

    for (let i = 0; i < totalCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      Logger.warn(`Worker ${worker.process.pid} died`);
      Logger.info("Let's fork another worker!");
      cluster.fork();
    });
  } else {
    const app = createApp();
    Logger.info(`Worker ${process.pid} started`);

    const server = app.listen(port, () => {
      Logger.info(`Listening at http://localhost:${port}/api`);
    });
    server.on('error', Logger.error);
  }
})();
