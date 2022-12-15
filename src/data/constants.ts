export type User = {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
};

export interface IData {
  users: User[];
}

export const endpointAPI = 'api/users';

export enum httpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ErrorMessage {
  NOT_ROUTE = 'Page Not Found',
  NOT_REQUEST = 'Request Not Found',
  NOT_USER = 'User Not Found',
  INVALID_ID = 'User not found, invalid id',
  INVALID_BODY = 'Request does not contain required fields',
  INVALID_BODY_TYPES = 'Request does not contain required fields types',
}
