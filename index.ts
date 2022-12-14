import {router as userRouter} from "./src/router/user-router";
import App from "./src/app";



const port = process.env.PORT || 4000;

const app = new App();

app.addRouter(userRouter);
app.listen(port, () => console.log(`Server listening on port ${port}`));
