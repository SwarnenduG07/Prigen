import { Button } from '@/components/ui/button';
import { BirdIcon } from 'lucide-react';
import React from 'react';

const Signup = () => {
  return (
    <main className='flex flex-col items-center justify-center'>
      <div className='text-red-400'>
        <h1 className='flex pt-24 text-5xl font-semibold'>
          <BirdIcon size={45} className='pr-2 text-fuchsia-600' />
          Prigen
        </h1>
      </div>

      
      <div className='bg-gray-800/70 lg:px-64 lg:py-[330px] md:px-64 md:py-[300px] px-52 py-[330px]  relative mt-5 rounded-lg'>
        <div className='ml-6 mt-8 absolute top-0 left-0 '>
          <h1 className='text-white text-2xl font-semibold font-mono'>Create your Free Account</h1>
          <div className='flex lg:space-x-8 md:space-x-7 space-x-1 mt-5'> 
             <Button className='font-semibold rounded-xl px-9  bg-transparent border border-gray-700'>
                 Sign up with Google
             </Button>
             <Button className='font-semibold rounded-xl px-9  bg-transparent border border-gray-700'>
                 Sign up with Apple
             </Button>
          </div>
          <form className="space-y-4 md:space-y-5 pt-6 font-mono" action="#">
                    <div>
                      <label  className="block mb-2 text-sm text-gray-300 dark:text-white font-semibold">Your Name</label>
                      <input type="email" name="email" id="email" className="bg-gray-600 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Your Name"/>
                  </div> 
                  <div>
                      <label  className="block mb-2 text-sm text-gray-300 dark:text-white font-semibold">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-600 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com"/>
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm text-gray-300 dark:text-white font-semibold">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-600 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm text-gray-300 dark:text-white font-semibold">Confirm password</label>
                      <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-600 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label  className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a>
                        </label>
                      </div>
                  </div>
                 <Button className='w-full bg-purple-600 hover:bg-fuchsia-900 rounded-lg'>
                    Create Account
                 </Button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
        </div>
      </div>
    </main>
  );
}

export default Signup;
