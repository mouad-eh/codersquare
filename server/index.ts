import express, { RequestHandler } from 'express';
import { db } from './datastore/index'

const app = express();

const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, "- body: ", req.body);
    next();
}

app.use(express.json());
app.use(requestLoggerMiddleware)

app.get("/posts", (req, res) => {
    res.send({ posts: db.listPosts() });
})

app.post("/posts", (req, res) => {
    const post = req.body;
    db.createPost(post)
    res.sendStatus(200);
})

app.listen(3000)