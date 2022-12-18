import cluster from 'cluster';
import os from 'os';
import { server }  from '..';

void (async () => {
  if (cluster.isPrimary) {
    const cpusCount = os.cpus().length;
    console.log(`CPUs: ${cpusCount}`);
    console.log(`Master started. Pid: ${process.pid}`);

    let workerPort: number;
    for (let i = 0; i < cpusCount; i++) {
    //   workerPort = Number(process.env.PORT) + 1;
      cluster.fork();
    }
    cluster.on('exit', (worker) => {
      console.log(`worker ${worker.process.pid} died`);
    });
    cluster.on('error', (worker) => {
        process.exit(0);
      });
  }
  if (cluster.isWorker) {
    console.log(`Worker ${process.pid} started. PORT ${process.env.PORT}`);
    await import('../index');
  }
  
})();
