import { getVotes } from "@/utils/database"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, { params }: { params: {pollId: string} }): Promise<NextResponse> => {
    try {
        const pollId = params.pollId
        const votes = await getVotes(parseInt(pollId))
        const formatVotes = []
        for(let i = 0; i < votes.length; i++) {
            for (const [key, value] of Object.entries(votes[i])) {
                formatVotes.push({name: key, value: value})
              }
        }
        return NextResponse.json(formatVotes,{status: 200})
    } catch (err: any) {
        return NextResponse.json({message: err.message},{status: 500})
    }
}