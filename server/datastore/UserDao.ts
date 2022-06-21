import { User } from "../types";

export interface UserDao {
    createUser(user: User): void;
    getUserByEmail(email: string): User|undefined;
    getUserByUserName(username: string): User|undefined;
}