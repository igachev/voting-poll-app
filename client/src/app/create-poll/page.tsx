"use client"
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'

const CreatePoll = () => {
  const [isPollCreated,setIsPollCreated] = useState<boolean>(false)
  const [pollId,setPollId] = useState<number>()
  const [pollTitle,setPollTitle] = useState<string>("")
  const [pollDescription,setPollDescription] = useState<string>("")
  const [pollOption,setPollOption] = useState<string>("")

  async function onCreatePoll(e: FormEvent) {
    e.preventDefault()
    const userData = localStorage?.getItem("userData")
    console.log(userData)
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
  }

  return (
    <div>
      <h1>Create Poll</h1>

      {!isPollCreated && (
        <div>
          <form method="post" onSubmit={onCreatePoll}>
            <div>
              <label htmlFor="pollTitle">Poll Title:</label>
              <input type="text"
               name='pollTitle' 
               value={pollTitle} 
               onChange={(e) => setPollTitle(e.target.value)}
                />
            </div>

            <div>
              <label htmlFor="pollDescription">Poll Description:</label>
              <input 
              type="text"
              name='pollDescription'
              value={pollDescription}
              onChange={(e) => setPollDescription(e.target.value)}
               />
            </div>

            <div>
              <button type='submit'>Create</button>
            </div>
          </form>
        </div>
      )}

      {isPollCreated && (
        <div>
          <form method="post" onSubmit={onAddOption}>
            <div>
              <label htmlFor="pollOption">Option:</label>
              <input 
              type="text" 
              name='pollOption'
              value={pollOption}
              onChange={(e) => setPollOption(e.target.value)}
              />
            </div>

            <div>
              <button type='submit'>Add Option</button>
            </div>
          </form>
        </div>
      )}

      <div>
      <Link href="/polls">Go To Polls</Link>
      </div>

    </div>
  )
}

export default CreatePoll