"use client"
import { LandingNavBar } from "@/components/navbar"
import { Activity, Users, Building2, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutPage() {
  const stats = [
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      value: "COUNTING++",
      label: "Active Users"
    },
    {
      icon: <Activity className="w-6 h-6 text-emerald-500" />,
      value: "99.9%",
      label: "Uptime" 
    },
    {
      icon: <Building2 className="w-6 h-6 text-blue-500" />,
      value: "24/7",
      label: "Support"
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-pink-500" />,
      value: "COUNTING++",
      label: "Files Shared"
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-950">
      <LandingNavBar />
      
      <main className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">
              Our Mission
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              At Prigen, we believe file sharing should be simple, secure, and lightning-fast. 
              Our mission is to provide the most reliable and user-friendly file sharing platform 
              while maintaining the highest standards of security and privacy.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 text-center"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Vision Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-900/10 to-pink-900/10 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/10"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-4">Security First</h3>
                <p className="text-gray-400 leading-relaxed">
                  We prioritize your data security with end-to-end encryption and zero-knowledge 
                  privacy. Your files are only accessible to you and your intended recipients.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-pink-400 mb-4">Blazing Fast</h3>
                <p className="text-gray-400 leading-relaxed">
                  Using cutting-edge technology and optimized infrastructure, we ensure your files 
                  are transferred at the highest possible speeds.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
