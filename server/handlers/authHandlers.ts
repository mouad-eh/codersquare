import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "../api";
import { db } from "../datastore";
import { ExpressHandler, User } from "../types";
import crypto from 'crypto';
import { signJwt } from "../auth";

export const signInHandler: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
        return res.sendStatus(400);
    }
    const existing = await db.getUserByEmail(login) || await db.getUserByUserName(login);
    if (!existing || hashPassword(password) !== existing.password) {
        return res.sendStatus(403);
    }
    const jwt = signJwt({ userId: existing.id })
    res.status(200).send({
        user: {
            email: existing.email,
            firstName: existing.firstName,
            lastName: existing.lastName,
            id: existing.id,
            userName: existing.userName
        },
        jwt: jwt
    })
}
export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;
    if (!firstName || !lastName || !userName || !email || !password) {
        return res.status(400).send({ error: 'all fields required!' });
    }

    const existing = await db.getUserByEmail(email) || await db.getUserByUserName(userName);
    if (existing) {
        return res.status(403).send({ error: 'User already exists' });
    }

    const user: User = {
        id: crypto.randomUUID(),
        firstName,
        lastName,
        userName,
        email,
        password: hashPassword(password)
    }
    await db.createUser(user);
    const jwt = signJwt({ userId: user.id })
    return res.status(200).send({ jwt });
}



function hashPassword(password: string):string {
    return crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT!, 100, 64, 'sha512').toString("hex");
}