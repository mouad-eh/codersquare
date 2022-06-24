import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "../api";
import { db } from "../datastore";
import { ExpressHandler, User } from "../types";
import crypto from 'crypto';

export const signInHandler : ExpressHandler<SignInRequest,SignInResponse> = async (req,res) => {
    const {login,password} = req.body;
    if(!login || !password){
        return res.sendStatus(400);
    }
    const existing = await db.getUserByEmail(login) || await db.getUserByUserName(login);
    if (!existing || password !== existing.password){
        return res.sendStatus(403);
    }
    res.status(200).send({
        email: existing.email,
        firstName: existing.firstName,
        lastName: existing.lastName,
        id: existing.id,
        userName: existing.userName
    })
}
export const signUpHandler : ExpressHandler<SignUpRequest,SignUpResponse> = async (req,res) => {
    const {firstName,lastName,userName,email,password} = req.body;
    if(!firstName||!lastName||!userName||!email||!password){
        return res.status(400).send('all fields required!');
    }

    const existing = await db.getUserByEmail(email) || await db.getUserByUserName(userName);
    if (existing){
        return res.status(403).send('User already exists');
    }

    const user: User = {
        id: crypto.randomUUID(),
        firstName,
        lastName,
        userName,
        email,
        password
    }
    await db.createUser(user);
    return res.sendStatus(200);
}