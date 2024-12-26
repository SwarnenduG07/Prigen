"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { NEXT_PUBLIC_BACKEND_URL } from '@/config';
import Topbar from '@/components/topbar';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [password, setPassword] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      if (file) formData.append('fileUpload', file);
      formData.append('recipient_email', recipientEmail);
      formData.append('password', password);
      const fromateExpiredDate = new Date (expirationDate).toISOString();
      formData.append('expiration_date', fromateExpiredDate);

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${NEXT_PUBLIC_BACKEND_URL}/api/file/upload`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.status === 'success') {
        // Handle success
        console.log('File uploaded successfully');
      }
    } catch (err) {
      if(axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Upload failed');
      } else {
        setError('Upload failed');
      }
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
        <h1 className="text-3xl font-bold text-red-600 dark:text-lime-400 mb-8 text-center">Upload File</h1>

        <div className='bg-white/10 dark:bg-gray-600/10 shadow-lg backdrop-blur-md px-16 py-16 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:via-pink-500/10 before:to-blue-500/10 before:-z-10 before:rounded-lg rounded-xl'>
        
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className=''>
                <label className="block text-lg font-bold dark:text-fuchsia-100 mb-2">
                    File
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full rounded-full border-2 border- hover:border-fuchsia-500 p-3 border-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-bold dark:text-fuchsia-100 mb-2">
                  Recipient Email
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder='jhon@gmail.com'
                  className="w-full rounded-full border-2 border- hover:border-fuchsia-500 p-3 border-gray-900 bg-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-bold dark:text-fuchsia-100 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                  className="w-full rounded-full border-2 border- hover:border-fuchsia-500 p-3 border-gray-900 bg-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-bold dark:text-fuchsia-100 ">
                  Expiration Date
                </label>
                <input
                  type="datetime-local"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="w-full rounded-full border-2 border- hover:border-fuchsia-500 p-3 border-gray-900 bg-transparent"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-full hover:bg-cyan-500 dark:bg-amber-400 hover:dark:bg-amber-800 dark:text-gray-700 text-[17px] hover:dark:text-neutral-200 font-bold"
                disabled={isLoading}
              >
                {isLoading ? 'Uploading...' : 'Upload File'}
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