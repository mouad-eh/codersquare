import { Post } from "./types";

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
