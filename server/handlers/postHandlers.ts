import { db } from "../datastore/index"
import { Post } from "../types";
import crypto from 'crypto';
import { ExpressHandler } from '../types'
import { listPostsRequest, listPostsResponse, createPostRequest, createPostResponse } from '../api'

export const listPostsHandler: ExpressHandler<listPostsRequest, listPostsResponse> = async (req, res) => {
    res.send({ posts: await db.listPosts() });
    // no need for await here because we are dealing with in memory database
    // but await is important in the case of an error happened in function 
    // without await the error will not be catched (listPostsHandler will run normaly)
    // but with await the error will be catched 
}

export const createPostHandler: ExpressHandler<createPostRequest, createPostResponse> = async (req, res) => {
    // error handling 
    if (!req.body.title) {
        return res.status(400).send({ error: "title field missing!" })
    }
    if (!req.body.title || !req.body.url) {
        return res.sendStatus(400);
    }
    //TODO: validate user exists
    const post: Post = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        title: req.body.title,
        url: req.body.url,
        userId: res.locals.userId //req.body.userId
    }
    await db.createPost(post);// no need for await here because we are dealing with in memory database
    res.sendStatus(200);
}