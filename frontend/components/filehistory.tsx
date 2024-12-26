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
      const res = await axios.get(`${NEXT_PUBLIC_BACKEND_URL}/api/list/receive`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReceivedFiles(res.data.files);
    } catch (err) {
     
      if(axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch files")
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
    <main className="flex flex-col justify-center items-center text-center mt-12">
      <div className="mt-14 text-2xl font-thin text-gray-800">Check Your File History</div>
      <section className="mt-10 mb-10 w-full max-w-7xl bg-neutral-50 dark:bg-gray-600/10 shadow-lg backdrop-blur-md py-16 relative before:absolute before:inset-0 before:bg-gradient-to-br before:bg-purple-500/10 rounded-xl before:to-blue-500/10 before:-z-10 before:rounded-lg">
        <div className="translate-y-[-30%]">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          ) : receivedFiles.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No files have been shared with you yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="font-bold text-black">
                  <TableHead className="text-black">File Name</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Date Received</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receivedFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>{file.file_name}</TableCell>
                    <TableCell>{filesize(file.file_size)}</TableCell>
                    <TableCell>{file.sender_email}</TableCell>
                    <TableCell>{format(new Date(file.created_at), "MMM dd, yyyy")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </section>
    </main>
  );
}
