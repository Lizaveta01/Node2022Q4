import { IncomingMessage, ServerResponse } from 'http';
import { ErrorMessage } from '../data/constants';
import { deleteUserById, findById } from '../models/userModule';

const { NOT_USER, INVALID_ID } = ErrorMessage;

export const deleteUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const user = await findById(id);
    if (!id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: INVALID_ID }));
    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: NOT_USER }));
    } else {
      await deleteUserById(id, user);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    console.log(err);
  }
  
};
