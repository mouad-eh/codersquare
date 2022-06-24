import { Post, User } from "./types";

//post APIs

export interface listPostsRequest { }
export interface listPostsResponse {
    posts: Post[]
}

export type createPostRequest = Pick<Post, "title" | "url" | "userId">
export interface createPostResponse { }

export interface getPostRequest { }
export interface getPostResponse {
    post: Post
}

//comment APIs

//like APIs

//user APIs

export type SignUpRequest = Pick<User, 'firstName'|'lastName'|'email'|'userName'|'password'>
export interface SignUpResponse {};

export interface SignInRequest {
    login: string, //username or email
    password: string
}
export type SignInResponse = Pick<User, 'firstName'|'lastName'|'email'|'userName'|'id'>