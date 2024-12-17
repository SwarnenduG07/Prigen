"use client"
import { Button } from '@/components/ui/button';
import { BACKEND_URL } from '@/config';
import axios from 'axios';
import { BirdIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

async function handleSignin(email: string, password: string) {
  const router = useRouter()
  try {
    
    const response = await axios.post(`${BACKEND_URL}/login`, {
      email,
      password
    })
    const { token } = response.data;
    localStorage.setItem('token', token);
    router.push("/dashboard")

  } catch (error) {
    console.error('Login error:', error);
    alert('Invalid email or password'); 
  }
}

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // To manage loading state (optional)

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
          <h1 className="text-2xl font-semibold font-mono text-center">Login To Your Account</h1>
          <div className="mt-5 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="font-semibold rounded-xl px-9 bg-transparent border border-gray-700 w-full sm:w-auto">
              Sign in with Google
            </Button>
            <Button className="font-semibold rounded-xl px-9 bg-transparent border border-gray-700 w-full sm:w-auto">
              Sign in with Apple
            </Button>
          </div>

          <form
            className="space-y-4 pt-6 font-mono mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              handleSignin(email, password).finally(() => setLoading(false));
            }}
          >
            <div>
              <label className="block mb-2 text-sm text-gray-300 dark:text-white font-semibold">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-600 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-300 dark:text-white font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-600 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-fuchsia-900 rounded-lg mt-4"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4 text-center">
              Don't have an account?{' '}
              <a
                href="/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-cyan-500"
              >
                Signup here
              </a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signin;
