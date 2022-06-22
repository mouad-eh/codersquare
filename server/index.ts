import express, { ErrorRequestHandler, RequestHandler } from 'express';
import { createPostHandler, listPostsHandler } from './handlers/postHandlers';

const app = express();

const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, "- body: ", req.body);
    next();
}

app.use(express.json());
app.use(requestLoggerMiddleware)

app.get("/posts", listPostsHandler)
app.post("/posts", createPostHandler)

// middleware handling errors
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error('Uncaught exception: ', err);
    return res.status(500).send('Oops, an unexpected error occured, please try again!');
}
app.use(errorHandler);

app.listen(3000)