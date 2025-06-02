import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email })

        if(!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        console.log('user exist');

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

        const response = NextResponse.json({
            message: "login successful",
            success: true
        })

        response.cookies.set('token', token, {
            httpOnly: true
        });
        return response;
        
    } catch (error) {
                return NextResponse.json({ error: error }, { status: 500 });
    }
}
