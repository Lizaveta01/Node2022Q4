import EventEmitter from "events";

export const emitter = new EventEmitter();

// interface endpoint {
//   "/users": {
//     GET: handler;
//   };
// }
export default class Router {
  endpoints: any;
  constructor() {
    this.endpoints = {};
  }

  request(method = "GET", path: string, handler: any) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }
    const endpoint = this.endpoints[path];

    if (endpoint[method]) {
      throw new Error(`[${method}] по адресу ${path} уже существует`);
    }

    endpoint[method] = handler;
    
  }

  get(path: string, handler: (req: any, res: { end: (arg0: string) => void; }) => void) {
    this.request('GET', path, handler);
  }
  post(path: string, handler: any) {
    this.request('POST', path, handler);
  }
  put(path: string, handler: any) {
    this.request('PUT', path, handler);
  }
  delete(path: string, handler: any) {
    this.request('DELETE', path, handler);
  }
}