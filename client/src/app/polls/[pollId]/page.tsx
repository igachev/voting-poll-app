"use client"
import { Button } from '@/components/ui/button';
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
    const [isClicked,setIsClicked] = useState<boolean>(false)

   function onSelectedOption(selectedOption: string) {
    setSelectedOption(selectedOption)
    setIsClicked(true)
    }

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

    // get specified poll by id
    useEffect(() => {
        fetch(`/api/polls/${params.pollId}`)
        .then((data) => data.json())
        .then((result) => setPoll(result))
        .catch((err) => console.log(err))
    },[])

    // get the votes for the specified poll
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
    <div className='min-h-[800px] bg-stone-700 text-white'>
    <h1 className='text-4xl text-center p-2'>Poll Details</h1>
    <div className='bg-stone-500 min-h-[500px] w-5/6 flex flex-col justify-center items-center mx-auto rounded-md'>
        
        <section className='w-5/6 bg-slate-500 p-4 flex flex-col justify-center items-center gap-3'>
          <h3>Title: {poll?.poll_title}</h3>
          <h5>Description: {poll?.poll_description}</h5>
          <div>{poll?.pollOptions.length! > 0 && poll?.pollOptions.map((pollOption) => (
            <div key={pollOption.poll_option} className='mb-2'>
              <Button 
              className={`${selectedOption === pollOption.poll_option ? 'bg-green-500 hover:bg-green-500' : null}`}
              variant='default' 
              onClick={() => onSelectedOption(pollOption.poll_option)}>{pollOption.poll_option}</Button>
            </div>
          ))}</div>
        </section>
        <Button variant="destructive" className='mb-2 mt-2' onClick={deletePoll}>Delete Poll</Button>
        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
        <Button 
        variant="secondary" 
        onClick={voteForPoll}
        disabled={isClicked ? false: true}
        >Vote</Button>
    </div>
    </div>
  )
}

export default PollDetails