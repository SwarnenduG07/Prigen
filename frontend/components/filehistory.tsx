"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import axios from "axios";
import { format } from "date-fns";
import { NEXT_PUBLIC_BACKEND_URL } from "@/config";

interface ReceivedFile {
  id: string;
  file_name: string;
  file_size: number;
  sender_email: string;
  created_at: string;
  shared_id: string;
  password: string;
}

export default function FileHistory() {
  const [receivedFiles, setReceivedFiles] = useState<ReceivedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFileHistory();
  }, []);

  const getFileHistory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${NEXT_PUBLIC_BACKEND_URL}/api/list/send`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReceivedFiles(res.data.files);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch files");
      } else {
        console.error(err);
        setError("Failed to fetch files");
      }
    } finally {
      setLoading(false);
    }
  };

  const filesize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Byte";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
  };

  return (
    <main className="flex flex-col justify-center items-center text-center mt-8">
      <div className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
        File History
      </div>
      <section className="w-full max-w-6xl px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center py-8">
                <p className="text-gray-500 dark:text-gray-400">Loading...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center py-8">
                <p className="text-red-500">{error}</p>
              </div>
            ) : receivedFiles.length === 0 ? (
              <div className="flex justify-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No files have been shared by you yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-left">File Name</TableHead>
                      <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-center">Size</TableHead>
                      <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-left">Recipient</TableHead>
                      <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-center">Date Shared</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {receivedFiles.map((file) => (
                      <TableRow key={file.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <TableCell className="text-left">{file.file_name}</TableCell>
                        <TableCell className="text-center">{filesize(file.file_size)}</TableCell>
                        <TableCell className="text-left">{file.sender_email}</TableCell>
                        <TableCell className="text-center">{format(new Date(file.created_at), "MMM dd, yyyy")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
