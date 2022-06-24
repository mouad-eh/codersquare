import { DataStore } from "..";
import { User, Post, Like, Comment } from "../../types";
import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import path from 'path';

export class sqlDataStore implements DataStore {
    private db!: Database<sqlite3.Database, sqlite3.Statement>;
    public async openDb() {
        // open the database
        this.db = await open({
            filename: path.join(__dirname, 'codersquare.sqlite'),
            driver: sqlite3.Database
        })
        this.db.run('PRAGMA foreign_keys = ON');
        await this.db.migrate({
            migrationsPath: path.join(__dirname, 'migrations')
        })
        return this;
    }
    async createUser(user: User): Promise<void> {
        await this.db.run('INSERT INTO users(id,emailName,firstName,lastName,userName,password) VALUES (?,?,?,?,?,?)',
        user.id,
        user.email,
        user.firstName,
        user.lastName,
        user.userName,
        user.password);
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        return this.db.get('SELECT * FROM users WHERE emailName = ?',email);
    }
    getUserByUserName(username: string): Promise<User | undefined> {
        return this.db.get('SELECT * FROM users WHERE userName = ?',username);
    }
    listPosts(): Promise<Post[]> {
        return this.db.all<Post[]>('select * from posts')
    }
    createPost(post: Post): Promise<void> {
        this.db.run("INSERT INTO posts (id,title,url,userId,postedAt) VALUES (?,?,?,?,?)",post.id,post.title,post.url,post.userId,post.postedAt);
        return Promise.resolve();
    }
    getPost(id: string): Promise<Post | undefined> {
        throw new Error("Method not implemented.");
    }
    deletePost(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createLike(like: Like): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createComment(comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    listComments(postId: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}