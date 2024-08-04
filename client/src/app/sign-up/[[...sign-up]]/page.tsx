'use client';

import * as React from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState('');
  const router = useRouter();

  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === 'complete') {
        const user = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify({email: emailAddress, password: password})
        })
        
        const userData = await user.json()
        if(!userData) {
          return
        }
        
        await setActive({ session: completeSignUp.createdSessionId });
       
        localStorage.setItem("userData",JSON.stringify({id: userData.user_id, email: userData.user_email}))
        router.push('/polls');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <div className='min-h-[800px] bg-stone-700 text-white flex flex-col items-center justify-center'>
        <h1 className='text-3xl sm:text-4xl pb-2'>Verify your email</h1>
        <form onSubmit={handleVerify} className='flex flex-col w-5/6 min-h-[400px] bg-slate-800 p-3 gap-2 items-center justify-center'>
          <div className='w-full sm:w-2/6 md:w-3/6 text-center'>
          <Label id="code" className='text-lg sm:text-xl'>Enter your verification code</Label>
          <Input
            value={code}
            id="code"
            name="code"
            onChange={(e) => setCode(e.target.value)}
            className='text-sm sm:text-base md:text-xl'
          />
          </div>
          <Button className='w-4/6 sm:w-2/6' variant={"secondary"} type="submit">Verify</Button>
        </form>
      </div>
    );
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <div className='min-h-[800px] bg-stone-700 text-white flex flex-col items-center justify-center'>
      <h1 className='text-3xl sm:text-4xl pb-2'>Sign up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col w-5/6 min-h-[400px] bg-slate-800 p-3 gap-2 items-center justify-center'>
        <div className='w-full sm:w-2/6 md:w-3/6 text-center'>
          <Label htmlFor="email" className='text-lg sm:text-xl'>Enter email address</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className='text-sm sm:text-base md:text-xl'
          />
        </div>
        <div className='w-full sm:w-2/6 md:w-3/6 text-center'>
          <Label htmlFor="password" className='text-lg sm:text-xl'>Enter password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='text-sm sm:text-base md:text-xl'
          />
        </div>
        
          <Button className='w-4/6 sm:w-2/6' variant={"secondary"} type="submit">Next</Button>
        
      </form>
    </div>
  );
}