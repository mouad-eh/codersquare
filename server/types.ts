import { RequestHandler } from "express";


export interface User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
}

export interface Post {
    id: string; 
    title: string;
    url: string;
    userId: string;
    postedAt: number;
}

export interface Like{
    userId: string;
    postId: string;
}

export interface Comment {
    id: string;
    userId: string;
    postId: string;
    comment: string;
    postedAt: number;
}

type WithError<T> =  T & {error: string}; 

export type ExpressHandler<req, res> = RequestHandler<
    string,
    Partial<WithError<res>>,
    Partial<req>,
    any
>

export interface JwtObj {
    userId: string; // payload type
}