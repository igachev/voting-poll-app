"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { FormEvent, useEffect, useState } from 'react'
import CreatePollForm from '@/components/CreatePollForm/CreatePollForm'
import CreateOptionForm from '@/components/CreateOptionForm/CreateOptionForm'

const CreatePoll = () => {
  const [isPollCreated,setIsPollCreated] = useState<boolean>(false)
  const [pollId,setPollId] = useState<number>()
  const [pollTitle,setPollTitle] = useState<string>("")
  const [pollDescription,setPollDescription] = useState<string>("")
  const [pollOption,setPollOption] = useState<string>("")
  const [successMessage,setSuccessMessage] = useState<string>()

  // hide success message after 4 sec
  useEffect(() => {
    const interval = setTimeout(() => {
        setSuccessMessage("")
    }, 4000);

    return (() => {
      clearTimeout(interval)
    })
  },[successMessage])

  async function onCreatePoll(e: FormEvent) {
    e.preventDefault()
    const userData = localStorage?.getItem("userData")
    let userId = 0;
    if(userData) {
      const data = JSON.parse(userData)
      userId = parseInt(data.id)
      console.log(userId)
    }
    const response = await fetch("/api/add-poll", {
      method: "POST",
      body: JSON.stringify({pollTitle,pollDescription,userId})
    })

    if(response.ok) {
      setSuccessMessage("Poll Created.Add Your Options Now.")
    }

    const id = await response.json()
    setPollId(id)
    setIsPollCreated(true)
  }

  async function onAddOption(e: FormEvent) {
    e.preventDefault()
    const response = await fetch("/api/add-poll/add-options", {
      method: "POST",
      body: JSON.stringify({pollOption,pollId})
    })

    if(response.ok) {
      setSuccessMessage("The Option Was Added")
      setPollOption("")
    }

  }

  return (
    <div className='min-h-[800px] bg-stone-700 text-white'>
      <h1 className='text-xl sm:text-4xl text-center pt-2 pb-3'>Create Poll</h1>

      <h3 className='text-lg sm:text-2xl text-center font-light p-2'>After creating the poll, you can add as many voting options as you want.</h3>
      <h5 className='text-md sm:text-xl text-center opacity-85 p-6'>Simply enter your option in the input field, press the Add button. After adding the desired number of options, press Return to Polls to check your poll.</h5>

      {successMessage && (
        <div className='bg-green-700 border rounded-md p-4 mb-2 w-3/6 mx-auto text-center'>
          {successMessage}
        </div>
      )}

      <CreatePollForm
      isPollCreated={isPollCreated}
      onCreatePoll={onCreatePoll}
      pollTitle={pollTitle}
      setPollTitle={setPollTitle}
      pollDescription={pollDescription}
      setPollDescription={setPollDescription}
      />

     <CreateOptionForm 
     isPollCreated={isPollCreated}
     onAddOption={onAddOption}
     pollOption={pollOption}
     setPollOption={setPollOption}
     />

      <div className='text-center'>
      <Button 
      variant="link" 
      className='text-white hover:text-orange-500 text-sm sm:text-2xl'>
        <Link href="/polls">Return To Polls</Link>
      </Button>
      </div>

    </div>
  )
}

export default CreatePoll