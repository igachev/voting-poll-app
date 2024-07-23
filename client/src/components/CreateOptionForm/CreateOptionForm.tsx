import { FormEvent } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface CreateOptionFormProps {
    isPollCreated: boolean;
    onAddOption: (e:FormEvent) => Promise<void>;
    pollOption: string;
    setPollOption: React.Dispatch<React.SetStateAction<string>>;
}

const CreateOptionForm = ({
    isPollCreated,
    onAddOption,
    pollOption,
    setPollOption
}: CreateOptionFormProps) => {
  return (
    <>
     {isPollCreated && (
        <div>
          <form method="post" onSubmit={onAddOption} className='flex flex-col justify-evenly items-center min-h-[500px] bg-slate-500'>
            <div className='p-2'>
              <Label htmlFor="pollOption" className=''>Add Option For The Created Poll:</Label>
              <Input 
              type="text" 
              name='pollOption'
              value={pollOption}
              onChange={(e) => setPollOption(e.target.value)}
              className='max-w-96 mt-2'
              />
            </div>

            <div>
              <Button variant="default" type='submit'>Add Option</Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default CreateOptionForm