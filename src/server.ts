import http from 'http';
import { getAllUsers, getUser, createUser } from './controllers/userController';

export const serverStart = () => {
  const PORT = process.env.PORT || 4000;

  console.log(process.env.PORT);

  const server = http.createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
      getAllUsers(req, res);
    } else if (req.url?.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
      const userId = req.url.split('/')[3];
      getUser(req, res, userId);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      createUser(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Route Not Found' }));
    }
  });

  server.listen(PORT, () => console.log(`Server running at ${PORT}`));
};
