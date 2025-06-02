import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    username?: string;
    email?: string;
    iat?: number;
    exp?: number;
}

export const getDataFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value;
        if (!token) throw new Error("No token found");

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as TokenPayload;
        return decodedToken.id;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Unknown error");
    }
}