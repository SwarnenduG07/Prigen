"use client"
import { signIn } from 'next-auth/react';
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

function LandingHero():JSX.Element {
    const router  = useRouter();
  return (
    <div className='flex justify-center pt-28'>
        <div className=' '>
           <h1 className='text-7xl font-thin bg-gradient-to-br from-fuchsia-300 to-purple-600 bg-clip-text text-transparent'>
              Shere Your Files With <span className='font-bold'>Prigen</span>
           </h1>
           <h1 className='text-gray-500 text-2xl pt-7 max-w-xl'>
           Meet the system for modern File Shearing. Blezing Fast Speed,No issues, Learg Size, E2E Encrypted
           </h1>

           <div className='mt-6'>
              <Button 
              onClick={() => {
                 router.push("/signup")
              }}
              className='bg-neutral-300 text-black rounded-xl text-sm hover:bg-neutral-500'>
                Share Your Files
              </Button>
           </div>
        </div>        
    </div>
  )
}

export default LandingHero