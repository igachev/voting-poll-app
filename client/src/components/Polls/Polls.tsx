"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"



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

    const [polls, setPolls] = useState<Poll[]>([])
    const router = useRouter()

    useEffect(() => {
        async function fetchPolls() {
            try {
                const response = await fetch("/api/polls")
                const result = await response.json()
                //   console.log(result)
                setPolls(result)
            } catch (err) {
                console.log(err)
            }
        }

        fetchPolls()
    }, [])

    return (
        <div className='flex flex-col w-11/12 mx-auto bg-slate-300 p-4 h-[700px] overflow-y-scroll rounded-lg shadow-sm shadow-red-200'>
            {polls.length > 0 && polls.map((poll) => (
                <Card key={poll.poll_id} className='max-w-3/6 mb-2 bg-orange-700 text-white font-light opacity-80'>
                    <CardHeader className='text-center'>
                        <CardTitle>Poll: {poll.poll_title}</CardTitle>
                        <CardDescription className='text-white'>Description: {poll.poll_description}</CardDescription>
                    </CardHeader>
                    <CardFooter className='justify-center'>
                        <Button variant="link">
                            <Link href={`/polls/${poll.poll_id}`} className='text-lg text-amber-300'>Details</Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default Polls