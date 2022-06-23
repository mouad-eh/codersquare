import { User } from "../../types";

export interface UserDao {
    createUser(user: User): Promise<void>;
    getUserByEmail(email: string): Promise<User|undefined>;
    getUserByUserName(username: string): Promise<User|undefined>;
}