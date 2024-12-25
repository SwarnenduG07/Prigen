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
    fetchFileHistory();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${NEXT_PUBLIC_BACKEND_URL}/api/user/me/name`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      setProfile(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load profile');
    }
  };

  const fetchFileHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${NEXT_PUBLIC_BACKEND_URL}/api/files/history`,
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
      <Topbar />
      
      {/* Background Effects */}
      <div className='w-[590px] h-[400px] bg-purple-400 dark:bg-emerald-700 rounded-full absolute z-1 top-[30%] left-[55%] blur-[90px] opacity-20'></div>
      <div className='w-[300px] h-[300px] bg-pink-400 dark:bg-yellow-500 rounded-full absolute z-1 top-[40%] left-[35%] blur-[90px] opacity-20'></div>

      </main>
  );
}