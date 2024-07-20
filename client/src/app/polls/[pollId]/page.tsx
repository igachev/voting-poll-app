"use client"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState,PureComponent } from 'react'
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: CustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

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

interface FormatVote {
  name: string;
  value: number;
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
    const [votes,setVotes] = useState<FormatVote[]>([])
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

        const newVote: FormatVote = {name: selectedOption!,value: 1}
        setVotes((oldVotes) => [...oldVotes,newVote])

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
    <h1 className='text-2xl sm:text-4xl text-center p-2'>Poll Details</h1>
    <div className='bg-stone-500 min-h-[500px] w-5/6 flex flex-col justify-center items-center mx-auto rounded-md shadow-inner shadow-stone-400'>
        
        <section className='w-5/6 bg-slate-500 p-4 flex flex-col justify-center items-center gap-3 shadow-xl shadow-slate-800 rounded-xl'>
          <h3 className='text-xl sm:text-2xl'>Title: {poll?.poll_title}</h3>
          <h5 className='text-lg sm:text-xl'>Description: {poll?.poll_description}</h5>
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

    <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
          <Pie
            data={votes}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {votes.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

export default PollDetails