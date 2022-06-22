import { RequestHandler } from "express";
import {db} from "../datastore/index"
import { Post } from "../types";
import crypto from 'crypto';

export type ExpressHandler <req,res> = RequestHandler<
string,
Partial<res>,
Partial<req>,
any
>

export const listPostsHandler: ExpressHandler<{},{}> = (req, res) => {
    res.send({ posts: db.listPosts() });
}


type createPostRequest = Pick<Post,"title"|"url"|"userId">
interface createPostResponse  {}

export const createPostHandler: ExpressHandler<createPostRequest,createPostResponse> = (req, res) => {
    if( !req.body.title || !req.body.url || !req.body.userId){
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