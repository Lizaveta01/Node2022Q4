import http from "http";
import EventEmitter from "events";
import Router from "./router";


export default class App {
  emitter: EventEmitter;
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
  }

  listen(port: string | number | undefined, callback: () => void): void {
    this.server.listen(port, callback);
    
  }

  addRouter(router: Router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method];
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          handler(req, res);
        });
      });
    });
  }

  _createServer() {
    return http.createServer((req, res) => {
      const emitted = this.emitter.emit(
        this._getRouteMask(req.url, req.method),
        req,
        res
      );
      if (!emitted) {
        res.end();
      }
    });
  }

  _getRouteMask(path: string | undefined, method: string | undefined) {
    return `[${path}]:[${method}]`;
  }
}
