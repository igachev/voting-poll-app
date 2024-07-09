import { addPoll } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

interface AddPollRequestBody {
    pollTitle: string;
    pollDescription: string;
    userId: number;
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const {pollTitle,pollDescription,userId}: AddPollRequestBody = await req.json()
        const pollAdded = await addPoll(pollTitle,pollDescription,userId)
        return NextResponse.json(pollAdded,{status: 201})
    } catch (err: any) {
        return NextResponse.json({message: err.message},{status: 500})
    }
}