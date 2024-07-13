"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface PollOption {
    poll_option: string;
}

interface Poll {
    poll_id: number;
    poll_title: string;
    poll_description: string;
    user_id: number;
    pollOptions: PollOption[];
}

interface Vote {
    [key: string]: number;
}

const PollDetails = ({
    params,
  }: {
    params: { pollId: string; };
  }) => {

    const [poll,setPoll] = useState<Poll | null>(null)
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [selectedOption,setSelectedOption] = useState<string>()
    const [votes,setVotes] = useState<Vote[]>([])

    async function deletePoll() {
      const userData = localStorage?.getItem("userData")

      let userId = 0;
      if(userData) {
        const data = JSON.parse(userData)
        userId = parseInt(data.id)
      }
      
      try {
        const response = await fetch(`/api/polls/${params.pollId}/${userId}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to delete poll')
        }

        router.push("/polls")
      } catch (err: any) {
        setError(err.message)
      }
    }

    async function voteForPoll() {
      const userData = localStorage?.getItem("userData")

      let userId = 0;
      if(userData) {
        const data = JSON.parse(userData)
        userId = parseInt(data.id)
      }

      try {
        const response = await fetch(`/api/polls/${params.pollId}/${userId}`, {
          method: "POST",
          body: JSON.stringify({selectedOption})
        })

        if(!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message)
        }

      } catch (err: any) {
        setError(err.message)
      }
    }

    useEffect(() => {
        fetch(`/api/polls/${params.pollId}`)
        .then((data) => data.json())
        .then((result) => setPoll(result))
        .catch((err) => console.log(err))
    },[])

    useEffect(() => {
      const userData = localStorage?.getItem("userData")

      let userId = 0;
      if(userData) {
        const data = JSON.parse(userData)
        userId = parseInt(data.id)
      }
      fetch(`/api/polls/${params.pollId}/${userId}`)
      .then((response) => response.json())
      .then((data) => setVotes(data))
      .catch((err) => console.log(err))
    },[])

  return (
    <div>
        <h1>Poll Details</h1>
        <section>
          <h3>Title: {poll?.poll_title}</h3>
          <h5>Description: {poll?.poll_description}</h5>
          <div>{poll?.pollOptions.length! > 0 && poll?.pollOptions.map((pollOption) => (
            <div key={pollOption.poll_option}>
              <button onClick={() => setSelectedOption(pollOption.poll_option)}>{pollOption.poll_option}</button>
            </div>
          ))}</div>
        </section>
        <button onClick={deletePoll}>Delete Poll</button>
        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
        <button onClick={voteForPoll}>Vote</button>
    </div>
  )
}

export default PollDetails