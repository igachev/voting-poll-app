import { deletePoll } from "@/utils/database"
import { NextRequest, NextResponse } from "next/server"


export const DELETE = async(req: NextRequest, { params }: { params: {pollId: string,userId: string} }): Promise<NextResponse> => {
    try {
        const pollId = params.pollId
        const userId = params.userId
        const deletedPoll = await deletePoll(parseInt(pollId),parseInt(userId))
        return NextResponse.json(deletedPoll, {status: 200})
    } catch (err: any) {
        return NextResponse.json({message: err.message},{status: 500})
    }
}