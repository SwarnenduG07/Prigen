"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { NEXT_PUBLIC_BACKEND_URL } from '@/config';
import Topbar from '@/components/topbar';



export default function ProfilePage() {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    getuserDelatils();
  }, []);


  const getuserDelatils = async () => {
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

    }
  }

  const handleUpdatename = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${NEXT_PUBLIC_BACKEND_URL}/api/users/name`,
        { 
          name: name
        },
        { 
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert("Name updated successfully");
      getuserDelatils();
    } catch (err) {
      if(axios.isAxiosError(err)) {
        console.error('Update error:', err.response?.data); // Add this for debugging
        setError(err.response?.data?.message || 'Failed to update profile');
      } else {
        setError('Failed to update profile');
      }
    }
  };

  const updatePassword = async () => {

    if(newPassword !== confirmPassword) {
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
      alert("Password updated successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      
     
    } catch (err) {
      if(axios.isAxiosError(err)) {
      setError(err.response?.data?.message || 'Failed to update password');
      } else {
        setError('Failed to update password');
      }
    } 
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      <div className="w-[590px] h-[400px] bg-gradient-to-br from-[#d82fc4] to-[#abc614] rounded-[100%] absolute z-1 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[90px] flex items-center text-center justify-center "></div>
      <Topbar />
      <div className='bg-red-400/20 backdrop-blur-md max-w-xl lg:ml-[400px] md:ml-[200px] ml-[50px] rounded-3xl pb-32'>
       {error && <p className='text-center text-xl pt-4 font-semibold text-purple-600'>{error}</p>}
       <div className='mt-10 ml-7 px-5 py-2 '>
           <h1 className='font-bold text-lg'>
              Update user name
           </h1>
           <div className='space-y-3'
           >
              <label className=' mb-4 text-sm text-gray-600 dark:text-white font-semibold'>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pt-2 bg-gray-600/5 border border-purple-400 text-gray-700  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[500px] p-2.5"
                placeholder="jhondow@gmail.com"
              />
              <label className=' mb-4 text-sm text-gray-600 dark:text-white font-semibold'>Name</label>
              <input
                type="name"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pt-2 bg-gray-600/5 border border-purple-400 text-gray-700  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[500px] p-2.5"
                placeholder="name"
              />
               <Button 
                 className='w-full font-semibold bg-gradient-to-br from-purple-500 to-rose-600 text-black hover:bg-gradient-to-br hover:from-sky-500 hover:to-amber-600 hover:text-neutral-100'
                 onClick={handleUpdatename}
                 variant="secondary"
              >
                  Update details
              </Button>
           </div>
       </div>
       <div className='mt-10 ml-7 px-3'>
           <h1 className='font-bold text-lg'>
              Update old password
           </h1>
           <div className='space-y-6'>
              <label className=' mb-4 text-sm text-gray-600 dark:text-white font-semibold'>Old Password</label>
              <input
                type="Password"
                name=" Password"
                id="Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="pt-2 bg-gray-600/5 border border-purple-400 text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[500px] p-2.5  placeholder-gray-600"
                placeholder="old password"
              />
              <label className=' mb-4 text-sm text-gray-600 dark:text-white font-semibold'>New password</label>
              <input
                type="password"
                name="passowrd"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="password"
                className="pt-2 bg-gray-600/5 border border-purple-400 text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 placeholder-gray-600 block w-[500px] p-2.5"
                placeholder="new password"
              />
              <label className=' mb-4 text-sm text-gray-600 dark:text-white font-semibold'>Confirm New password</label>
              <input
                type="password"
                name="passowrd"
                id="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pt-2 bg-gray-600/5 border border-purple-400 text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[500px] p-2.5 placeholder-gray-600"
                placeholder="confirm password"
              />
              <Button 
              className='w-full font-semibold bg-gradient-to-br from-purple-500 to-rose-600 text-black hover:bg-gradient-to-br hover:from-sky-500 hover:to-amber-600 hover:text-neutral-100'
              onClick={updatePassword}>
                  Update Password
              </Button>
           </div>
        </div>
       </div>
      </main>
  );
}