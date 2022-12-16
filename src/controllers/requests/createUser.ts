import { IncomingMessage, ServerResponse } from 'http';
import { ErrorMessage, } from '../../models/constants';
import {  User } from '../../models/models';
import { create } from '../createUsersResponce';
import { getPostData } from '../../utils/getPostData';

const { INVALID_BODY, INVALID_BODY_TYPES, SOMETHING_WRONG } = ErrorMessage;

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await getPostData(req);

    const { username, age, hobbies } = JSON.parse(body);

    const user: User = {
      username,
      age,
      hobbies,
    };

    if (!user.username || !user.age || !user.hobbies) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: INVALID_BODY }));
    } else if (
      !Number.isInteger(user.age) ||
      !Array.isArray(user.hobbies) ||
      (Array.isArray(user.hobbies) && !user.hobbies.length)
    ) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: INVALID_BODY_TYPES }));
    } else {
      const newUser = await create(user);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newUser));
    }
  } catch (err) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SOMETHING_WRONG }));
  }
};
