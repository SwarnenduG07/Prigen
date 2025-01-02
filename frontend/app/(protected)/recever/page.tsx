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
import z, { date } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResolverSuccess, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { DownloadIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface ReceivedFile {
  file_id: string;  
  file_name: string;
  file_size: number;
  sender_email: string;
  created_at: string;
  shared_id: string;
  password: string;
}

const passwordSchema  = z.object({
    password: z.string().min(6
      , {message: "Passowrd must be 6 character long"}
    ),
})

export default function ReceivePage({data} :{data: ReceivedFile}) {
  const [receivedFiles, setReceivedFiles] = useState<ReceivedFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const[isopen, steIsopen] = useState(false);


  const handelTouggle = () => { 
    steIsopen(!isopen);
  }

  const onClickHandler = (file: ReceivedFile) => {
     handelTouggle();
  }

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
    }
  })

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

  const handleDownload = async (values: z.infer<typeof passwordSchema>, file: ReceivedFile) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/file/retrieve`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shared_id: file.file_id, password: values.password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Download failed');
      }
  
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.file_name);
  
      document.body.appendChild(link);
      link.click();
      link.remove();
      form.reset();
    } catch (err) {
      console.error(err);
      setError('Download failed');
      toast.error('Download not possible');
    } finally {
      setIsLoading(false);
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
                  <TableHead>Expireaction Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody key={receivedFiles.length}>
                {receivedFiles.map((file) => (
                  <TableRow key={file.file_id}>
                    <TableCell>{file.file_name}</TableCell>
                    <TableCell>{formatFileSize(file.file_size)}</TableCell>
                    <TableCell>{file.sender_email}</TableCell>
                    <TableCell>
                      {format(new Date(file.created_at), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                    <Button
                      onClick={() => onClickHandler(file)}
                      className="bg-fuchsia-600 hover:bg-fuchsia-700">
                  <DownloadIcon />
                    </Button>
                      <Dialog modal open={isopen} onOpenChange={handelTouggle}>
                        <DialogContent className="bg-neutral-100 text-black">
                          <DialogHeader>
                            <DialogTitle>File Password</DialogTitle>
                          </DialogHeader>
                          <Separator />
                          <Form {...form}>
                            <form
                              className="space-y-4"
                              onSubmit={form.handleSubmit((values) => handleDownload(values, file))}
                            >
                              <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>File Password</FormLabel>
                                    <FormControl>
                                      <Input {...field} enablePasswordToggle disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button className="w-full bg-purple-500 rounded-md">Submit</Button>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
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