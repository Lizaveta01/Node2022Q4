import http from 'http';
import { createUser } from './controllers/createUser';
import { getAllUsers } from './controllers/getAllUsers';
import { getUser } from './controllers/getUser';

import { endpointAPI, httpMethods, ErrorMessage } from './data/constants';

const { GET, POST, PUT, DELETE } = httpMethods;
const { NOT_ROUTE, NOT_REQUEST, NOT_USER } = ErrorMessage;

export const serverStart = () => {
  const PORT = process.env.PORT || 4000;

  const server = http.createServer((req, res) => {
    const id = req.url?.split('/')[3];
    const pathBase = req.url?.split('/').slice(1, 3).join('/');
    console.log(pathBase);

    if (pathBase === endpointAPI && !id) {
      switch (req.method) {
        case GET:
          getAllUsers(req, res);
          break;
        case POST:
          createUser(req, res);
          break;
        default:
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: NOT_REQUEST }));
      }
    } else if (pathBase === endpointAPI && id) {
      console.log('iddddd');
      switch (req.method) {
        case GET:
          getUser(req, res, id);
          break;
        case PUT:
          break;
        case DELETE:
          break;
        default:
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: NOT_REQUEST }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: NOT_ROUTE }));
    }
  });

  server.listen(PORT, () => console.log(`Server running at ${PORT}`));
};
