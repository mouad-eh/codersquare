import { User, Post, Like, Comment } from '../../types';
import {DataStore} from '../index'

export class inMemoryDataStore implements DataStore{
    private users: User[] = [];
    private posts: Post[] = [];
    private likes: Like[] = [];
    private comments: Comment[] = [];

    createUser(user: User): void {
        this.users.push(user);
    }
    getUserByEmail(email: string): User | undefined {
        return this.users.find( u => u.email === email);
    }
    getUserByUserName(username: string): User | undefined {
        return this.users.find( u => u.userName === username);
    }

    listPosts(): Post[] {
        return this.posts;
    }
    createPost(post: Post): void {
        this.posts.push(post);
    }
    getPost(id: string): Post | undefined {
        return this.posts.find(p => p.id === id);
    }
    deletePost(id: string): void {
        const index = this.posts.findIndex(p => p.id === id);
        if ( index === -1){
            return;
        }
        this.posts.splice(index,1);
    }

    createLike(like: Like): void {
        this.likes.push(like);
    }

    createComment(comment: Comment): void {
        this.comments.push(comment);
    }
    listComments(postId: string): Comment[] {
        return this.comments.filter(c => c.postId === postId)
    }
    
    deleteComment(id: string): void {
        const index = this.comments.findIndex(c => c.id === id);
        if ( index === -1){
            return;
        }
        this.comments.splice(index,1);
    }

}