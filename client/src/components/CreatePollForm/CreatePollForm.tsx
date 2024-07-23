import { FormEvent } from "react";
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface CreatePollFormProps {
    isPollCreated: boolean;
    onCreatePoll: (e: FormEvent) => Promise<void>;
    pollTitle: string;
    setPollTitle: React.Dispatch<React.SetStateAction<string>>;
    pollDescription: string;
    setPollDescription: React.Dispatch<React.SetStateAction<string>>;
}

const CreatePollForm = ({
    isPollCreated,
    onCreatePoll,
    pollTitle,
    setPollTitle,
    pollDescription,
    setPollDescription
}: CreatePollFormProps) => {
  return (
    <>
    {!isPollCreated && (
        <div >
          <form className='min-h-[500px] bg-slate-500 flex flex-col items-center justify-center gap-3' method="post" onSubmit={onCreatePoll}>
            <div className='pl-2 pr-2'>
              <Label htmlFor="pollTitle">Poll Title:</Label>
              <Input type="text"
               name='pollTitle' 
               value={pollTitle} 
               onChange={(e) => setPollTitle(e.target.value)}
                />
            </div>

            <div className='pl-2 pr-2'>
              <Label htmlFor="pollDescription">Poll Description:</Label>
              <Input 
              type="text"
              name='pollDescription'
              value={pollDescription}
              onChange={(e) => setPollDescription(e.target.value)}
               />
            </div>

            <div className='pl-2 pr-2'>
              <Button variant="destructive" size="lg" type='submit'>Create</Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default CreatePollForm