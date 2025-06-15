"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { NEXT_PUBLIC_BACKEND_URL } from "@/config";
import Topbar from "@/components/topbar";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const blobVariants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      if (file) formData.append("fileUpload", file);
      formData.append("recipient_email", recipientEmail);
      formData.append("password", password);
      const fromateExpiredDate = new Date(expirationDate).toISOString();
      formData.append("expiration_date", fromateExpiredDate);

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${NEXT_PUBLIC_BACKEND_URL}/api/file/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        // Handle success
        toast.success("File uploaded successfully");
        console.log("File uploaded successfully");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error("Upload failed,try again");
        setError(err.response?.data?.message || "Upload failed");
      } else {
        setError("Upload failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="overflow-hidden">
      <motion.div
        className="w-[590px] h-[400px] bg-blue-500 dark:bg-blue-700 rounded-[100%] absolute z-1 top-[60%] left-[55%] dark:left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[90px]"
        variants={blobVariants}
        animate="animate"
      />
      <motion.div
        className="w-[300px] h-[300px] bg-purple-500 dark:bg-purple-700 rounded-[100%] absolute z-1 top-[60%] left-[45%] dark:left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[90px]"
        variants={blobVariants}
        animate="animate"
      />
      <Topbar />
      <motion.div
        className="flex flex-col items-center justify-center mt-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8 text-center"
          whileHover={{ scale: 1.05 }}
        >
          Upload File
        </motion.h1>

        <motion.div
          className="bg-white/10 dark:bg-gray-800/10 shadow-lg backdrop-blur-md px-16 py-16 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/10 before:via-purple-500/10 before:to-indigo-500/10 before:-z-10 before:rounded-lg rounded-xl"
          whileHover={{ boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.2)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {["file", "email", "password", "date"].map((field, index) => (
              <motion.div
                key={field}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                {field === "file" && (
                  <div className="">
                    <label className="block text-lg font-bold dark:text-blue-100 mb-2">
                      File
                    </label>
                    <motion.input
                      whileHover={{ scale: 1.01 }}
                      type="file"
                      onChange={e => setFile(e.target.files?.[0] || null)}
                      className="w-full rounded-full border-2 border-gray-300 hover:border-blue-500 p-3 dark:border-gray-600"
                      required
                    />
                  </div>
                )}

                {field === "email" && (
                  <div>
                    <label className="block text-lg font-bold dark:text-blue-100 mb-2">
                      Recipient Email
                    </label>
                    <motion.input
                      whileHover={{ scale: 1.01 }}
                      type="email"
                      value={recipientEmail}
                      onChange={e => setRecipientEmail(e.target.value)}
                      placeholder="jhon@gmail.com"
                      className="w-full rounded-full border-2 border-gray-300 hover:border-blue-500 p-3 dark:border-gray-600 bg-transparent"
                      required
                    />
                  </div>
                )}

                {field === "password" && (
                  <div>
                    <label className="block text-lg font-bold dark:text-blue-100 mb-2">
                      Password
                    </label>
                    <motion.input
                      whileHover={{ scale: 1.01 }}
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full rounded-full border-2 border-gray-300 hover:border-blue-500 p-3 dark:border-gray-600 bg-transparent"
                      required
                    />
                  </div>
                )}

                {field === "date" && (
                  <div>
                    <label className="block text-lg font-bold dark:text-blue-100">
                      Expiration Date
                    </label>
                    <motion.input
                      whileHover={{ scale: 1.01 }}
                      type="datetime-local"
                      value={expirationDate}
                      onChange={e => setExpirationDate(e.target.value)}
                      className="w-full rounded-full border-2 border-gray-300 hover:border-blue-500 p-3 dark:border-gray-600 bg-transparent"
                      required
                    />
                  </div>
                )}
              </motion.div>
            ))}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 hover:dark:bg-blue-600 text-white dark:text-white text-[17px] font-bold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    ⟳
                  </motion.div>
                ) : (
                  "Upload File"
                )}
              </Button>
            </motion.div>

            {error && (
              <motion.div
                className="text-red-500 text-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}
          </form>
        </motion.div>
      </motion.div>
    </main>
  );
}
