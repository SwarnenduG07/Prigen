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
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { DownloadIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

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

export default function ReceivePage() {
  const [receivedFiles, setReceivedFiles] = useState<ReceivedFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const[isopen, setOpen] = useState(false);


  const handelTouggle = () => { 
    setOpen(!isopen);
  }

  const onClickHandler = () => {
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
        console.log(errorData, "errorData")
        throw new Error(errorData.message || 'Failed to retrieve file');
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
      setOpen(false);
    }
  };
  

  const formatFileSize = (bytes: number) => {
    if (isNaN(bytes) || bytes < 0) return '0 Bytes';
    if (bytes === 0) return '0 Bytes';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    
    // Check if i is within valid range
    if (i < 0 || i >= sizes.length) return '0 Bytes';
    
    const size = bytes / Math.pow(1024, i);
    return Math.round(size * 100) / 100 + ' ' + sizes[i];
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const blobVariants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <main className="container mx-auto p-4 overflow-hidden bg-transparent">
      <motion.div 
        className='w-[590px] h-[400px] bg-blue-700/30 rounded-[100%] absolute z-1 top-[60%] left-[55%] dark:left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[90px]'
        variants={blobVariants}
        animate="animate"
      />
      <motion.div 
        className='w-[300px] h-[300px] bg-purple-700/30 rounded-[100%] absolute z-1 top-[60%] left-[45%] dark:left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[90px]'
        variants={blobVariants}
        animate="animate"
      />
      <Topbar />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="mt-8 backdrop-blur-sm bg-gray-800/5 border border-gray-700/20 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="border-b border-gray-700/20">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between"
            >
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Received Files
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="mt-4 p-6">
            {isLoading ? (
              <motion.div 
                className='text-center text-gray-200'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ⟳
                </motion.div>
              </motion.div>
            ) : error ? (
              <motion.div 
                className='text-center text-red-500'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            ) : receivedFiles.length === 0 ? (
              <motion.div 
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-gray-300">No files have been shared with you yet</p>
              </motion.div>
            ) : (
              <div className="rounded-lg overflow-hidden border border-gray-700/20 backdrop-blur-md">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-800/5">
                      <TableHead className="font-bold text-gray-100">File Name</TableHead>
                      <TableHead className="font-bold text-gray-100">Size</TableHead>
                      <TableHead className="font-bold text-gray-100">Sender</TableHead>
                      <TableHead className="font-bold text-gray-100">Expiration Date</TableHead>
                      <TableHead className="font-bold text-gray-100">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody key={receivedFiles.length}>
                    {receivedFiles.map((file, index) => (
                      <motion.tr
                        key={file.file_id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-700/10 transition-colors duration-150 text-gray-100"
                      >
                        <TableCell className="font-medium text-gray-100">{file.file_name}</TableCell>
                        <TableCell className="text-gray-100">{formatFileSize(file.file_size)}</TableCell>
                        <TableCell className="text-gray-100">{file.sender_email}</TableCell>
                        <TableCell className="text-gray-100">
                          {format(new Date(file.created_at), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell>
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              onClick={() => onClickHandler()}
                              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                            >
                              <DownloadIcon className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </motion.div>
                          <Dialog modal open={isopen} onOpenChange={handelTouggle}>
                            <DialogContent className="bg-gray-800/80 backdrop-blur-md border border-gray-700/20">
                              <DialogHeader>
                                <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                  File Password
                                </DialogTitle>
                              </DialogHeader>
                              <Separator className="bg-gray-700/50" />
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
                                        <FormLabel className="text-gray-100">File Password</FormLabel>
                                        <FormControl>
                                          <Input {...field} enablePasswordToggle disabled={isLoading} className="text-gray-100" />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                      </FormItem>
                                    )}
                                  />
                                  <Button className="w-full bg-purple-500 rounded-md">Submit</Button>
                                </form>
                              </Form>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}