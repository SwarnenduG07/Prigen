"use client"
import { Button } from '@/components/ui/button';
import { BACKEND_URL } from '@/config';
import axios from 'axios';
import { BirdIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      
      const response = await axios.post(`${BACKEND_URL}/register`, {
        name,
        email,
        password,
        password_confirm: confirmPassword, 
      });

      const { token } = response.data;
      localStorage.setItem('token', token);  
      router.push('/dashboard');  

    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Error during registration');
      } else {
        setError('Unexpected error occurred');
      }
    }
  };

  return (
    <main className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg p-8 sm:p-10 lg:p-16">
        <div className="text-center text-red-400">
          <h1 className="text-4xl sm:text-5xl font-semibold flex justify-center items-center">
            <BirdIcon size={45} className="pr-2 text-fuchsia-600" />
            Prigen
          </h1>
        </div>

        <div className="mt-8 text-white">
          <h1 className="text-2xl font-semibold font-mono text-center">Create your Free Account</h1>
          <div className="mt-5 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="font-semibold rounded-xl px-9 bg-transparent border border-gray-700 w-full sm:w-auto">
              Sign up with Google
            </Button>
            <Button className="font-semibold rounded-xl px-9 bg-transparent border border-gray-700 w-full sm:w-auto">
              Sign up with Apple
            </Button>
          </div>


          {error && (
            <div className="text-red-600 text-center mt-4">
              <p>{error}</p>
            </div>
          )}

          <form className="space-y-4 pt-6 font-mono mt-8" onSubmit={handleSignup}>
            <div>
              <label className="block mb-2 text-sm text-gray-300 dark:text-white font-semibold">Your Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-600 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-300 dark:text-white font-semibold">Your email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-600 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-300 dark:text-white font-semibold">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-600 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-300 dark:text-white font-semibold">Confirm password</label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-600 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-light text-gray-500 dark:text-gray-300">
                  I accept the{' '}
                  <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-fuchsia-900 rounded-lg mt-4">
              Create Account
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4 text-center">
              Already have an account?{' '}
              <a href="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-cyan-500">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
