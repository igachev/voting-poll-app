import { deletePoll, getVotes, pollVote } from "@/utils/database"
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

export const POST = async(req: NextRequest, { params }: { params: {pollId: string, userId: string} }): Promise<NextResponse> => {
    try {
        const pollId = params.pollId
        const userId = params.userId
        const {selectedOption} = await req.json()
        const voteForPoll = await pollVote(parseInt(userId),parseInt(pollId),selectedOption)
        return NextResponse.json(voteForPoll,{status: 201})
    } catch (err: any) {
        return NextResponse.json({message: err.message},{status: 500})
    }
}

export const GET = async (req: NextRequest, { params }: { params: {pollId: string} }): Promise<NextResponse> => {
    try {
        const pollId = params.pollId
        const votes = await getVotes(parseInt(pollId))
        return NextResponse.json(votes,{status: 200})
    } catch (err: any) {
        return NextResponse.json({message: err.message},{status: 500})
    }
}