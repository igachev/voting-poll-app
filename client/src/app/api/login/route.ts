import { loginUser } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

interface LoginRequestBody {
    email: string;
    password: string;
}

export const POST = async(req: NextRequest): Promise<NextResponse> => {
try {
    const {email,password}: LoginRequestBody = await req.json()
    const login = await loginUser(email,password)
    return NextResponse.json(login,{status: 200})
} catch (err: any) {
    return NextResponse.json({message: err.message},{status: 500})
}
}