"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { NEXT_PUBLIC_BACKEND_URL } from '@/config';

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
      formData.append('expiration_date', expirationDate);

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${NEXT_PUBLIC_BACKEND_URL}/api/files/upload`,
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
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="w-full max-w-md bg-emerald-200 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-8 text-center">Upload File</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-bold text-purple-600 mb-2">
                File
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full rounded-sm border-2 hover:border-fuchsia-500 p-2 border-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-bold text-purple-600 mb-2">
              Recipient Email
            </label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder='jhon@gmail.com'
              className="w-full rounded-sm border-2 hover:border-fuchsia-500 p-2 border-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-bold text-purple-600 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className="w-full rounded-sm border-2 hover:border-fuchsia-500 p-2 border-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-bold text-purple-600 mb-2">
              Expiration Date
            </label>
            <input
              type="datetime-local"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="w-full rounded-sm border-2 hover:border-fuchsia-500 p-2 border-gray-900"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
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
    </main>
  );
}