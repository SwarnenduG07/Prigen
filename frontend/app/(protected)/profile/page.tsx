"use client"
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { NEXT_PUBLIC_BACKEND_URL } from '@/config';
import Topbar from '@/components/topbar';
import toast from 'react-hot-toast';



export default function ProfilePage() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getuserDelatils();
  }, []);

  const getuserDelatils = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${NEXT_PUBLIC_BACKEND_URL}/api/users/me`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      )
      const userData = res.data.data.user;
      setEmail(userData.email);
      setName(userData.name);
    } catch (e) {
      if(axios.isAxiosError(e)) { 
        console.log("Failed to fetch user details", e);
      } else {
        setError("Failed to fetch user details");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleUpdatename = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${NEXT_PUBLIC_BACKEND_URL}/api/users/name`,
        { 
          name
        },
        { 
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success("Name updated successfully");
    } catch (err) {
      if(axios.isAxiosError(err)) {
        console.error('Update error:', err.response?.data); // Add this for debugging
        setError(err.response?.data?.message || 'Failed to update profile');
      } else {
        setError('Failed to update profile');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async () => {
    if(newPassword !== confirmPassword) {
      toast.error("New passwrd and confirmation do not match");
      setError("New passwrd and confirmation do not match");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${NEXT_PUBLIC_BACKEND_URL}/api/users/password`,
        {
          old_password: oldPassword,
          new_password: newPassword,
          new_password_confirm: confirmPassword,
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      toast.success("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      if(axios.isAxiosError(err)) {
        toast.error("Failed to update password");
        setError(err.response?.data?.message || 'Failed to update password');
      } else {
        setError('Failed to update password');
      }
    } 
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <main className="min-h-screen bg-transparent overflow-hidden relative">
      {/* Animated background blobs */}
      <motion.div 
        className="absolute w-[800px] h-[800px] bg-purple-600/20 rounded-full -top-20 -right-20 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div 
        className="absolute w-[600px] h-[600px] bg-blue-600/20 rounded-full -bottom-32 -left-32 blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [180, 0, 180],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <Topbar />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-2xl mx-auto mt-10 px-4"
      >
        <motion.div 
          className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 rounded-3xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 p-8"
          whileHover={{ boxShadow: "0 0 40px rgba(167, 139, 250, 0.1)" }}
        >
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-rose-500 font-medium mb-6 p-3 rounded-lg bg-rose-500/10"
            >
              {error}
            </motion.p>
          )}

          {/* Profile Section */}
          <div className="space-y-8">
            <motion.div className="space-y-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Profile Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-200 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-800/20 border border-gray-700/50 text-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    placeholder="email@example.com"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-gray-200 text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-800/20 border border-gray-700/50 text-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleUpdatename}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-medium transition-all duration-200"
                  >
                    {isLoading ? "Updating..." : "Update Name"}
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Password Section */}
            <div className="space-y-6 pt-6 border-t border-gray-700/50">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Change Password
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Current Password", value: oldPassword, setter: setOldPassword },
                  { label: "New Password", value: newPassword, setter: setNewPassword },
                  { label: "Confirm New Password", value: confirmPassword, setter: setConfirmPassword }
                ].map((field, index) => (
                  <motion.div 
                    key={field.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <label className="block text-gray-200 text-sm font-medium mb-2">{field.label}</label>
                    <input
                      type="password"
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      className="w-full bg-gray-800/20 border border-gray-700/50 text-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                  </motion.div>
                ))}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={updatePassword}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-medium transition-all duration-200"
                  >
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}