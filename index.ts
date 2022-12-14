import Router from "./src/router";
import App from "./src/app";

const port = process.env.PORT || 4000;

const app = new App();

const router = new Router();

router.get("/users", (req: any, res: { end: (arg0: string) => void; }) => {
  res.end("you send request to users");
});

app.addRouter(router);
app.listen(port, () => console.log(`Server listening on port ${port}`));
