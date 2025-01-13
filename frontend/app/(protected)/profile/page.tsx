"use client"
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import axios from 'axios';
import { NEXT_PUBLIC_BACKEND_URL } from '@/config';
import Topbar from '@/components/topbar';
import toast from 'react-hot-toast';

interface UserDetails {
  email: string;
  name: string;
  shared_id?: string;
}

export default function ProfilePage() {
  const [userDetails, setUserDetails] = useState<UserDetails | null >(null);
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
      setUserDetails(res.data.data.user);
      setEmail(res.data.data.user.email);
      setName(res.data.data.user.name);
    } catch (e) {
      if(axios.isAxiosError(e)) { 
        console.log("Failed to fetch user details",e);
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
      setUserDetails((prev) => (prev ? { ...prev, name } : prev));
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

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900/90 to-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full -top-32 -left-32 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full -bottom-32 -right-32 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -45, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>

      <Topbar />
      
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto pt-20 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8"
          whileHover={{ boxShadow: "0 0 40px rgba(167, 139, 250, 0.1)" }}
        >
          {error && (
            <motion.p 
              className="text-red-400 text-center mb-6 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <div className="space-y-8">
            {/* Profile Section */}
            <motion.div variants={inputVariants} className="space-y-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Profile Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-200 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-gray-200 text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleUpdatename}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    {isLoading ? "Updating..." : "Update Name"}
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Password Section */}
            <motion.div variants={inputVariants} className="space-y-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Change Password
              </h2>
              <div className="space-y-4">
                {/* Password fields with consistent styling */}
                {["Current Password", "New Password", "Confirm New Password"].map((label, index) => (
                  <div key={label}>
                    <label className="block text-gray-200 text-sm font-medium mb-2">{label}</label>
                    <input
                      type="password"
                      value={[oldPassword, newPassword, confirmPassword][index]}
                      onChange={(e) => {
                        const setters = [setOldPassword, setNewPassword, setConfirmPassword];
                        setters[index](e.target.value);
                      }}
                      className="w-full bg-gray-800/50 border border-gray-700 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                ))}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={updatePassword}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}