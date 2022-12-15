import * as users from "../data/new.json";
import { v4 as uuidv4 } from "uuid";
import { writeDataToFile } from "../utils/writeDataToFile";

export const findAll = () => {
  return new Promise((resolve, reject) => {
    console.log(users);
    resolve(users);
  });
};

export const findById = (id: string) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user: { id: string }) => user.id === id);
    resolve(user);
  });
};

export const create = (user: {
  username: string;
  age: string;
  hobbies: string;
}) => {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    console.log(users);
    users.push(newUser);
    writeDataToFile("./data/users.json", users);
    resolve(newUser);
  });
};
