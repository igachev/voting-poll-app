
import { Ubuntu } from 'next/font/google'
import React from 'react'

export const ubuntu = Ubuntu({
    subsets:['latin'],
    weight: '400',
    display: 'swap',
    style: 'normal',
    variable: '--font-ubuntu',
})

const Footer = () => {
  return (
    <div className={`${ubuntu.variable} font-ubuntu w-full h-[90px] bg-slate-600 pt-4 pb-2`}>
        <h3 className={`text-white text-center text-2xl sm:text-4xl`}>Join Our Polls</h3>
    </div>
  ) 
}

export default Footer