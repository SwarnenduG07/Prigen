"use client"
import React from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

const Navbar = () => {
  return (
    <div className='bg-green-600 py-4'> 
           <div className='flex justify-between'>
               <h1 className='text-3xl'>
                 Prigen
               </h1>
               <span>
                   <Button 
                   onClick={() => {
                      signIn()
                   }}
                   >
                      Login
                   </Button>
               </span>
           </div>
    </div>
  )
}

export default Navbar
