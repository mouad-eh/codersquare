import express, { ErrorRequestHandler, RequestHandler } from 'express';
import { createPostHandler, listPostsHandler } from './handlers/postHandlers';
import asyncHandler from "express-async-handler"; // a problem in express solved by this package
import { initDb } from './datastore';
import { signInHandler, signUpHandler } from './handlers/authHandlers';
import { requestLoggerMiddleware } from './middleware/loggerMiddleWare';
import { errorHandler } from './middleware/errorMiddleWare';
import dotenv from 'dotenv';
import { authHandler } from './middleware/authMiddleWare';

(async () => {
    await initDb();

    dotenv.config();

    const app = express();


    app.use(express.json());
    app.use(requestLoggerMiddleware);
    // public endpoints
    app.get("/healthz", (req, res) => res.send({ status: "Ok" }))
    // you can do monitoring on this public endpoint to check if the server is up and running
    app.post("/signup", asyncHandler(signUpHandler))
    app.post("/signin", asyncHandler(signInHandler))

    app.use(authHandler);

    // protected endpoints
    app.get("/posts", asyncHandler(listPostsHandler))
    app.post("/posts", asyncHandler(createPostHandler))

    app.use(errorHandler);

    app.listen(process.env.PORT || 3000);
})()