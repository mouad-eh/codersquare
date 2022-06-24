import express, { ErrorRequestHandler, RequestHandler } from 'express';
import { createPostHandler, listPostsHandler } from './handlers/postHandlers';
import asyncHandler from "express-async-handler"; // a problem in express solved by this package
import { initDb } from './datastore';
import { signInHandler, signUpHandler } from './handlers/userHandlers';
import { requestLoggerMiddleware } from './middleware/loggerMiddleWare';
import { errorHandler } from './middleware/errorMiddleWare';

(async ()=>{
await initDb();
const app = express();


app.use(express.json());
app.use(requestLoggerMiddleware);
app.use(errorHandler);

app.get("/posts", asyncHandler(listPostsHandler))
app.post("/posts", asyncHandler(createPostHandler))

app.post("/signup",asyncHandler(signUpHandler))
app.post("/signin",asyncHandler(signInHandler))



app.listen(3000);
})()