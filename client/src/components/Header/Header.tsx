"use client"
import { SignedIn, useAuth, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useEffect } from 'react'

const Header = () => {
    let {isSignedIn} = useAuth()

    useEffect(() => {
      if(!isSignedIn) {
        localStorage.removeItem("userData")
      }
    },[isSignedIn])

  return (
    <header>
          <nav>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/polls">Polls</Link></li>
              {isSignedIn && (
                <>
                <li>
                <SignedIn>
                <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </li>
              <li><Link href="/create-poll">Create Poll</Link></li>
                </>
              )}

            {!isSignedIn && (
                <>
                  <li><Link href="/sign-in">Sign In</Link></li>
                  <li><Link href="/sign-up">Sign Up</Link></li>
                </>
            )}
            
            </ul>
          </nav>
    </header>    
  )
}

export default Header