import express, { ErrorRequestHandler, RequestHandler } from 'express';
import { createPostHandler, listPostsHandler } from './handlers/postHandlers';
import asyncHandler from "express-async-handler"; // a problem in express solved by this package
import { initDb } from './datastore';

(async ()=>{
await initDb();
const app = express();

const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, "- body: ", req.body);
    next();
}

app.use(express.json());
app.use(requestLoggerMiddleware)

app.get("/posts", asyncHandler(listPostsHandler))
app.post("/posts", asyncHandler(createPostHandler))

// middleware handling errors
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error('Uncaught exception: ', err);
    return res.status(500).send('Oops, an unexpected error occured, please try again!');
}
app.use(errorHandler);

app.listen(3000);
})()