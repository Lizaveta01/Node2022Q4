import Router from "./router";

export const router = new Router();

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Liza" },
];

router.get("/users", (req: any, res: { end: (arg0: string) => void }) => {
  res.end(JSON.stringify(users));
});

router.post("/users", (req: any, res: { end: (arg0: string) => void }) => {
    res.end(JSON.stringify(users));
  });