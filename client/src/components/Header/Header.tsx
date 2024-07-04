"use client"
import { SignedIn, useAuth, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    let {isSignedIn} = useAuth()
  return (
    <header>
          <nav>
            <ul>

              {isSignedIn && (
                <>
                <li>
                <SignedIn>
                <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </li>
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