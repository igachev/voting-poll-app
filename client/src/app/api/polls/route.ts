import { getPolls } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest): Promise<NextResponse> => {
    try {
        const polls = await getPolls()
        return NextResponse.json(polls,{status: 200})
    } catch (err: any) {
        return NextResponse.json({message: err.message},{status:500})
    }
}