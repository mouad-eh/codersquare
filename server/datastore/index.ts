import { CommentDao } from "./dao/CommentDao";
import { LikeDao } from "./dao/LikeDao";
import { inMemoryDataStore } from "./memorydb";
import { PostDao } from "./dao/PostDao";
import { UserDao } from "./dao/UserDao";

export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao { };

export const db = new inMemoryDataStore();