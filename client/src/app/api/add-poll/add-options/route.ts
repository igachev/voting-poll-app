import { addPollOption } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

interface OptionsRequestBody {
    pollOption: string;
    pollId: number;
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const {pollOption,pollId}: OptionsRequestBody = await req.json()
        const addedOption = await addPollOption(pollOption,pollId)
        return NextResponse.json(addedOption,{status: 201})
    } catch (err: any) {
        return NextResponse.json({message: err.message},{status: 500})
    }
}