import { CommentDao } from "./dao/CommentDao";
import { LikeDao } from "./dao/LikeDao";
// import { inMemoryDataStore } from "./memorydb";
import { PostDao } from "./dao/PostDao";
import { UserDao } from "./dao/UserDao";
import { sqlDataStore } from "./sql";

export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao { };

export let db: DataStore;

export async function initDb() {
    // db = new inMemoryDataStore();
    db = await new sqlDataStore().openDb();
} 
