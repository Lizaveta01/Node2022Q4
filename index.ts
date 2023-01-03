import { httpServer } from "./src/http_server/index.js";
import { mouse } from "@nut-tree/nut-js";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

import WebSocket, { createWebSocketStream, WebSocketServer } from "ws";
import { Commands } from "./src/constants";

const {
  MOUSE_UP,
  MOUSE_DOWN,
  MOUSE_LEFT,
  MOUSE_RIGHT,
  MOUSE_POSITION,
  DRAW_CIRCLE,
  DRAW_RECTANGLE,
  DRAW_SQUARE,
  PRNT_SCRN,
} = Commands;

const PORT: number = 4000;

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws) => {
  const duplex = createWebSocketStream(ws, { encoding: "utf8" });
  duplex.on("data", (data) => {
    try {
      const [command, y, px] = data.split(" ");
        console.log(command, y, px);

    } catch (error) {
      console.log(error);
    }
  });

  ws.on('close', () => {
    process.stdout.write('Close connection');
  });

  process.on("SIGINT", () => {
    ws.close();
    wss.close();
    process.exit(0);
  });

});
