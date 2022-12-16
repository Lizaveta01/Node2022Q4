import { router } from './router';
import http from 'http';

const PORT = process.env.PORT || 4000;
const HOST: string = process.env.HOST || 'localhost';

export const server = http.createServer().listen(PORT, (): void => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});

server.on('request', router);

