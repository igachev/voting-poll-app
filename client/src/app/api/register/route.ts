import { isRegistered, registerUser } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

interface RegisterRequestBody {
    email: string;
    password: string;
}

export const POST = async(req:NextRequest): Promise<NextResponse> => {
    try {
        const {email,password}: RegisterRequestBody = await req.json()
        const alreadyRegistered: boolean = await isRegistered(email)
        if(alreadyRegistered) {
            throw new Error("User already exists!")
        }
        const newUser = await registerUser(email,password)
        return NextResponse.json(newUser,{status: 201})
    } catch (err: any) {
        return NextResponse.json({message: err.message},{status: 500})
    }
}