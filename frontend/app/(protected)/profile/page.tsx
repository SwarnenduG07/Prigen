"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { NEXT_PUBLIC_BACKEND_URL } from '@/config';
import Topbar from '@/components/topbar';

interface FileHistory {
  id: string;
  filename: string;
  created_at: string;
  recipient_email: string;
  status: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [files, setFiles] = useState<FileHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
    updatePassword();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${NEXT_PUBLIC_BACKEND_URL}/api/user/me/`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      setProfile(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load profile');
    }
  };

  const updatePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${NEXT_PUBLIC_BACKEND_URL}/api/user/password`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      setFiles(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* Background Effects */}
      <div className='w-[590px] h-[400px]  bg-[#2cec59] dark:bg-emerald-700 rounded-[100%] absolute z-1 top-[60%] left-[55%] dark:left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[90px] flex items-center text-center justify-center '></div>
      <div className='w-[300px] h-[400px]  bg-[#e026e6] dark:bg-yellow-500  rounded-[100%] absolute z-1 top-[60%] left-[55%] dark:left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[90px] flex items-center text-center justify-center '></div>
      <Topbar />
       <div className='mt-10 ml-7'>
           <h1 className='font-bold text-lg'>
              Update user name
           </h1>
           <div>
              <label className=' mb-4 text-sm text-gray-600 dark:text-white font-semibold'>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                // value={name}
                className="pt-2 bg-gray-600/5 border border-purple-400 text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[500px] p-2.5"
                placeholder="jhondow@gmail.com"
              />
              <label className=' mb-4 text-sm text-gray-600 dark:text-white font-semibold'>Name</label>
              <input
                type="name"
                name="name"
                id="name"
                className="pt-2 bg-gray-600/5 border border-purple-400 text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[500px] p-2.5"
                placeholder="name"
              />
           </div>
       </div>
      </main>
  );
}