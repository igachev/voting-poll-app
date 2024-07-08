import { getPoll } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { pollId: string } }): Promise<NextResponse> => {
    try {
        const pollId = params.pollId
        const poll = await getPoll(parseInt(pollId))
       return NextResponse.json(poll,{status: 200})
    } catch (err: any) {
       return NextResponse.json({message: err.message},{status: 500})
    }
}