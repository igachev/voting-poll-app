'use client';

import * as React from 'react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  // Handle the submission of the sign-in form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {

        const user = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({email: email, password: password})
        })
        const userData = await user.json()
    
        if(!userData) {
          return
        }
        
        localStorage.setItem("userData",JSON.stringify({id: userData.user_id, email: userData.user_email}))
        await setActive({ session: signInAttempt.createdSessionId });
        router.push('/polls');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Display a form to capture the user's email and password
  return (
    <div className='min-h-[800px] bg-stone-700 text-white flex flex-col items-center justify-center'>
      <h1 className='text-3xl sm:text-4xl pb-2'>Sign in</h1>
      <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col w-5/6 min-h-[400px] bg-slate-800 p-3 gap-2 items-center justify-center'>
        <div className='w-full sm:w-2/6 md:w-3/6 text-center'>
          <label htmlFor="email" className='text-lg sm:text-xl'>Enter email address</label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            value={email}
            className=''
          />
        </div>
        <div className='w-full sm:w-2/6 md:w-3/6 text-center'>
          <label htmlFor="password" className='text-lg sm:text-xl'>Enter password</label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            value={password}
            className=''
          />
        </div>
        <Button type="submit" className='w-4/6 sm:w-2/6' variant={"secondary"}>Sign in</Button>
      </form>
    </div>
  );
}