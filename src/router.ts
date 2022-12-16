import http from 'http';
import 'dotenv/config.js';

import { createUser } from './controllers/requests/createUser';
import { deleteUser } from './controllers/requests/deleteUser';
import { getAllUsers } from './controllers/requests/getAllUsers';
import { getUser } from './controllers/requests/getUser';
import { updateUser } from './controllers/requests/updateUser';

import { endpointAPI, httpMethods, ErrorMessage } from './models/constants';

const { GET, POST, PUT, DELETE } = httpMethods;
const { NOT_ROUTE, NOT_REQUEST } = ErrorMessage;

export const router = async (
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>
): Promise<void> => {
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
        updateUser(req, res, id);
        break;
      case DELETE:
        deleteUser(req, res, id);
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: NOT_REQUEST }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: NOT_ROUTE }));
  }
};
