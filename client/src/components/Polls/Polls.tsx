"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface PollOption {
    pollOption: string;
}

interface Poll {
    poll_id: number;
    poll_title: string;
    poll_description: string;
    user_id: number;
    options: PollOption[];
}

const Polls = () => {

    const [polls,setPolls] = useState<Poll[]>([])
    const router = useRouter()

    useEffect(() => {
        async function fetchPolls() {
            try {
                const response = await fetch("/api/polls")
                const result = await response.json()
                console.log(result)
                setPolls(result) 
            } catch (err) {
                console.log(err)
            }
        }

        fetchPolls()
    },[])

  return (
    <div>
        {polls.length > 0 && polls.map((poll) => (
            <div key={poll.poll_id}>
                <h2>Poll: {poll.poll_title}</h2>
                <p>Description: {poll.poll_description}</p>
                <div>
                    <Link href={`/polls/${poll.poll_id}`}>Details</Link>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Polls