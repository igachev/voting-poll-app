"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface PollOption {
    pollOption: string;
}

interface Poll {
    poll_id: number;
    poll_title: string;
    poll_description: string;
    user_id: number;
    pollOptions: PollOption[];
}

const PollDetails = ({
    params,
  }: {
    params: { pollId: string; };
  }) => {

    const [poll,setPoll] = useState<Poll | null>(null)
    const router = useRouter()

    useEffect(() => {
        fetch(`/api/polls/${params.pollId}`)
        .then((data) => data.json())
        .then((result) => setPoll(result))
        .catch((err) => console.log(err))
    },[])

    console.log(poll)

  return (
    <div>
        <h1>Poll Details</h1>
        
    </div>
  )
}

export default PollDetails