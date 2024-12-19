"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { NEXT_PUBLIC_BACKEND_URL } from '@/config';
import axios from 'axios';
import Topbar from '@/components/topbar';

export default function DownloadPage() {
  const [sharedId, setSharedId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${NEXT_PUBLIC_BACKEND_URL}/api/files/retrieve`,
        {
          shared_id: sharedId,
          password: password
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          responseType: 'blob'
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Get filename from Content-Disposition header
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : 'download';
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (err: any) {
      setError(err.response?.data?.message || 'Download failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="">
        <div className='w-[590px] h-[400px]  bg-[#d82fc4] dark:bg-emerald-700 rounded-[100%] absolute z-1 top-[60%] left-[55%] dark:left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[90px] flex items-center text-center justify-center '></div>
        <div className='w-[300px] h-[300px]  bg-[#f22828] dark:bg-yellow-500  rounded-[100%] absolute z-1 top-[60%] left-[45%] dark:left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[90px] flex items-center text-center justify-center '></div>
        <Topbar />
      <div className="flex flex-col items-center justify-center mt-24">
        <h1 className="text-2xl font-bold mb-8 text-center text-white">Download File</h1>
        <div className='bg-white/10 dark:bg-gray-600/10 shadow-lg backdrop-blur-md px-16 py-16 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:via-pink-500/10 before:to-blue-500/10 before:-z-10 before:rounded-lg rounded-xl'>
          <form onSubmit={handleDownload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Shared ID
              </label>
              <input
                type="text"
                value={sharedId}
                onChange={(e) => setSharedId(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? 'Downloading...' : 'Download File'}
            </Button>

            {error && (
              <div className="text-red-500 text-center mt-4">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}