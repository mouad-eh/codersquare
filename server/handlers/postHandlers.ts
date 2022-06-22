import { db } from "../datastore/index"
import { Post } from "../types";
import crypto from 'crypto';
import { ExpressHandler } from '../types'
import { listPostsRequest, listPostsResponse, createPostRequest, createPostResponse } from '../api'

export const listPostsHandler: ExpressHandler<listPostsRequest, listPostsResponse> = (req, res) => {
    throw Error("Oops there is an error!");
    res.send({ posts: db.listPosts() });
}

export const createPostHandler: ExpressHandler<createPostRequest, createPostResponse> = (req, res) => {
    // error handling 
    if (!req.body.title) {
        return res.status(400).send("title field missing!")
    }
    if (!req.body.title || !req.body.url || !req.body.userId) {
        return res.sendStatus(400);
    }
    const post: Post = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        title: req.body.title,
        url: req.body.url,
        userId: req.body.userId
    }
    db.createPost(post);
    res.sendStatus(200);
}