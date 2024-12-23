"use client";
import { Button } from '@/components/ui/button';
import { NEXT_PUBLIC_BACKEND_URL } from '@/config';
import axios, { AxiosError } from 'axios';
import { BirdIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        router.push('/dashboard');
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || 'Login failed');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md rounded-lg p-8 sm:p-10 lg:p-16 bg-gray-800 shadow-lg">
        <div className="text-center text-white">
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
              handleLogin(email, password);
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-300 font-semibold"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-700 border border-gray-600 text-gray-100 text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email Address"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm text-gray-300 font-semibold"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-700 border border-gray-600 text-gray-100 text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 rounded-lg mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>

            {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
            {isLoading && (
              <div className="mt-2 text-gray-400 text-sm">Loading...</div>
            )}

            <p className="text-sm font-light text-gray-400 mt-4 text-center">
              Don't have an account?{' '}
              <a
                href="/signup"
                className="font-medium text-fuchsia-500 hover:underline"
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
