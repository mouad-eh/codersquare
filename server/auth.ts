import { JwtObj } from "./types";
import jwt from 'jsonwebtoken';

export function signJwt(obj: JwtObj): string {
    return jwt.sign(obj, getJwtSecret(), { expiresIn: '15d' }) //base64 encoded
}

export function verifyJwt(token: string): JwtObj {
    return jwt.verify(token, getJwtSecret()) as JwtObj;
}

function getJwtSecret(): string { //for security issues you should not pass key directly to the function
    const secret = process.env.JWT_SECRET
    if (!secret) {
        console.error('missing JWT secret!');
        process.exit();
    }
    return secret;
}