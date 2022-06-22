import express, { RequestHandler } from 'express';
import { db } from './datastore/index'
import { createPostHandler, listPostsHandler } from './handlers/postHandlers';

const app = express();

const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, "- body: ", req.body);
    next();
}

app.use(express.json());
app.use(requestLoggerMiddleware)

app.get("/posts",listPostsHandler)

app.post("/posts",createPostHandler)

app.listen(3000)