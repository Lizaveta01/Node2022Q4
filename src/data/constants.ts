export type User = {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface IData {
  users: User[];
}

export const endpointAPI = "api/users";
