import React from 'react'
import { Lock, Zap, HardDrive, Share2 } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Lock className="w-10 h-10 text-purple-500" />,
      title: "End-to-End Encrypted",
      description: "Your files are encrypted before transmission and can only be decrypted by the intended recipient"
    },
    {
      icon: <Zap className="w-10 h-10 text-emerald-500" />,
      title: "Lightning Fast",
      description: "Upload and download files at blazing fast speeds with our optimized infrastructure"
    },
    {
      icon: <HardDrive className="w-10 h-10 text-blue-500" />,
      title: "Large File Support", 
      description: "Share files up to 50MB in size without compression or quality loss"
    },
    {
      icon: <Share2 className="w-10 h-10 text-pink-500" />,
      title: "Easy Sharing",
      description: "Share files with anyone using a simple link and optional password protection"
    }
  ]

  return (
    <section className="py-20 px-4 mt-20" id="features">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
          Why Choose Prigen?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="p-3 w-fit rounded-lg bg-neutral-800/50 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-200 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/10">
                {feature.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
