import { IncomingMessage, ServerResponse } from "http";
import { create, findAll, findById } from "../models/userModule";
import { getPostData } from "../utils/getPostData";

export const getAllUsers = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {
  try {
    const users = await findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
  id: string
) => {
  try {
    const user = await findById(id);
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {
  try {
    const body = await getPostData(req);

    const { username, age, hobbies } = JSON.parse(body);

    const user = {
      username,
      age,
      hobbies,
    };

    const newUser = await create(user);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newUser));
    
  } catch (err) {
    console.log(err);
  }
};
