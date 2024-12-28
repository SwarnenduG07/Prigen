"use client"
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

function LandingHero():JSX.Element {
    const router  = useRouter();
  return (
    <div className='relative flex justify-center pt-28'>
        {/* Background gradient effects */}
        <div className='absolute w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl -z-10'/>
        <div className='absolute w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl -z-10 translate-x-1/2'/>
        
        <div className='text-center'>
           <h1 className='lg:text-7xl md:text-7xl text-4xl font-thin bg-gradient-to-br from-fuchsia-300 to-purple-600 bg-clip-text text-transparent animate-fade-in'>
              Share Your Files With <span className='font-bold'>Prigen</span>
           </h1>
           <h1 className='text-gray-400 text-2xl pt-7 max-w-2xl mx-auto leading-normal'>
              Meet the system for modern File Sharing. Blazing Fast Speed, No issues, Large Size, End-to-End Encrypted
           </h1>

           <div className='mt-8 space-x-4'>
              <Button 
              onClick={() => router.push("/signup")}
              className='bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white rounded-xl text-lg px-8 py-6 hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-purple-500/20'>
                Share Files Now
              </Button>
              <Button 
              onClick={() => router.push("/about")}
              className='bg-transparent border border-neutral-200 rounded-xl text-lg px-8 py-6 hover:bg-neutral-900 transition-all duration-200'>
                Learn More
              </Button>
           </div>
        </div>        
    </div>
  )
}

export default LandingHero