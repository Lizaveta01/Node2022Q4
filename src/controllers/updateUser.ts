import { IncomingMessage, ServerResponse } from 'http';
import { ErrorMessage, User } from '../data/constants';
import { findById, update } from '../models/userModule';
import { getPostData } from '../utils/getPostData';

const { INVALID_ID, NOT_USER, SOMETHING_WRONG } = ErrorMessage;

export const updateUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const oldUser = await findById(id);

    const body = await getPostData(req);

    const { username, age, hobbies } = JSON.parse(body);

    const user: User = {
      id,
      username,
      age,
      hobbies,
    };

    if (!id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: INVALID_ID }));
    } else if (!oldUser) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: NOT_USER }));
    } else {
      const newUser = await update(user);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newUser));
    }
  } catch (err) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SOMETHING_WRONG }));
  }
};
