import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";


connect();

export async function GET(){
    try {
        const response = NextResponse.json({ message: "Logout successful", success: true });

        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0) //Set the cookie to expire immediately
        })
        return response;

    } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
    }
}