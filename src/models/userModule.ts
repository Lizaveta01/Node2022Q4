import { v4 as uuidv4 } from 'uuid';
import { dataUsers } from '../data/users';
import { User } from '../data/constants';

let { users } = dataUsers;

export const findAll = () => {
  return new Promise((resolve) => {
    resolve(users);
  });
};

export const findById = (id: string) => {
  return new Promise((resolve) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });
};

export const create = (user: User) => {
  return new Promise((resolve) => {
    const newUser = { id: uuidv4(), ...user } as User;
    users.push(newUser);
    resolve(newUser);
  });
};
