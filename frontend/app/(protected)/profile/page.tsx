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

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="space-y-8">
            {/* Profile Info */}
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Profile</h2>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">Email: {profile?.email}</p>
                <p className="text-gray-600 dark:text-gray-300">Public Key Status: {profile?.public_key ? "Generated" : "Not Generated"}</p>
              </div>
            </div>

            {/* File History */}
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">File History</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-600 dark:text-gray-300">
                      <th className="p-2">Filename</th>
                      <th className="p-2">Recipient</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file) => (
                      <tr key={file.id} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="p-2 text-gray-600 dark:text-gray-300">{file.filename}</td>
                        <td className="p-2 text-gray-600 dark:text-gray-300">{file.recipient_email}</td>
                        <td className="p-2 text-gray-600 dark:text-gray-300">
                          {new Date(file.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-2 text-gray-600 dark:text-gray-300">{file.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}