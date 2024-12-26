"use client"
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { NEXT_PUBLIC_BACKEND_URL } from '@/config';
import axios from 'axios';
import Topbar from '@/components/topbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';

interface ReceivedFile {
  id: string;
  file_name: string;
  file_size: number;
  sender_email: string;
  created_at: string;
  shared_id: string;
  password: string;
}

export default function ReceivePage() {
  const [receivedFiles, setReceivedFiles] = useState<ReceivedFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    fetchReceivedFiles();
  }, []);

  const fetchReceivedFiles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${NEXT_PUBLIC_BACKEND_URL}/api/list/receive`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      setReceivedFiles(response.data.files);
    } catch (err) {
      if (axios.isAxiosError(err)) {
      setError(err.response?.data?.message || 'Failed to fetch files');
      } else {
        setError("Failed to fetch files");
      }
    }
  };

  const handleDownload = async (sharedId: string) => {
    setDownloadingId(sharedId);
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
         await axios.post(
        `${NEXT_PUBLIC_BACKEND_URL}/api/file/retrieve`,
        {
          shared_id: sharedId,
          password: '',
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type':"application/json"
          },
          responseType: 'blob'
        }
      );

      // Create download link
      // const blob = new Blob([response.data]);
      // // const url = window.URL.createObjectURL(blob)
      // const link = document.createElement('a');
      // // link.href = url;
      
      // // Get filename from Content-Disposition header
      // const filename = response.headers['content-disposition']?.split('filename=')[1] || 'downloaded-file';
      // link.download = filename;
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
      // window.URL.revokeObjectURL(url);

    } catch (err) {
      if(axios.isAxiosError(err)) {
      setError(err.response?.data?.message || 'Download failed');
      } else {
        setError("Download failed");
      }
    } finally {
      setIsLoading(false);
      setDownloadingId(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  };

  return (
    <main className="container mx-auto p-4">
      <div className='w-[590px] h-[400px]  bg-[#d82fc4] dark:bg-emerald-700 rounded-[100%] absolute z-1 top-[60%] left-[55%] dark:left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[90px] flex items-center text-center justify-center '></div>
      <div className='w-[300px] h-[300px]  bg-[#f22828] dark:bg-yellow-500  rounded-[100%] absolute z-1 top-[60%] left-[45%] dark:left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[90px] flex items-center text-center justify-center '></div>
      <Topbar />
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Received Files</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          {isLoading ? (
            <div className='text-center text-gray-700'>
                ...Loading
            </div>
          ) : error ? (
            <div className='text-center text-red-500'>
              {error}
            </div>
          ): receivedFiles.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No files have been shared with you yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Date Received</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody key={receivedFiles.length}>
                {receivedFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>{file.file_name}</TableCell>
                    <TableCell>{formatFileSize(file.file_size)}</TableCell>
                    <TableCell>{file.sender_email}</TableCell>
                    <TableCell>
                      {format(new Date(file.created_at), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDownload(file.shared_id)}
                        disabled={downloadingId === file.shared_id}
                        className="bg-fuchsia-600 hover:bg-fuchsia-700"
                      >
                        {downloadingId === file.shared_id ? 'Downloading...' : 'Download'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
        </CardContent>
      </Card>
    </main>
  );
}