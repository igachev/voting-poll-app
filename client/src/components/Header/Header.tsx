"use client"
import { SignedIn, useAuth, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useEffect } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Roboto_Mono } from 'next/font/google'

export const roboto = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  style:['normal'],
  variable: '--font-roboto-mono'
})


const Header = () => {
  let { isSignedIn } = useAuth()

  useEffect(() => {
    if (!isSignedIn) {
      localStorage.removeItem("userData")
    }
  }, [isSignedIn])

  return (
    <header className={`${roboto.variable} font-roboto-mono w-full bg-slate-600 pt-2 pb-2`}>
      <NavigationMenu >
        <NavigationMenuList className='w-full flex flex-col justify-center sm:flex-row'>

          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/polls" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Polls
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {isSignedIn && (
            <>

          <NavigationMenuItem>
            <Link href="/create-poll" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Create Poll
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className='mt-1'>
            <SignedIn>
                <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </NavigationMenuItem>

            </>
          )}

          {!isSignedIn && (
            <>
            <NavigationMenuItem>
            <Link href="/sign-in" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Login
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/sign-up" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Register
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

            </>
          )}

        </NavigationMenuList>
      </NavigationMenu>

    </header>
  )
}

export default Header