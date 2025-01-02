"use client"
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

function LandingHero():JSX.Element {
    const router = useRouter();
    
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.2 }
      }
    }

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5 }
      }
    }

    return (
      <motion.div 
        className='relative flex justify-center pt-28'
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
          <motion.div 
            className='absolute w-[600px] h-[600px] bg-purple-500/65 rounded-full blur-3xl -z-10'
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className='absolute w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl -z-10 translate-x-1/2'
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className='text-center'>
             <motion.h1 
               variants={itemVariants}
               className='lg:text-7xl md:text-7xl text-4xl font-thin bg-gradient-to-br from-fuchsia-300 to-purple-600 bg-clip-text text-transparent'
             >
                Share Your Files With <span className='font-bold'>Prigen</span>
             </motion.h1>
             <motion.h1 
               variants={itemVariants}
               className='text-gray-400 text-2xl pt-7 max-w-2xl mx-auto leading-normal'
             >
                Meet the system for modern File Sharing. Blazing Fast Speed, No issues, Large Size, End-to-End Encrypted
             </motion.h1>

             <motion.div 
               variants={itemVariants}
               className='mt-8 space-x-4'
             >
                <Button 
                onClick={() => router.push("/signup")}
                className='bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white rounded-xl text-lg px-8 py-6 hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-purple-500/20'
                >
                  Share Files Now
                </Button>
                <Button 
                onClick={() => router.push("/about")}
                className='bg-transparent border  text-neutral-50 border-neutral-200 rounded-xl text-lg px-8 py-6 hover:bg-neutral-900 transition-all duration-200'
                >
                  Learn More
                </Button>
             </motion.div>
          </div>        
      </motion.div>
    )
}

export default LandingHero