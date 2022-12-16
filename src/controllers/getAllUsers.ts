import { IncomingMessage, ServerResponse } from 'http';
import {  findAll } from '../models/userModule';
import { ErrorMessage } from "../data/constants";

const { SOMETHING_WRONG } = ErrorMessage;

export const getAllUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SOMETHING_WRONG }));
  }
};