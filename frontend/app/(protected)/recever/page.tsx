"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { NEXT_PUBLIC_BACKEND_URL } from '@/config';
import axios from 'axios';
import Topbar from '@/components/topbar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
        <Card>
           <CardHeader>
              Receive File
           </CardHeader>
           <Separator/>
           <CardContent>
             
           </CardContent>
        </Card>
      
    </main>
  );
}