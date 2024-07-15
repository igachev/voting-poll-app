import Polls from '@/components/Polls/Polls'
import React from 'react'

const PollsPage = () => {
  return (
    <div className='min-h-[800px] bg-stone-700'>
        <h1 className='text-white font-light text-3xl text-center opacity-90 py-1 pb-1'>List Of Polls</h1>
        <Polls />
    </div>
  )
}

export default PollsPage